var mongoose = require("mongoose")

var customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String, required: true }
}, 
{
    timestamps: true
})

module.exports = mongoose.model("Customer", customerSchema)