const { photoModel, categoryModel, homeModel } = require('../index/model')

module.exports = {
    portofolio: async (req,res) => {
        try{
            const photos = await categoryModel.find({}).populate('photo');
            res.status(201).json({
                status: 'success',
                data: photos
            })
        }catch(err){
            console.log(err.message)
        }
    },
    homepages: async(req,res) => {
        try {
            const homes = await homeModel.find({});
            res.status(201).json({
                status: 'success',
                data: homes
            })
        } catch (error) {
            console.log(error.message)
        }
    }
}