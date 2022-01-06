const path = require('path');

module.exports = {
    viewFrontendIndex: async (req,res) => {
        try{
            res.sendFile(path.join(__dirname, '../../../index.html'));
        }catch(err){
            console.log(err.message)
        }
    }
}