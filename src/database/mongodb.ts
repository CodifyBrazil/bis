import {connect} from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const mongoConnect = async() => {
    try{
        console.log('Conectando ao banco ...');
        await connect(process.env.MONGODB as string);
        console.log('conectado com sucesso.');
    }
    catch(e){
        console.log('Erro ao conectar no banco de dados.');
    }
}
