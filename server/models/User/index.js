const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: false,
    },
    twitter: {
        type: String,
        required: false,
    },
    photoURL: {
        type: String,
        required: false,
    },
    moviesList: {
        type: Array,
        required: false,
    },
    seriesList: {
        type: Array,
        required: false,
    },
    booksList: {
        type: Array,
        required: false,
    },
    reviews: {
        type: Array,
        required: false,
    },
    followersList: {
        type: Array,
        required: false,
    },
    followingList: {
        type: Array,
        required: false,
    }
});

//const User = mongoose.model('User', UserSchema);
//module.exports = User;

module.exports = UserSchema;