const { categoryModel } = require("../../index/model")

module.exports = {
    viewContact: async ( req, res ) => {
        try {
            res.render('frontend/contact', {
                page: 'contact',
            })
        } catch (error) {
            console.log(error);
        }
    }
}