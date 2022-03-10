const NoteModel  = require( './modules/models/notemodel')
const ProjectModel  = require( './modules/models/projectmodel')
const CategoryModel  = require( './modules/models/categorymodel')
const { Sequelize, Model, DataTypes } = require('sequelize');


const sequelize = new Sequelize(process.env.DBNAME, process.env.DBUSER, process.env.DBPASSWORD, {
    host: process.env.DBHOST,
    dialect: 'postgres',
    logging: false
});
  

class Initialization {
    static async initializeDatabase(){

        console.log("Initializing Database")
        console.log(process.env.DBHOST)
        let force = false;

        ProjectModel.initialize(sequelize, false);
        CategoryModel.initialize(sequelize, false);
        NoteModel.initialize(sequelize, false);

        NoteModel.belongsTo(CategoryModel, {foreignKey: 'category_id'});
        NoteModel.belongsTo(ProjectModel, {foreignKey: 'project_id'});

        await sequelize.sync();
        console.log("Done Initializing Database")
    }
}

module.exports = Initialization



