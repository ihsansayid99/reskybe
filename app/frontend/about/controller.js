module.exports = {
    viewAbout: async ( req, res ) => {
        try {
            res.render('frontend/about', {
                page: 'about'
            })
        } catch (error) {
            console.log(error);
        }
    }
}
