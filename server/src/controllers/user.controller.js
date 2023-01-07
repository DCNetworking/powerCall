const UsersModel = require('../models/user.model');
const { userSchema, usersRolesSchema } = require('../mongo_schemas');
const mongoose = require('mongoose');

async function checkUser(username, password) {
    const pcUsers = await mongoose.model('users', userSchema)
    const isUserExist = await pcUsers.findOne({
        username: username,
        password: password,
    }
    ).exec();
    return isUserExist;
}


async function getUserRoles(uid) {
    const pcUsersRoles = await mongoose.model('users_roles', usersRolesSchema);
    const getRoles = await pcUsersRoles.findOne({ uid: uid });
    return getRoles;
}

function loginUser(req, res, store) {
    const { username, password } = req.body;
    if (username && password) {
        if (req.session.authenticated) {
            res.json(req.session);
        } else {
            checkUser(username, password).then((auth) => {

                if (auth === null)
                    return res.status(403).json({ msg: 'User does not exist', OK: false })
                if (!auth.active)
                    return res.status(403).json({ msg: 'User has been deactivated, please contact with administrator' })
                if (auth !== null) {
                    const userData = new UsersModel(auth._doc).set();
                    getUserRoles(auth.uid).then((profileData) => {
                        req.session.userProfile = userData;
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
    loginUser
}