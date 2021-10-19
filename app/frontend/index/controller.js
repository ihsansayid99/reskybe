const { categoryModel } = require("../../index/model")

module.exports = {
    viewFrontendIndex: async (req,res) => {
        try{
            const photos = await categoryModel.find({}).populate('photo')
            res.render('frontend/index', {
                photos,
                page: 'index'
            })
        }catch(err){
            console.log(err.message)
        }
    }
}