const usersModel = require('../models/user.model');

function getAllUsers(req, res) {
    return res.status(200).json(usersModel);
}

async function checkUser(username, password, db) {
    const pcUsers = await db.db('powercall').collection('users');
    const isUserExist = await pcUsers.findOne({
        username: username,
        password: password,
    }
    )
    return isUserExist;
}


async function getUserRoles(uid, db) {
    const pcUsersRoles = await db.db('powercall').collection('users_roles');
    const getRoles = await pcUsersRoles.findOne({ uid: uid });
    return getRoles;
}

function loginUser(req, res, db, store) {
    const { username, password } = req.body;
    if (username && password) {
        if (req.session.authenticated) {
            res.json(req.session);
        } else {
            checkUser(username, password, db).then((auth) => {
                if (auth === null)
                    return res.status(403).json({ msg: 'User does not exist', OK: false })
                if (!auth.active)
                    return res.status(403).json({ msg: 'User has been deactivated, please contact with administrator' })
                if (auth !== null) {
                    getUserRoles(auth.uid, db).then((profileData) => {
                        req.session.userProjectProfile = profileData?.access;
                        req.session.save();
                    }).then(() => {
                        return res.status(200).json(
                            {
                                msg: 'You are logged in succesfully',
                                sessionData: JSON.parse(store.sessions[req.sessionID]),
                                OK: true
                            }
                        )
                    })
                }
            })
        }
    } else {
        return res.status(403).json({ msg: 'Bad Credentials', OK: false });
    }
}

module.exports = {
    getAllUsers, loginUser
}