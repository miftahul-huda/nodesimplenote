const dbbase = require('./dbbase');
const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');

class pgdriver extends dbbase
{

    static createSequelize(connection)
    {
        const sequelize = new Sequelize(connection.database, connection.user, connection.password, {
            host: connection.host,
            dialect: 'postgres',
            logging: false
        });

        return sequelize;
    }

    static async  getTables(connection)
    {
        try
        {
            var resTables = [];
            var sequelize = this.createSequelize(connection);
            var tables = await sequelize.query('select * from information_schema.tables where table_schema = \'public\'');
            
            tables = tables[0];
            console.log("tables")
            console.log(tables);
            
            tables.forEach(function (item){
                resTables.push({ name: item.table_name });
            });
    
            return resTables;
        }
        catch (err)
        {
            throw err;
        }

    }

    static async  getColumns(connection, tablename)
    {
        try
        {
            var resColumns = [];
            var sequelize = this.createSequelize(connection);
            var columns = await sequelize.query("SELECT * FROM information_schema.columns WHERE table_schema = 'public' AND table_name   = '" + tablename + "';");
            var pkCols = await this.getPrimaryKeys(connection);
            columns.forEach(function (item){
                var autoincrement = false;
                var isPk = false;
                if(item.column_default.indexOf('nextval') > -1)
                    autoincrement = true;

                pkCols.forEach(function (pkitem){
                    if(pkitem.name.toLowerCase() == item.name.toLowerCase())
                        isPk = true;
                });
                
                resColumns.push({ name: item.table_name, data_type: this.getColumnType(item.data_type), autoincrement: autoincrement, pk: isPk  });
            });
    
            return resColumns;
        }
        catch (err)
        {
            throw err;
        }
    }

    static async  getPrimaryKeys(connection, tablename)
    {
        try
        {
            var resColumns = [];
            var sequelize = this.createSequelize(connection);
            var columns = await sequelize.query("SELECT a.attname " +
                    "FROM   pg_index i " +
                    "JOIN   pg_attribute a ON a.attrelid = i.indrelid " +
                    "                     AND a.attnum = ANY(i.indkey) " +
                    "WHERE  i.indrelid = '" + tablename + "'::regclass " +
                    "AND    i.indisprimary;");

            columns.forEach(function (item){
                resColumns.push({ name: item.attname });
            });
    
            return resColumns;
        }
        catch (err)
        {
            throw err;
        }
    }

    static async  getForeignKeys(connection, tablename)
    {
        return [];
    }
}

module.exports = pgdriver;
