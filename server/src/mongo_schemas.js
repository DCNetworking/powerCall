const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    uid: {
        type: Number,
        required: true,
    },
    comapny_mail: {
        type: String,
        required: true,
        lowercase: true,
        match: /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    },
    private_mail: {
        type: String,
        required: false,
        lowercase: true,
        match: /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    },
    phones: {
        private: { type: Number, required: true, minlength: 9, maxlength: 12 },
        comapny: { type: Number, required: false, minlength: 9, maxlength: 12 },
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
        address: {
            city: { type: String, required: true },
            street: { type: String, required: true },
            post_code: { type: String, required: true },
            street_number: { type: String, required: true },
            house_number: { type: String, required: false },
            full_address: { type: String, required: false }
        },
    },
    active: { type: Boolean, required: true }
})



module.exports = {
    userSchema
}