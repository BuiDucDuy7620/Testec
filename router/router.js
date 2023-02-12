
const contactRouter=require('./contactRouter')
const applyRouter=require('./applyRouter')

const Router=(app)=>{
    // app.get('/',(req,res)=>{res.send('hello')})
    app.use('/testec',contactRouter)
    app.use('/testec',applyRouter)

}
module.exports=Router