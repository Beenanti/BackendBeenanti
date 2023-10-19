const fs = require('fs');

// fungsi untuk menghapus file
const deleteFile = (filePath) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err)
        throw new Error(`Gagal menghapus file: ${err}`);
      } else{
        console.log(`File ${filePath} dihapus karena terjadi kesalahan`)
      }
    });
};

module.exports = {deleteFile}