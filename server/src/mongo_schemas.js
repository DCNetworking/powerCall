const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

//
// User Schema --------------------------------------------------------------------------------------------------
//
const userSchema = new mongoose.Schema({
    _id: ObjectId,
    uid: {
        type: Number,
        required: true,
    },
    company_mail: {
        type: String,
        required: true,
        lowercase: true,
    },
    private_mail: {
        type: String,
        required: false,
        lowercase: true,
    },
    phones: {
        type: Object,
        required: true,
    },
    username: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    hr_data: {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        full_name: { type: String, required: true },
        birth_date: { type: Date, required: true },
        adress: {
            city: { type: String, required: true },
            street: { type: String, required: true },
            post_code: { type: String, required: true },
            street_number: { type: String, required: true },
            house_number: { type: String, required: false },
            full_address: { type: String, required: false }
        },
    },
    active: { type: Boolean, required: true, default: true }
}, { collection: 'users' })
//
// User roles Schema --------------------------------------------------------------------------------------------------
//
const usersRolesSchema = mongoose.Schema({
    uid: { type: Number, required: true },
    last_update_time: { type: Date, required: true },
    access: {
        projects: [{
            pid: { type: Number, required: true },
            active: { type: Boolean, required: true },
            permissions: {
                roleID: { type: Array, required: true },
                appAccessIDS: { type: Array, required: true },
            }
        }]
    },
    perm_id: { type: Number, required: true }
}, { collection: 'users_roles' })


module.exports = {
    userSchema, usersRolesSchema
}