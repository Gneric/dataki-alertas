const pool = require('../../utils/pool.js')

const { jsonToHTML } = require('../../utils/formatter.js')
const { sendEmail } = require('../../utils/mailSender.js')

module.exports = {
    async createEvent (req, res) {
        const { name, package_id, creator } = req.body.data;
        
        let query = `CALL SP_createEvent(?, ?, ?)`
        let description = 'creating event'

        pool.executeQuery({
            data: [name, package_id, creator],
            query,
            description,
            res,
            onSuccess: (result) => {
                res.status(200).send({status: '1', message: 'OK', event_id_created: eval(result[0][0]['LAST_INSERT_ID()'])})
            }
        })
    },
    triggerEvent (req, res) {
        const { event_id } = req.body.data;

        let query = `CALL SP_getDataOfEvent ( ? )`
        let description = 'returning data from package'

        pool.executeQuery({
            data: [event_id],
            query,
            description,
            res,
            onSuccess: async (result) => {
                data = result[0][0]['package_data']
                mailFrom = result[0][0]['mailFrom']
                recievers = result[0][0]['mailTo']
                pkg_name = result[0][0]['name']
                
                htmlBody = jsonToHTML(pkg_name, data)
                mailTo = eval(recievers).map( el => el.usermail )

                let correoConfig = {
                    from: mailFrom,
                    to: mailTo,
                    //cc: correoCopiaVidaSoft,
                    subject: `${pkg_name}`,
                    html: htmlBody
                }
                mailResult = await sendEmail(correoConfig)
                res.status(200).send({status: '1', message: 'OK', mailResult: mailResult })
            }
        })
    }
}