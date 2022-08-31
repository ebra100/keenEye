const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true

    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true

    },
    lastLoginTime: {
        type: Date,

    },

});

UserSchema.pre("save", async function (next) {


    let user = this;
    let password = user.password;
    let hashedPassword = await bcrypt.hash(password , 10)
    user.password = hashedPassword;
    return next();
})

module.exports.User = mongoose.model('User', UserSchema);
