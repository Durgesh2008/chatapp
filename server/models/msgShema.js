const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const MegShema = new Schema(
    {
        message: {
            text: {
                type: String,
                required: true
            },
        },
        users: Array,
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
    },
    {
        timestamps: true
    }



);
module.exports = mongoose.model("Msg", MegShema);