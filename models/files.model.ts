import { Schema, model }  from 'mongoose';

const fileSchema = new Schema({
    doc_id: {
        type: String
    },
    length : {
        type: Number
    },
    name: {
        type: String
    },
    type: {
        type: String
    }
});

const FileModel = model('File', fileSchema);
export default FileModel;
