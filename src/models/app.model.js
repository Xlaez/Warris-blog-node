const mongoose = require('mongoose');

const ARTICLES = mongoose.model(
    "blog_articles", new mongoose.Schema({
        title: {
            type: String,
            required: [true, "Provide a title for your article"],
        },
        description: {
            type: String,
        },
        image: {
            type: String,
            required: [true, "Provide an image for this article"],
        },
        content: {
            type: String,
            required: [true, "Provide content for this article"],
        },
        userId: {
            type: String,

        },
        likes: {
            type: Number,
            default: 0
        },
        views: {
            type: Number,
            default: 0,
        },
        author: {
            type: String
        }
    }, {
        timestamps: true,
    })
)

const USER = mongoose.model(
    'USERS', new mongoose.Schema({
        username: {
            type: String,
            required: [true, 'Provide a valid username'],
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
        },
        gender: {
            type: String,
        },
        email: {
            type: String,
        },
        role: {
            type: String,
        },
        interest: {
            type: Array
        },
        darkMode: {
            type: Boolean,
            default: false
        },
        animations: {
            type: Boolean,
            default: false
        },
        image: {
            type: String,
        }
    }, {
        timestamps: true,
    })
)

const DRAFTS = mongoose.model(
    "blog_drafts", new mongoose.Schema({
        head: {
            type: String,
        },
        content: {
            type: String,
        },
        userId: {
            type: String
        }
    }))

const COMMENTS = mongoose.model(
    "blog_comments", new mongoose.Schema({
        comments: {
            text: {
                type: String,
            },
            ids: Array,
            sender: {
                type: mongoose.Schema.Types.ObjectId,
            }
        },
    })
)

const LIKES = mongoose.model(
    "like_controller", new mongoose.Schema({
        userId: String,
        articleId: String,
    })
)

module.exports = {
    ARTICLES,
    USER,
    DRAFTS,
    COMMENTS,
    LIKES
}