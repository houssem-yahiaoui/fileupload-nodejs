declare const Buffer

// Config
import logger from '../../../config/logger.config';

// Logic
import * as Grid from 'gridfs-stream';
import * as fileType from 'file-type';
import * as mongoose from 'mongoose';
import {
    Request,
    Response
} from "express";

//models
import FileModel from '../../../models/files.model';

export class Downloader {
    public routes(router): void {
        const conn = mongoose.connection;
        Grid.mongo = mongoose.mongo;
        let gfs;

        conn.once("open", () => {
            gfs = Grid(conn.db);
            router.get('/home', (req: Request, res: Response) => {
                FileModel.find()
                    .exec()
                    .then(files => {
                        let uploadedFiles = files.map(file => ({
                            file_name: file.name,
                            file_type: file.type,
                            file_link: `http://${req.headers.host}/v1/bucket/download?document_id=${file.doc_id}`
                        }));
                        res.json({
                            success: true,
                            uploadedFiles
                        })
                    })
                    .catch(err => {
                        logger.error(`[*] Error, while getting all uploaded file, with error:  ${err}`);
                        res.status(400).send({
                            message: `Error, while getting all uploaded file, with error: ${err}`
                        });
                    });
            });

            router.get('/bucket/download', (req: Request, res: Response) => {
                let {
                    document_id
                } = req.query;
                gfs.findOne({
                    _id: document_id
                }, (err, file) => {
                    if (!file) {
                        return res.status(404).send({
                            message: 'File was not found'
                        });
                    }
                    let data = [];
                    let readstream = gfs.createReadStream({
                        filename: file.filename
                    });
                    readstream.on('data', (chunk) => {
                        data.push(chunk);
                    });
                    readstream.on('end', () => {
                        data = Buffer.concat(data);
                        let type = fileType(data);
                        res.writeHead(200, {
                            'Content-Type': type.mime,
                            'Content-disposition': 'attachment; filename=' + file.filename + '.' + type.ext,
                            'Content-Length': file.length
                        });
                        res.end(data);
                    });
                    readstream.on('error', (err) => {
                        logger.error(`[*] Error, while downloading a file, with error:  ${err}`);
                        res.status(400).send({
                            message: `Error, while downloading a file, with error:  ${err}`
                        });
                    });
                });
            });
        });
    }
}