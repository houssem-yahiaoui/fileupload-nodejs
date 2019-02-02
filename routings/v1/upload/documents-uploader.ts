// Config
import * as config from '../../../config/config.json';
import logger from '../../../config/logger.config';

// Logic
import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import * as Grid from 'gridfs-stream';

interface RequestWithFiles extends Request {
    files: any
}

//models
import FileModel from '../../../models/files.model';

export class Uploader {
    public routes(router): void{
        const conn = mongoose.connection;
        Grid.mongo = mongoose.mongo;
        let gfs;
        conn.once("open", () => {
            gfs = Grid(conn.db);
            router.post('/bucket/upload', (req: RequestWithFiles, res: Response) => {
                const { file } = req.files;
                let writeStream = gfs.createWriteStream({
                    filename: `${file.name}`,
                    mode: 'w',
                    content_type: file.mimetype
                });
                writeStream.on('close', function (uploadedFile) {
                    FileModel.create({
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
}