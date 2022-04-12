const { Pool } = require('pg');

let pool;

module.exports = {
  connect: async () => {
    pool = new Pool({
      user: 'iatputlo',
      host: 'abul.db.elephantsql.com',
      database: 'iatputlo',
      password: 'C7Ez23OfHkUMNvudKv7R-tn57yBlF3mC',
      port: '5432',
    });

    return pool;
  },

  disconnect: async () => pool.end(),

  query: async (req, params) => {
    if (!pool) throw 'Pool was not created';

    return pool.query(req, params);
  },
};
