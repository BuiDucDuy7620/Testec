const applyModel = require('../model/applyModel.js')
const { applyValidate } = require('../middleware/validate.js')
const { upload } = require('../middleware/upload.js')
const fs = require('fs')
const path = require('path')

class applyController {
    postApply = async (req, res) => {
        const { error, value } = applyValidate(req.body)
        if (error) return res.status(400).send(error.details[0].message)
        // const value=req.body.task
        // docj file base64 vaf taoj link de luu vao mongodb
        if (value.resume) {
            let uploadFile = await upload(value.resume);
            let document = {
                type: uploadFile.type,
                url: `http://localhost:3000/static/document/${Date.now()}`,
                data: fs.writeFileSync(
                    path.join(`./public/document/${Date.now()}`),
                    uploadFile.data,
                    (err) => {
                        if (err) throw err
                    }
                )

            }
            value.resume = document.url 
        }
        // var x = path.join(`./public/document/${new Date().toLocaleDateString}`)

        //     console.log('joinnnnnnnnnnnnnnnnnnnnnnnnnn', x)
        //     console.log('dirnamennnnnnnnnnnnnnnnnnnnnnnnnn', __dirname)

        let apply = new applyModel(value)
        apply.save((error, apply) => {
            if (error) {
                res.send(error)
                console.log(error);
            } else {
                console.log('Gui apply a apply thanh cong');
                res.send(apply)
            }
        })
    }
}
module.exports = new applyController()