const mongodb = require('mongodb');

module.exports.addFile = async (file) => {
    const { stream, filename, mimetype, encoding } = await file;
    const bucket = new mongodb.GridFSBucket(db._db);
    const uploadStream = bucket.openUploadStream(filename);
    await new Promise((resolve, reject) => {
        stream
            .pipe(uploadStream)
            .on("error", reject)
            .on("finish", resolve);
    });
    return { _id: uploadStream.id, filename, mimetype, encoding }
};