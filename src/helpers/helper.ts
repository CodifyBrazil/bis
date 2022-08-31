
export const mountJsonAllUniversities = (json: any) =>{
    if(json != undefined){
        let mountjson = [{}];

        for(let i=0; i<json.length; i++){
            let recentjson = [{
                _id: json[i]._id,
                name: json[i].name,
                country: json[i].country,
                state_province: json[i].state_province
            }];

            mountjson = mountjson.concat(recentjson);     
        }
        mountjson.splice(0,1);
        return mountjson;
    }
}

export const verifyData = (json: any) =>{
    let name: string | any = json.name;
    let country: string | any = json.country;
    let alpha_two_code: string | any = json.alpha_two_code;
    let web_pages: [string] = json.web_pages;
    let domains: [string] = json.domains;
    let state_province: string | any = json.state_province;

    return (name != undefined && 
            country != undefined && 
            alpha_two_code != undefined &&
            web_pages != undefined &&
            domains != undefined &&
            state_province != undefined) ? true : false;
}