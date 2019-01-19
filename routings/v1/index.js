const router = require('express').Router();

// Requiring the document-uploader file here from index file.
require('./upload/documents-uploader')(router);
require('./download/documents-downloader')(router);

module.exports = router;
