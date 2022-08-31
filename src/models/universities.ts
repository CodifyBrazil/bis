import {Model, model, Schema, connection} from 'mongoose';

type universitiesType = {
    
    name: string,
    domains: [string],
    state_province: string,
    web_pages: [string],
    country: string,
    alpha_two_code: string
}

const schema = new Schema<universitiesType>({
    
    name: String,
    domains: [String],
    state_province: String,
    web_pages: [String],
    country: String,
    alpha_two_code: String
});

const modelName = 'universities';

export default (connection && connection.models[modelName]) ?
(connection.models[modelName] as Model<universitiesType>) :
model<universitiesType>(modelName, schema);