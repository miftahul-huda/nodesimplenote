const CategoryModel  = require( '../models/categorymodel')
const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");


class CategoryLogic {

    static async create(category)
    {
        let result = this.validateCreate(category);
        if(result.success){
            try {
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

    static async findAll()
    {
        try{
            let categorys  = await CategoryModel.findAll();
            return { success: true, payload: categorys }
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
            let categorys  = await CategoryModel.findAll({
                where: {
                    [Op.or] : [
                        {category_name: { [Op.like] : '%' + search + '%' }},
                        {description: { [Op.like] : '%' + search + '%' }}
                    ]

                }
                ,
                include: [ { model: ConnectionModel, as: 'connection' } ]
            })
            return { success: true, payload: categorys }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async get(id)
    {
        try{
            let categorys  = await CategoryModel.findByPk(id);

            return { success: true, payload: categorys }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async update(id,  category)
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

    static async delete(id)
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