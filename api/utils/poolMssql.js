const mssql = require('mssql')

// [HandyCraft]
const config = require('../config/config')
const confiMssql =  config.conn_MSSQL

module.exports = {
  async executeQuery (options) {
    try {
      let pool = await mssql.connect(confiMssql)
      let result = await pool.request()
        .query(options.query)
      
      options.onSuccess(result)
    } catch (err) {
      options.res.status(503).send({
        status: '-1',
        message: `Error on query when [${options.description}]`,
        fatal: err.fatal,
        code: err.code,
        sqlMessage: err.sqlMessage
      })
    }
  },
  async executeSp (options) {
    try {
      let pool = await mssql.connect(confiMssql)
      let result = await pool.request()
          .execute(options.query)
      
      return result
    } catch (err) {
      // options.res.status(503).send({
      //   status: '-1',
      //   message: `Error on query when [${options.description}]`,
      //   fatal: err.fatal,
      //   code: err.code,
      //   sqlMessage: err.sqlMessage
      // })
      return {
        status: '-1',
        message: `Error on query when [${options.description}]`,
        fatal: err.fatal,
        code: err.code,
        sqlMessage: err.sqlMessage
      }
    }
  }
}
