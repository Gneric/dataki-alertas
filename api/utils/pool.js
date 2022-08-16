/*
Reference: [http://stackoverflow.com/questions/18496540/node-js-mysql-connection-pooling]
You still have to write getConnection every time. But you could save the connection in the module the first time you get it.
*/
// [Node_Modules]
const mysql = require('mysql')

// [HandyCraft]
const config = require('../config/config.json')

const pool = mysql.createPool(config.conn_MySQL)

module.exports = {
  getConnection (options) {
    pool.getConnection((err, connection) => {
      if (err) {
        if (options.onConnectionError) {
          options.onConnectionError(err)
        } else {
          options.res.status(503).send({
            status: '-1',
            message: `Error connecting to database when [${options.description}]`,
            fatal: err.fatal,
            code: err.code,
            sqlMessage: err.sqlMessage
          })
        }
        return
      }
      options.onSuccess(connection)
    })
  },
  executeQuery (options) {
    /*
    options: {
      data : object || array || string -> optional
      query: string
      onConnectionError: function(err) {
      },
      onQueryError: function(err) {
      },
      onSuccess: function(result){

        // Reference: [https://www.npmjs.com/package/mysql#getting-the-id-of-an-inserted-row]
        // (And bellow)
        // When dealing with big numbers (above JavaScript Number precision limit),
        // you should consider enabling supportBigNumbers option to be able to read the insert id as a string, otherwise it will throw.
        // This option is also required when fetching big numbers from the database,
        // otherwise you will get values rounded to hundreds or thousands due to the precision limit.
        // [result.insertId]

        // You can get the number of affected rows from an insert, update or delete statement.
        // [result.affectedRows]

        // "changedRows" differs from "affectedRows" in that it does not count updated rows whose values were not changed.
        // [result.changedRows]
      }
      // ###### IMPORTANT!: "onConnectionError", "onQueryError" and "onSuccess" are exclusive and procedural.
      // It means if "onConnectionError" is triggered the rest of functions won't
    }
  */
    pool.getConnection((err, connection) => {
      if (err) {
        if (options.onConnectionError) {
          options.onConnectionError(err)
        } else {
          options.res.status(503).send({
            status: '-1',
            message: `Error connecting to database when [${options.description}]`,
            fatal: err.fatal,
            code: err.code,
            sqlMessage: err.sqlMessage
          })
        }
        return
      }

      connection.query(options.query, options.data, (err, result) => {
        connection.release()
        if (err) {
          if (options.onQueryError) {
            options.onQueryError(err)
          } else {
            options.res.status(503).send({
              status: '-1',
              message: `Error on query when [${options.description}]`,
              fatal: err.fatal,
              code: err.code,
              sqlMessage: err.sqlMessage
            })
          }
          return
        }
        options.onSuccess(result)
      })
    })
  }
}
