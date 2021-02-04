const NoteModel  = require( '../models/notemodel')
const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");
const CategoryModel = require('../models/categorymodel');
const ProjectModel = require('../models/projectmodel');


class NoteLogic {

    static async create(note)
    {
        let result = this.validateCreate(note);
        if(result.success){
            try {
                let newnote = await NoteModel.create(note);
                result.payload = newnote;
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
            let notes  = await NoteModel.findAll({ 
                attributes: [ 'id', 'title', 'short_desc', 'createdAt', 'tags','project_id' , 'category_id' ],
                include: [
                    {  model: CategoryModel, as: 'category' },
                    {  model: ProjectModel, as: 'project' }
            ]});
            return { success: true, payload: notes }
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
            let notes  = await NoteModel.findAll({
                attributes:  [ 'id', 'title', 'short_desc', 'createdAt', 'tags','project_id' , 'category_id' ],
                where: {
                    [Op.or] : [
                        {title: { [Op.like] : '%' + search + '%' }},
                        {short_desc: { [Op.like] : '%' + search + '%' }},
                        {content: { [Op.like] : '%' + search + '%' }},
                        {tags: { [Op.like] : '%' + search + '%' }}
                    ]

                }
                ,
                include: [
                    {  model: CategoryModel, as: 'category' },
                    {  model: ProjectModel, as: 'project' }
                ]
            })
            return { success: true, payload: notes }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async get(id)
    {
        try{
            let notes  = await NoteModel.findByPk(id);

            return { success: true, payload: notes }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async update(id,  note)
    {
        let result = this.validate(note);
        if(result.success){
            try {
                let newnote = await NoteModel.update(note, { where:  { id: id }  });
                result.payload = newnote;
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
            let result  = await NoteModel.destroy({ 
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

module.exports = NoteLogic;