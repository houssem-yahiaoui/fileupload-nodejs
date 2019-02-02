// Configuration
import * as config from '../config/config.json';

// Logic
import * as express from 'express';
import * as mongoose from "mongoose";
import * as morgan from 'morgan';
import * as busboyBodyParser from 'busboy-body-parser';
import router from '../routings/v1';

class ExpressConfiguration {
    public app: express.Application;
    public dbUrl: string = config.db;

    constructor() {
        this.app = express();
        this.config();
        this.dbConnect();
    }

    private dbConnect() {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.dbUrl); 
    }

    private config() {
        this.app.use(busboyBodyParser({ limit: '50mb' }));
        this.app.use(morgan('dev'));
        this.app.use((req: express.Request, res: express.Response, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            next();
        });
        this.app.use('/v1', router);
    }
}

export default new ExpressConfiguration().app;