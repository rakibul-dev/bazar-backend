const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
require("aws-sdk/lib/maintenance_mode_message").suppress = true;

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

exports.uploadImage = multer({
  storage: multerS3({
    s3: s3,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    bucket: "bazar-ghat",
    key: function (req, file, cb) {
      //   console.log("multer req......>", file);
      cb(null, Date.now().toString() + file.originalname);
    },
  }),
});

// module.exports = uploadImage;
