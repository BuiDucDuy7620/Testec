
const contactRouter=require('./contactRouter')
const applyRouter=require('./applyRouter')

const userRouter=require('./userRouter')

const blogRouter=require('./blogRouter')

const Router=(app)=>{
    // app.get('/',(req,res)=>{res.send('hello')})
    app.use('/testec',contactRouter)
    app.use('/testec',applyRouter)
    app.use('/user',userRouter)
    app.use('/blog',blogRouter)


}
module.exports=Router