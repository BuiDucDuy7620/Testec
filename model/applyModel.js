const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ApplySchema = new Schema({
    // _id: mongoose.ObjectId,
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    contactCode: {
        type: String,
        required: true,
    },
    websiteURL: {
        type: String,
        default: ""
    },
    resume:{
        type:String,
        default:""
    }
});
module.exports = mongoose.model("Apply", ApplySchema);


