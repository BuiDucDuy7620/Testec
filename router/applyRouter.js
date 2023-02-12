const express=require('express')
const applyRouter=express.Router()
const applyController=require('../controller/applyController')
applyRouter.post('/apply',applyController.postApply)

module.exports =applyRouter