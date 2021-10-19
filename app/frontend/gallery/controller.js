const { categoryModel } = require("../../index/model")

module.exports = {
    viewGallery: async ( req, res ) => {
        try {
            const photos = await categoryModel.find({})
            res.render('frontend/gallery', {
                page: 'gallery',
                photos
            })
        } catch (error) {
            console.log(error);
        }
    },
    viewDetailGallery: async (req,res)=> {
        try {
            const {slug} = req.params   
            const photo = await categoryModel.findOne({slug: slug}).populate('photo')
            res.render('frontend/detail-gallery', {
                photo,
                page: 'gallery/detail'
            })
        } catch (error) {
            console.log(error);
        }
    }
}