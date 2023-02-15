const contactModel = require('../model/contactModel.js')
const { contactValidate } = require('../middleware/validate.js')
const excelJS=require('exceljs')
const ejs = require('ejs')
const pdf = require('html-pdf')
const fs = require('fs')
const path = require('path')

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
    getAllContact = (req, res) => {
        contactModel.find({}).exec((err, contact) => {
            if (err) {
                res.send(err)
            } else {
                // console.log('lay thanh cong all contact', contact)
                res.json(contact)
            }
        })
    }
    getContactById = (req, res) => {
        contactModel.find({ _id: req.params.id }).exec((error, contact) => {
            if (error) {
                res.send('khong the lay thong tin contact')
            } else {
                // console.log('lay thanh cong contact', contact)
                res.json(contact)
            }
        })
    }
    exportAllContact = async (req, res) => {
        try {
            const data = await contactModel.find({})
            const workbook = new excelJS.Workbook()
            const worksheet = workbook.addWorksheet('myList')
            worksheet.columns = [
                { header: 'S.no', key: 's_no', width: 10 },
                { header: 'Message', key: 'message', width: 10 },
                { header: 'Name', key: 'name', width: 10 },
                { header: 'Email', key: 'email', width: 10 },
                { header: 'Phone', key: 'phone', width: 10 }
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
    exportContactById = async (req, res) => {
        try {
            const data = await contactModel.find({_id: req.params.id})
            const workbook = new excelJS.Workbook()
            const worksheet = workbook.addWorksheet('myList')
            worksheet.columns = [
                { header: 'S.no', key: 's_no', width: 10 },
                { header: 'Message', key: 'message', width: 10 },
                { header: 'Name', key: 'name', width: 10 },
                { header: 'Email', key: 'email', width: 10 },
                { header: 'Phone', key: 'phone', width: 10 }

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

    exportPDFListContact = async (req, res) => {
        try {
            const users = await contactModel.find({})
            const data = {
                contactModel: users
            }
            // console.log('dddddddddddddddddddddddddd', users)

            const filePathName = path.resolve(__dirname, '../view/htmltopdfContact.ejs')
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
module.exports =new contactController()
