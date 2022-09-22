const multer = require ("multer")
const path = require( 'path');

let fileStorageEngine = multer.diskStorage({
  destination: (req, file,cb)=>{
    cb(null, "upload")
  },
  filename:(req, file ,cb)=>{
    cb(null,file.originalname)
  }
})
let upload = multer({storage:fileStorageEngine})

module.exports = upload