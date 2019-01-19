// Config
const config = require('../../../config/config');
const logger = require('../../../config/logger.config');

// Logic
const mongoose = require("mongoose");
const fs = require('fs');
const Grid = require('gridfs-stream');

//models
const Files = require('../../../models/files.model');

module.exports = router => {
    const conn = mongoose.connection;
    Grid.mongo = mongoose.mongo;
    let gfs;

    conn.once("open", () => {
        gfs = Grid(conn.db);

        router.post('/bucket/upload', (req, res) => {
            let {
                file
            } = req.files;
            let writeStream = gfs.createWriteStream({
                filename: `${file.name}`,
                mode: 'w',
                content_type: file.mimetype
            });
            writeStream.on('close', function (uploadedFile) {
                Files.create({
                        doc_id: uploadedFile._id,
                        length: uploadedFile.length,
                        name: uploadedFile.filename,
                        type: uploadedFile.contentType
                    })
                    .then(file => res.json({
                        success: true,
                        message: "File was saved with success"
                    }))
                    .catch(err => {
                        logger.error(`[*] Error, while uploading new files, with error: ${err}`);
                        res.status(500).json({
                            message: `[*] Error while uploading new files, with error: ${err}`
                        })
                    })
            });
            writeStream.write(file.data);
            writeStream.end();
        });
    });
}