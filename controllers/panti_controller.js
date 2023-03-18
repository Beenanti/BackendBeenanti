const modelPanti = require("../models/panti");
const modelUser = require("../models/user");
const modelDetailAdminPanti = require("../models/detail_admin_panti");
const bcrypt = require('bcryptjs');
const fs = require('fs');


// fungsi untuk menghapus file
const deleteFile = (filePath) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err)
        throw new Error('Failed to delete file');
      } else{
        console.log("berhasil hapus data")
      }
    });
};


// ------------------------------------------------------
const registerAdminPanti = async (req,res, next) =>{
    try {
      const {email, password, konfirmasiPassword } = req.body;

      // cek password sudah sama dengan konfirmasi password
      if (password !== konfirmasiPassword) {
        // deleteFile(filePath)
        return res.status(422).json({ error: true, message: 'Password dan Confirm Password tidak cocok' })
      } 
      
      
      // cek sudah ada email sudah digunakan atau belum
      const adaEmail = await modelUser.findOne({ where: { email } });
      if (adaEmail) {
        // deleteFile(filePath)
        return res.status(409).json({ error: true, message: 'Email sudah digunakan' });
      }
            
      const {id_panti, nik, nama, no_hp, jenis_kelamin, tempat_lahir, tgl_lahir, alamat, foto} = req.body;

      // memberi nama file
      const ekstensi_file = foto.split(';')[0].split('/')[1];
      const filename = Date.now().toString();
      const filePath = `./uploads/pp/${filename}.${ekstensi_file}`;
      const content = foto.split('base64,')[1]

      fs.writeFile(filePath, content, 'base64', (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`File ${filename}.${ekstensi_file} berhasil disimpan.`);
        }
      });
      
      // hash password
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      // masukin ke database
      const userBaru = await modelUser.create({
          email, nik, nama, jenis_kelamin, alamat, tempat_lahir, tgl_lahir, no_hp, 
          foto: `${filename}.${ekstensi_file}`,
          password:hashedPassword,
          role: 'admin_panti',
          status_id: '1'
      })

      const adminBaru = await modelDetailAdminPanti.create({
          id_panti, email
      })
      
      if ( foto && userBaru && adminBaru) {
          return res.status(201).json({ error: false, message: 'User berhasil registrasi' });
      } else {
          console.error("gagal upload")
          deleteFile(filePath)
      }

    } catch (error) {
        res.status(500).json({ error:true, message: error });
    }

}

const getListPanti = async (req, res) => {
    try {
      const panti = await modelPanti.findAll();
      if (panti) {
        res.status(200).json(panti);
      } else {
        res.json({pesan: "data tidak ada"})
      }
    } catch (error) {
      res.status(500).json({ message: error });
      console.error(error);
    }
  };

module.exports = {registerAdminPanti, getListPanti}