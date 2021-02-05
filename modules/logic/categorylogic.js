const CategoryModel  = require( '../models/categorymodel')
const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");


class CategoryLogic {

    static async create(category, param)
    {
        let result = this.validateCreate(category);
        if(result.success){
            try {
                category.user = param.email;
                let newcategory = await CategoryModel.create(category);
                result.payload = newcategory;
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
            var where = null;
            if(param.email != null)
                where = { where: { user : {[Op.like] :  param.email } } };

            let categorys  = await CategoryModel.findAll(where);
            return { success: true, payload: categorys }
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
            let categorys  = await CategoryModel.findAll({
                where: {
                    [Op.and] :
                    [
                        {
                            [Op.or] : [
                                {category_name: { [Op.like] : '%' + search + '%' }},
                                {description: { [Op.like] : '%' + search + '%' }}
                            ]
                        }
                        ,
                        {
                            user: { [Op.like] : param.email }
                        }
                    ]
                }
                
            })
            return { success: true, payload: categorys }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async get(id, param)
    {
        try{
            let category  = await CategoryModel.findByPk(id);

            if(param.email != null && category.user == param.email)
                return { success: true, payload: category }
            else
                return { success: false, payload: null, message: 'Not allowed for ' + param.email }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async update(id,  category, param)
    {
        let result = this.validate(category);
        if(result.success){
            try {
                let newcategory = await CategoryModel.update(category, { where:  { id: id }  });
                result.payload = newcategory;
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
            let result  = await CategoryModel.destroy({ 
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

module.exports = CategoryLogic;