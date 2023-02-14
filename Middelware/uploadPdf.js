const multer = require("multer")

//Configuration for Multer
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./storages");
    },
    filename: function(req, file, cb) {
        const ext = file.mimetype.split("/")[1];
        cb(null, `${file.fieldname}-${Date.now()}.${ext}`)
   },
  });
  // Multer Filter
  const multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] === "pdf"||
    file.mimetype.split("/")[1] === "jpg"||
    file.mimetype.split("/")[1] === "png") {
      cb(null, true);
    } else {
      cb(new Error("Not a PDF File!!"), false);
    }
  };
  uploadPdf= multer({
    storage: multerStorage,
    fileFilter: multerFilter,
  });
  module.exports=uploadPdf