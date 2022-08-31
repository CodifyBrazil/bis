import {Request, Response} from 'express';
import axios from 'axios';
import Universities from '../models/universities';
import {mountJsonAllUniversities, verifyData} from '../helpers/helper';

export const ping = (req: Request, res: Response) =>{
    res.status(200).json({pong: true});
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
        res.status(200).json(ok);
    }catch(e){
            res.status(400).json(`error: ${e}`);
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

    }
    else{
        let allUniversities = await Universities.find({});
        data = mountJsonAllUniversities(allUniversities);
    }
    
    res.status(200).json(data);
}

export const getUniversitiesId = async (req: Request, res: Response) =>{

    let id = req.params.id;
    let queryUnivisities = await Universities.find({
        _id: id
    });

    res.status(200).json(queryUnivisities);
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
                error: 'Ja existe essas informacao em nosso banco de dados'
            }
            res.status(400).json(error);
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
            res.status(200).json(result);
            }
        }
        else{
            let error = {
                error: 'Faltou algum dado'
            }
            res.status(400).json(error);
        }
}

export const updateUniversities = async (req: Request, res: Response) =>{
    let { id } = req.params;
    let { name, domains, web_pages } = req.body;

    let universities = await Universities.findById(id);

    if(universities){
        universities.name = name;
        universities.domains = domains;
        universities.web_pages = web_pages;

        universities.save();

        res.status(200).json({ universities });
    }
    else{
        res.status(400).json({error: 'Id da universidade nao encontrado.'});
    }
}
export const deleteUniversities = async (req: Request, res: Response) =>{
    let { id } = req.params;

    let universities = await Universities.findById(id);

    if(universities){
        await Universities.deleteMany({
            _id: id
        });
        
        res.status(200).json({success: 'Deletado com sucesso...'});
    }
    else{
        res.status(400).json({error: 'ID nao encontrado.'});
    }
}