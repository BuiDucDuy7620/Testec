const contactModel = require('../model/contactModel.js')
const { contactValidate } = require('../middleware/validate.js')

class contactController {
    postContact = (req, res) => {
        const { error, value } = contactValidate(req.body)
        if (error) return res.status(400).send(error.details[0].message)
        // const value=req.body.task
        let contact = new contactModel(value)
        contact.save((error, contact) => {
            if (error) {
                res.send(error)
            } else {
                console.log('Gui contact a contact thanh cong');
                res.send(contact)
            }
        })
    }

    
}
module.exports =new contactController()