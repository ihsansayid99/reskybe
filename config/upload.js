const util = require("util");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      var message = `${file.originalname} is invalid. Only accept png/jpeg.`;
      return cb(message, null);
    }

    var filename = `${Date.now()}-reskybe-${file.originalname}`;
    cb(null, filename);
  }
});

var uploadFiles = multer({ storage: storage }).array("image", 10);
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;