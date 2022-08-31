import {Request, Response} from 'express';
import axios from 'axios';
import Universities from '../models/universities';
import {mountJsonAllUniversities, verifyData} from '../helpers/helper';

export const ping = (req: Request, res: Response) =>{
    res.json({pong: true});
}

export const saveAllUniversits = async (req: Request, res: Response) =>{
    const listUniverties = [ 
                            'argentina', 
                            'brazil', 
                            'chile', 
                            'colombia', 
                            'paraguay', 
                            'peru', 
                            'suriname',
                            'uruguay'];


        try{
        for(let i = 0; i<listUniverties.length; i++){
            let url = `http://universities.hipolabs.com/search?country=${listUniverties[i]}`;
            await axios.get(url).then(response => {
                let data = response.data
                let length = data.length;
                for(let n = 0; n<length; n++){
                    console.log(`Salvando dados da ${listUniverties[i]}`);
                    Universities.create({
                        name: data[n].name,
                        domains: data[n].domains,
                        state_province: data[n]['state-province'],
                        web_pages: data[n].web_pages,
                        country: data[n].country.toLowerCase(),
                        alpha_two_code: data[n].alpha_two_code
                    });
                }
            
            })
        }
        console.log('Fim...')
        let ok = {ok: 'Todos dados salvos com sucesso ...'};
        res.json(ok);
    }catch(e){
            res.json(`error: ${e}`);
        }
}

export const universities = async (req: Request, res: Response) =>{
    let queryString = req.query;
    let data;

    if(queryString != undefined && queryString != null){
        let country = queryString.country;
        let page = queryString.page as any;
        let limit = 20;
        let skip: any = limit * (page -1);

        let universites = await Universities.find({
            country
        }).skip(skip).limit(limit);

        data = mountJsonAllUniversities(universites);

        res.json(data);

    }
    else{
        let allUniversities = await Universities.find({});
        data = mountJsonAllUniversities(allUniversities);
    }
    
    res.json(data);
}

export const getUniversitiesId = async (req: Request, res: Response) =>{

    let id = req.params.id;
    let queryUnivisities = await Universities.find({
        _id: id
    });

    res.json(queryUnivisities);
}

export const postUniversites = async (req: Request, res: Response) =>{
    let data = req.body;
    if(verifyData(data)){

        let verifyDuplicity = await Universities.find({
            name: data.name,
            country: data.country,
            state_province: data.state_province
        });

        if(verifyDuplicity.length >= 1){
            let error = {
                error: 'Ja existe essa informacao em nosso banco de dados'
            }
            res.json(error);
        }
        else{
            await Universities.create({
                name: data.name,
                domains: data.domains,
                state_province: data.state_province,
                web_pages: data.web_pages,
                country: data.country.toLowerCase(),
                alpha_two_code: data.alpha_two_code
            });
            let result = {success: 'Criado com sucesso...'};
            res.json(result);
            }
        }
        else{
            let error = {
                error: 'Faltou algum dado'
            }
            res.json(error);
        }
}