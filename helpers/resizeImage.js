const Jimp = require('jimp');

const resizeImage = async (req, res, next) => {
    if (!req.file) {
        return next(new Error('No file uploaded')); // Якщо файл не був завантажений
      }
  const { path } = req.file;
  const image = await Jimp.read(path);
  image.resize(250, 250);
  await image.writeAsync(path);
  next();
};

module.exports = resizeImage;

// const Jimp = require("jimp");
// const HttpError = require("./HttpError");
// const path = require("path");

// const avatarsDir = path.join(__dirname, "../", "public");

// const resizeImage = async (tempUpload) => {
//     if (!tempUpload) {
//         HttpError(400,'No file uploaded');
//       }
//   const route = avatarsDir + "/" + tempUpload;

//  await Jimp.read(route, (error, image) => {
//     if (error) {
//       HttpError(400, "Jimp read error");
//     }

//     image.resize(250, 250);
//     // .greyscale();

//    image.write(route, (error) => {
//       if (error) {
//         HttpError(400, "Jimp write error");
//       }
//     });
//   });
// };

// module.exports = resizeImage;