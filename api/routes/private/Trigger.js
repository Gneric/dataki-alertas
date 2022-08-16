const pool = require('../../utils/pool.js')

module.exports = {
    getDefaultTriggers (req, res) {
        let query = 'CALL SP_getDefaultTriggers()'
        let description = 'getDefaultTriggers'

        pool.executeQuery({
            query,
            description,
            res,
            onSuccess: (result) => {
                res.status(200).send({status: '1', message: 'OK', rows: eval(result[0][0]['json'])})
            }
        })
    }
}