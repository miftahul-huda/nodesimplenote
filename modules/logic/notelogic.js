const NoteModel  = require( '../models/notemodel')
const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");
const CategoryModel = require('../models/categorymodel');
const ProjectModel = require('../models/projectmodel');


class NoteLogic {

    static async create(note, param)
    {
        let result = this.validateCreate(note);
        if(result.success){
            try {
                note.user = param.email;
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

    static async findAll(param)
    {
        try{
            var where = null;
            if(param.email != null)
                where = { user : {[Op.like] :  param.email } } ;

            let notes  = await NoteModel.findAll({ 
                where: where,
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

    static async findByProjectCategory(project, category, param)
    {
        try{


            let notes  = await NoteModel.findAll({ 
                where: this.getWhere(param, project, category),
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



    static async findByKeyword(search, param)
    {
        try{

            let notes  = await NoteModel.findAll({
                attributes:  [ 'id', 'title', 'short_desc', 'createdAt', 'tags','project_id' , 'category_id' ],
                where: {
                    [Op.and] :       
                    [
                        {
                            [Op.or] : [
                                {title: { [Op.like] : '%' + search + '%' }},
                                {short_desc: { [Op.like] : '%' + search + '%' }},
                                {content: { [Op.like] : '%' + search + '%' }},
                                {tags: { [Op.like] : '%' + search + '%' }}
                            ]
                        }
                        ,
                        {
                            user : { [Op.like] : param.email }
                        }
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

    static getSeearchWhere(param, search, project, category)
    {
        var ands = [];
        ands.push({
            [Op.or] : [
                {title: { [Op.like] : '%' + search + '%' }},
                {short_desc: { [Op.like] : '%' + search + '%' }},
                {content: { [Op.like] : '%' + search + '%' }},
                {tags: { [Op.like] : '%' + search + '%' }}
            ]
        });

        ands.push({
            user : { [Op.like] : param.email }
        });

        if(project != "*")
            ands.push({ project_id: project });

        if(category != "*")
            ands.push({ category_id: category });

        var where = {
            [Op.and] : ands
        }
        return where;
    }

    static getWhere(param, project, category)
    {
        var ands = [];
        ands.push({user : {[Op.like] :  param.email }});


        if(project != "*")
            ands.push({ project_id: project });

        if(category != "*")
            ands.push({ category_id: category });

        var  where = { [Op.and] : ands };
        return where;

    }

    static async findByKeywordProjectCategory(search, project, category, param)
    {
        try{

            let notes  = await NoteModel.findAll({
                attributes:  [ 'id', 'title', 'short_desc', 'createdAt', 'tags','project_id' , 'category_id' ],
                where: this.getSeearchWhere(param, search, project, category)
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

    static async get(id, param)
    {
        try{
            let note  = await NoteModel.findByPk(id);

            if(param.email != note.user)
                return { success: false, payload: null, message: 'Not allowed for ' + param.email }
            else
                return { success: true, payload: note }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async share(id)
    {
        try{
            let note  = await NoteModel.findByPk(id);
            return { success: true, payload: note }
        }
        catch (error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static async update(id,  note, param)
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

    static async delete(id, param)
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