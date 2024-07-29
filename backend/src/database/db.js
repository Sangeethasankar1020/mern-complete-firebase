// db mongoose 
const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://sangeethasankar474:vmy6NrAP8ql3i3eC@cluster0.paforwb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

    .then(() => {
        console.log("mongo db connected")
    })
    .catch((error) => {
        console.log("error while connecting db", error)

    })
module.exports = mongoose.connection
