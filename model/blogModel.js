const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BlogSchema = new Schema({
    // _id: mongoose.ObjectId,
    idName:{
        type:String,
        required:true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
});
module.exports = mongoose.model("Blog", BlogSchema);


