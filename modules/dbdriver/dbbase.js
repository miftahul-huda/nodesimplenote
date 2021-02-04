
class dbbase {

    static async  getTables(connection)
    {

    }

    static async  getColumns(connection, tablename)
    {

    }

    static async  getPrimaryKeys(connection, tablename)
    {

    }

    static async  getForeignKeys(connection, tablename)
    {

    }

    static getColumnType(datatype)
    {
        let stringType = [ 'character', 'char', 'string', 'varchar'];
        let dateType = ['date', 'time'];
        let integerType = [ 'int'];
        let textType = ['text'];
        let doubleType = ['double', 'float', 'decimal'];

        var resdatatype = null;
        stringType.forEach(function (iem){
            if(datatype.toLowerCase().indexOf(iem) > -1)
            {
                resdatatype = "string";
            }
        });

        dateType.forEach(function (iem){
            if(datatype.toLowerCase().indexOf(iem) > -1)
            {
                resdatatype = "datetime";
            }
        });

        integerType.forEach(function (iem){
            if(datatype.toLowerCase().indexOf(iem) > -1)
            {
                resdatatype = "integer";
            }
        });

        textType.forEach(function (iem){
            if(datatype.toLowerCase().indexOf(iem) > -1)
            {
                resdatatype = "text";
            }
        });

        doubleType.forEach(function (iem){
            if(datatype.toLowerCase().indexOf(iem) > -1)
            {
                resdatatype = "double";
            }
        });

        return resdatatype;
    }
}

module.exports = dbbase;
