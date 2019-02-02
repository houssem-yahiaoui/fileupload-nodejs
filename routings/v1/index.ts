// Logic
import * as express from 'express';
let router = express.Router();

// Controller/Routes Managers.
import { Downloader } from './download/documents-downloader';
import { Uploader } from './upload/documents-uploader';

// Creating new Routes Instances.
const downloaderRoutes: Downloader = new Downloader();
const uploaderRoutes: Uploader = new Uploader();

// Registering our Routes.
downloaderRoutes.routes(router);
uploaderRoutes.routes(router);

export default router;
