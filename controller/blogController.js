const blogModel = require('../model/blogModel.js')
const { blogValidate } = require('../middleware/validate.js')

class blogController {
    postBlog = (req, res) => {
        const { error, value } = blogValidate(req.body)
        if (error) return res.status(400).send(error.details[0].message)
        let blog = new blogModel(value)
        blog.save((error, blog) => {
            if (error) {
                res.send(error)
            } else {
                console.log('Gui blog a blog thanh cong');
                res.send(blog)
            }
        })
    }
    getAllBlog = (req, res) => {
        blogModel.find({}, { idName: 0, content: 0 ,description:0}).exec((err, blog) => {
            if (err) {
                res.send(err)
            } else {
                res.json(blog)
            }
        })
    }
    getBlogByIdName = (req, res) => {
        blogModel.find({ idName: req.params.idName }).exec((error, blog) => {
            if (error) {
                res.send('khong the lay thong tin blog')
            } else {
                res.json(blog)
            }
        })
    }
}
module.exports = new blogController()