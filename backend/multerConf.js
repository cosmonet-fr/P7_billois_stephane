const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': '.jpg',
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/gif': '.gif',
  'image/svg+xml': '.svg',
  'image/webp': '.webp'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'pictures');
  },
  filename: (req, file, callback) => {
    const extension = MIME_TYPES[file.mimetype];
    callback(null, Date.now() + '_profilePic' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');



//const multerProfilPic = (userId) => {
//  console.log(userId);
//}
