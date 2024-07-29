// controllers/fileController.js
const bucket = require('../database/firebaseConfig');
const { v4: uuidv4 } = require('uuid');
const File = require('../model/fileModel')



exports.uploadFile = async (req, res) => {
    try {
        console.log(req.files && req.files[0], "jdsflajsdlfjsal;fj")
        // Check for files in the request
        if (!req.files && !req.files[0]) {
            console.log('File not found in request');
            return res.status(400).send('No file uploaded.');
        }

        const file = req.files[0];
        console.log('File received:', file);

        const filename = `${uuidv4()}_${"img"}`;
        const fileUpload = bucket.file(filename);

        const blobStream = fileUpload.createWriteStream({
            metadata: {
                contentType: file.mimetype,
            },
        });

        blobStream.on('error', (error) => {
            console.error('Blob Stream Error:', error);
            res.status(500).send('Something went wrong.');
        });

        blobStream.on('finish', async () => {
            // File upload finished, generate signed URL
            try {
                const signedUrls = await fileUpload.getSignedUrl({
                    action: 'read',
                    expires: '03-01-2025', // Adjust the expiry date as needed
                });

                const signedUrl = signedUrls[0];

                // Save file metadata to the database
                const fileDoc = new File({
                    filename: file.originalname,
                    url: signedUrl,
                    contentType: file.mimetype,
                    size: file.size,
                });

                await fileDoc.save();
                console.log(signedUrl);
                res.status(200).send({ signedUrl });
            } catch (error) {
                console.error('Error generating signed URL:', error);
                res.status(500).send('Error generating signed URL.');
            }
        });

        // Use file.buffer if you are using `express-multipart-file-parser`
        blobStream.end(file.buffer);
    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).send('Server error.');
    }
};
