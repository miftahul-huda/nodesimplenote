const { Model, DataTypes } = require('sequelize');

class ProjectModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            project_name: DataTypes.STRING,
            client_name: DataTypes.STRING,
            description: DataTypes.TEXT,
            project_start_date: DataTypes.STRING,
            project_end_date: DataTypes.STRING,
            user: DataTypes.STRING
        }, 
        { sequelize, modelName: 'project', tableName: 'project', force: force });
    }
}

module.exports = ProjectModel;