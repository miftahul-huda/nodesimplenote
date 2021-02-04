const dbbase = require('./dbbase');

class dbdriverfactory
{
    static createDriver(drivername)
    {
        var driver = null;
        switch(drivername)
        {
            case 'postgresql':
            {
                let pgdriver = require('./pgdriver');
                driver = pgdriver;
            }
        }

        return driver;
    }
}


module.exports = dbdriverfactory;