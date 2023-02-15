const express=require('express')
const contactRouter=express.Router()
const contactController=require('../controller/contactController')
contactRouter.post('/contact-us',contactController.postContact)
contactRouter.get('/getAllContact',contactController.getAllContact)
contactRouter.get('/getContactById/:id',contactController.getContactById)
contactRouter.get('/exportContactById/:id',contactController.exportContactById)
contactRouter.get('/exportAllContact',contactController.exportAllContact)
contactRouter.get('/exportPDFListContact',contactController.exportPDFListContact)

module.exports =contactRouter