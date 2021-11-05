const Response = require('../../../classes/response');
const {companiesQueries} = require('../../a_model/companies');
const {regionsQueries} = require('../../a_model/regions');


const companiesMiddlewares = {

    dataValidateInsertCompany: async (req, res, next) => {
        
        const company_name = req.body.company_name; 
        const city_id = req.body.city_id;
        const company_address = req.body.company_address;
        const email = req.body.email;
        const phone = req.body.phone.toString();
        const emailValidation = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const alphanumericValidation = /[A-Za-z0-9]/i;

        const companyDb = await companiesQueries.getAllDataCompanies();
        const companyValidation = companyDb.filter(co => co.company_name === req.body.company_name);
        const cityDB = await regionsQueries.getAllCities();
        const cityValidation = cityDB.filter(ci => ci.id === req.body.city_id);

        typeof company_name !== 'string' || alphanumericValidation.test(company_name) === false ?
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. El formato de nombre de la compañia debe ser alfanmerico y no puede estar vacío", "")):
        
        typeof city_id !== 'number' || city_id === " " ||  city_id.toString().length === 0 ?
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. El formato del código de ciudad debe ser numérico entero y no puede estar vacío", "")):

        typeof company_address !== 'string' ||  alphanumericValidation.test(company_address) === false ?
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. El formato de domicilio de la compañia debe ser alfanmerico y no puede estar vacío", "")):

        typeof email !== 'string'|| emailValidation.test(email) === false || email.length === 0 || email === " "?  
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. Formato de email invalido o campo vacio", "")):

        phone.length === 0 || phone === " " ?
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. El formato de domicilio de la compañia debe ser alfanmerico y no puede estar vacío", "")):

        companyValidation.length !== 0 ?  
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. Ya existe una compañía con este nombre", req.body.company_name)):

        cityValidation.length === 0 ?  
        res.status(400).send(new Response(true, 400, "No se pudo realizar la operación. La ciudad asociada no existe", req.body.city_id)):

        next();
    },

 

        dataValidateUpdateCompany: async (req, res, next) => {
            
            const id = req.body.id; 
            
            // aplicar si existe el id de la compañia (las demas validaciones demas datos ya están)
            // en el endpoint usar primero este middleware y despues usar dataValidateInsertCompany (el anterior)

            next();
        },

};

module.exports = {companiesMiddlewares};