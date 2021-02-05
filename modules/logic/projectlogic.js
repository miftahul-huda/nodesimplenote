const ProjectModel  = require( '../models/projectmodel')
const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");


class ProjectLogic {

    static async create(project, param)
    {
        let result = this.validateCreate(project);
        if(result.success){
            try {
                project.user = param.email;
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

    static async findAll(param)
    {
        try{
            let projects  = await ProjectModel.findAll({
                where: {
                    user: { [Op.like] : param.email}
                }
            });
            return { success: true, payload: projects }
        }
        catch (error)
        {
            console.log(error)
            throw { success: false, message: '', error: error };
        }
    }



    static async findByKeyword(search, param)
    {
        try{
            let projects  = await ProjectModel.findAll({
                where: {
                    [Op.and] : 
                    [
                        {[Op.or] : [
                            {project_name: { [Op.like] : '%' + search + '%' }},
                            {client_name: { [Op.like] : '%' + search + '%' }},
                            {info: { [Op.like] : '%' + search + '%' }}
                        ]}
                        ,
                        {
                            user: { [Op.like] : param.email }
                        }
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

    static async get(id, param)
    {
        try{
            let project  = await ProjectModel.findByPk(id);
            if(project.user != param.email)
                return { success: false, payload: null, message: 'Not allowed for ' + param.email }
            else
                return { success: true, payload: project }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async update(id,  project, param)
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

    static async delete(id, param)
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