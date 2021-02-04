const ProjectModel  = require( '../models/projectmodel')
const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");


class ProjectLogic {

    static async create(project)
    {
        let result = this.validateCreate(project);
        if(result.success){
            try {
                let newproject = await ProjectModel.create(project);
                result.payload = newproject;
                return  result;
            }
            catch(error)
            {
                throw { success: false, message: '', error: error };
            }
            
        }
        else
        {
            throw result
        }

    }

    static async findAll()
    {
        try{
            let projects  = await ProjectModel.findAll();
            return { success: true, payload: projects }
        }
        catch (error)
        {
            console.log(error)
            throw { success: false, message: '', error: error };
        }
    }



    static async findByKeyword(search)
    {
        try{
            let projects  = await ProjectModel.findAll({
                where: {
                    [Op.or] : [
                        {project_name: { [Op.like] : '%' + search + '%' }},
                        {client_name: { [Op.like] : '%' + search + '%' }},
                        {info: { [Op.like] : '%' + search + '%' }}
                    ]

                }
            })
            return { success: true, payload: projects }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async get(id)
    {
        try{
            let projects  = await ProjectModel.findByPk(id);

            return { success: true, payload: projects }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async update(id,  project)
    {
        let result = this.validate(project);
        if(result.success){
            try {
                let newproject = await ProjectModel.update(project, { where:  { id: id }  });
                result.payload = newproject;
                return  result;
            }
            catch(error)
            {
                throw { success: false, message: '', error: error };
            }
            
        }
        else
        {
            throw result
        }

    }

    static async delete(id)
    {
        try{
            let result  = await ProjectModel.destroy({ 
                where: {
                    id: id
                }
            });
 
            return { success: true, payload: result }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static validateCreate(config){
        
        return this.validate(config);
    }

    static validate(config)
    {   
        return {success :  true, message: "Succesfull"}
    }
}

module.exports = ProjectLogic;