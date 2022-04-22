import DataURIParser from "datauri/parser";
import path from 'path';

const parser = new DataURIParser();
const convertor = async(req) => {
    try {
        const img = await parser.format(path.extname(req.file.originalname).toString(), req.file.buffer);
        return img.content;
    } catch (error) {
        console.log(error);
    }
}

export default convertor;