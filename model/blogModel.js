const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BlogSchema = new Schema({
    // _id: mongoose.ObjectId,
    type: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    img: {
        type: Object,
        required: true,
        img_logo: {
            type: String,
            required: true,
        },
        img_2: {
            type: String,
            required: true,
        },
        img_3: {
            type: String,
            required: true,
        },
    },
    challenges: {
        type: Object,
        required: true,
        paragraph1: {
            type: String,
            required: true,
        },
        paragraph2: {
            type: String,
            required: true,
        },
    },
    solution: {
        type: Object,
        required: true,
        subLine:{
            type: String,
            required:true
        },
        key1: {
            type: String,
            required: true,
        },
        key2: {
            type: String,
            required: true,
        },
    }
});
module.exports = mongoose.model("Blog", BlogSchema);


