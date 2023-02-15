const applyModel = require('../model/applyModel.js')
const { applyValidate } = require('../middleware/validate.js')
const { upload } = require('../middleware/upload.js')
const fs = require('fs')
const path = require('path')
const excelJS = require('exceljs')
const ejs = require('ejs')
const pdf = require('html-pdf')



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

    getAllApply = (req, res) => {
        applyModel.find({}).exec((err, apply) => {
            if (err) {
                res.send(err)
            } else {
                // console.log('lay thanh cong all book a demo', apply)
                res.json(apply)
            }
        })
    }
    getApplyById = (req, res) => {
        applyModel.find({ _id: req.params.id }).exec((error, apply) => {
            if (error) {
                res.send('khong the lay thong tin book a demo')
            } else {
                // console.log('lay thanh cong book a demo', apply)
                res.json(apply)
            }
        })
    }
    exportAllApply = async (req, res) => {
        try {
            const data = await applyModel.find({})
            const workbook = new excelJS.Workbook()
            const worksheet = workbook.addWorksheet('myList')
            worksheet.columns = [
                { header: 'S.no', key: 's_no', width: 10 },
                { header: 'FirstName', key: 'firstName', width: 10 },
                { header: 'LastName', key: 'lastName', width: 10 },
                { header: 'Email', key: 'email', width: 10 },
                { header: 'Phone', key: 'phone', width: 10 },

                { header: 'ContactCode', key: 'contactCode', width: 10 },
                { header: 'WebsiteURL', key: 'websiteURL', width: 10 },
                { header: 'Resume', key: 'resume', width: 10 }
            ]
            let count = 1
            data.forEach(
                (listdata) => {
                    listdata.s_no = count
                    worksheet.addRow(listdata)
                    count += 1
                }
            )
            worksheet.getRow(1).eachCell((cell) => {
                cell.font = { bold: true };
            })
            res.setHeader(
                'Content-Type',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            );
            res.setHeader('Content-Disposition', `attachment; filename=data.xlsx`);
                return workbook.xlsx.write(res).then(()=>{
                    res.status(200)
                })
        }
        catch (e) {
            res.status(500).send(e)
        }
    }
    exportApplyById = async (req, res) => {
        try {
            const data = await applyModel.find({_id: req.params.id})
            const workbook = new excelJS.Workbook()
            const worksheet = workbook.addWorksheet('myList')
            worksheet.columns = [
                { header: 'S.no', key: 's_no', width: 10 },
                { header: 'FirstName', key: 'firstName', width: 10 },
                { header: 'LastName', key: 'lastName', width: 10 },
                { header: 'Email', key: 'email', width: 10 },
                { header: 'Phone', key: 'phone', width: 10 },

                { header: 'ContactCode', key: 'contactCode', width: 10 },
                { header: 'WebsiteURL', key: 'websiteURL', width: 10 },
                { header: 'Resume', key: 'resume', width: 10 }
            ]
            let count = 1
            data.forEach(
                (listdata) => {
                    listdata.s_no = count
                    worksheet.addRow(listdata)
                    count += 1
                }
            )
            worksheet.getRow(1).eachCell((cell) => {
                cell.font = { bold: true };
            })
            res.setHeader(
                'Content-Type',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            );
            res.setHeader('Content-Disposition', `attachment; filename=data.xlsx`);
                return workbook.xlsx.write(res).then(()=>{
                    res.status(200)
                })
        }
        catch (e) {
            res.status(500).send(e)
        }
    }
    exportPDFListApply = async (req, res) => {
        try {
            const users = await applyModel.find({})
            const data = {
                applyModel: users
            }
            // console.log('dddddddddddddddddddddddddd', users)

            const filePathName = path.resolve(__dirname, '../view/htmltopdfApply.ejs')
            const htmlString = fs.readFileSync(filePathName).toString()
            const options = {
                format: 'Letter'
            }
            const ejsData = ejs.render(htmlString, data)
            pdf.create(ejsData, options).toFile('data.pdf', (err, response) => {
                if (err) console.log(err)
                const filePath = path.resolve(__dirname, '../data.pdf')
                fs.readFile(filePath, (err, file) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send('could not dload file')
                    }
                    res.setHeader('Content-Type', 'application/pdf');
                    res.setHeader('Content-Disposition', `attachment; filename="data.pdf"`);
                    res.send(file)
                })
            })
        }
        catch (e) {
            console.log(e.message);
        }
    }
    
}
module.exports = new applyController()