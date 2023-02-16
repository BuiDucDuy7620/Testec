const express=require('express')
const applyRouter=express.Router()
const applyController=require('../controller/applyController')
applyRouter.post('/apply',applyController.postApply)
applyRouter.get('/',applyController.getAllApply)
applyRouter.get('/getApplyById/:id',applyController.getApplyById)
applyRouter.get('/exportExcelApplyById/:id',applyController.exportApplyById)
applyRouter.get('/exportExcelAllApply',applyController.exportAllApply)
applyRouter.get('/exportPDFListApply',applyController.exportPDFListApply)

module.exports =applyRouter