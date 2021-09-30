const Photo = require('../index/model')

module.exports = {
    listImage: async (req,res) => {
        try{
            await Photo.find({}, function(err, images) {
                const imageMap = images
                res.status(201).json({
                    message: 'data Berhasil diambil',
                    data: imageMap
                })
            })
        }catch(err){
            console.log(err.message)
        }
    }
}