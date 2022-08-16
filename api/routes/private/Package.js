const pool = require('../../utils/pool.js')

module.exports = {
    getDefaultBlockPackages (req, res) {
        let query = 'CALL SP_getDefaultBlocks()'
        let description = 'getDefaultBlocks'

        pool.executeQuery({
            query,
            description,
            res,
            onSuccess: (result) => {
                res.status(200).send({status: '1', message: 'OK', rows: eval(result[0][0])})
            }
        })
    }
}