
const express = require("express");
const app = express();
const cors = require('cors');
const multipart = require('express-multipart-file-parser')
const db = require("./src/database/db");
const fileRouter = require("./src/route/fileRoute");
const bodyParser = require("body-parser");




// app.use(multipart);

app.use(
    bodyParser.urlencoded({
        limit: "50mb",
        extended: true,
    })
);



app.use(cors());
app.use(bodyParser.json());

app.use(multipart);

// app.use('/api/upload', fileParser());
app.use("/api/upload", fileRouter); //parent api for user registers


// data base
db.on("open", () => {
    app.listen(3000, () => {
        console.log("http://localhost:3000/");
    })

});
app.get("/", (req, res) => {
    res.send("im connected to server")
})

db.on("error", () => {
    console.log("error db");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});