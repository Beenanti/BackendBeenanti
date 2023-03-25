const modelUser = require("../models/user");
const modelDetailAdminPanti = require("../models/detail_admin_panti");
const bcrypt = require('bcryptjs');
const fs = require('fs');
const jwt = require('jsonwebtoken');


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


// ----------------------------------------------------
const listDataUser = async (req,res, next) =>{
  try {
    const jumlah = parseInt(req.query.jumlah)||25;
    const halaman = parseInt(req.query.halaman)||1;

    // console.log(jumlah + "-----" + halaman)

    const dataUser = await modelUser.findAndCountAll({
      attributes: {exclude:['password', 'role']},
      limit: jumlah,
      offset: jumlah*(halaman-1),
      where: {role: "user_mobile"}
    });
    if (dataUser) {
      res.status(200).json(dataUser);
    }

  } catch (error) {
    res.status(500).json({ error:true, message: error });
  }

}

const listAdminPanti = async (req,res, next) =>{
  try {
    const jumlah = parseInt(req.query.jumlah)||25;
    const halaman = parseInt(req.query.halaman)||1;

    // console.log(jumlah + "-----" + halaman)

    const dataAdmin = await modelUser.findAndCountAll({
      attributes: {exclude:['password', 'role']},
      limit: jumlah,
      offset: jumlah*(halaman-1),
      where: {role: "admin_panti"}
    });
    if (dataAdmin) {
      res.status(200).json(dataAdmin);
    }
  } catch (error) {
    res.status(500).json({ error:true, message: error });
  }
  
}

const detailAdminPanti = async (req,res, next) =>{
  try {
    const email = req.params.email
    if (req.params.email == null||req.params.email == undefined) {
      return res.status(401).json({ error: true, message: 'Email pada parameternya kosong' });
    }

    const data = await modelUser.findByPk(email, {attributes:  {exclude:['password']} })
    if (data) {
      return res.status(200).json({error: false, data})
    } else {
      res.status(404).json({error:true, message:"user tidak ada"})
    }

  } catch (error) {
    res.status(500).json({ error:true, message: error });
  }
}

const lihatProfil = async (req,res, next) =>{
  try {
    const data = await modelUser.findByPk( req.user.email, {attributes: {exclude:['password', 'role']} } );
    if (data) {
      return res.status(200).json({ error: false, data});
    } else {
      res.status(404).json({error:true, message:"user tidak ada"})
    }
    
  } catch (error) {
      res.status(500).json({ error:true, message: error });
  }

}

const editProfil = async (req,res, next) =>{
  try {
    const {email, nik, nama, jenis_kelamin, alamat, tempat_lahir, tgl_lahir, no_hp, pekerjaan} = req.body;

    const dataBaru = {}
    if (email) { dataBaru.email = email; }
    if (nik) { dataBaru.nik = nik; }
    if (nama) { dataBaru.nama = nama; }
    if (jenis_kelamin) { dataBaru.jenis_kelamin = jenis_kelamin; }
    if (alamat) { dataBaru.alamat = alamat; }
    if (tempat_lahir) { dataBaru.tempat_lahir = tempat_lahir; }
    if (tgl_lahir) { dataBaru.tgl_lahir = tgl_lahir; }
    if (no_hp) { dataBaru.no_hp = no_hp; }
    if (pekerjaan) { dataBaru.pekerjaan = pekerjaan; }
    
    const update = await modelUser.update(dataBaru, {where: {email:req.user.email} })

    if (update) {
      return res.status(200).json({error: false, message: 'berhasil update data', dataBaru});
    } else { 
      console.error("gagal update")
    } 

  } catch (err) {
    res.status(500).json({ error:true, message: err });
  }

}

const registerAdminPanti = async (req,res, next) =>{
  try {
    const {email, password, konfirmasiPassword } = req.body;

    // cek password sudah sama dengan konfirmasi password
    if (password !== konfirmasiPassword) {
      return res.status(422).json({ error: true, message: 'Password dan Confirm Password tidak cocok' })
    } 
    
    // cek sudah ada email sudah digunakan atau belum
    const adaEmail = await modelUser.findOne({ where: { email } });
    if (adaEmail) {
      return res.status(409).json({ error: true, message: 'Email sudah digunakan' });
    }
          
    const {id_panti, nik, nama, no_hp, jenis_kelamin, tempat_lahir, tgl_lahir, alamat, pekerjaan} = req.body;
    
    // hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // masukin ke database
    const userBaru = await modelUser.create({
        email, nik, nama, jenis_kelamin, alamat, tempat_lahir, tgl_lahir, no_hp, pekerjaan,
        password:hashedPassword,
        role: 'admin_panti',
        status_id: '1'
    })

    const adminPantiBaru = await modelDetailAdminPanti.create({
        id_panti, email
    })
    
    if ( userBaru[0]>0 && adminPantiBaru[0]>0) {
      return res.status(201).json({ error: false, message: 'User berhasil registrasi' });
    } else {
      res.json({error:true, message: "gagal regis"})
      console.error("gagal regis")
    }

  } catch (error) {
      res.status(500).json({ error:true, message: error });
  }

}

const editAdminPanti = async (req,res, next) =>{
  try {
    const emailAdmin = req.params.email;
    if (emailAdmin == null||emailAdmin == undefined) {
      return res.status(401).json({ error: true, message: 'Email pada parameternya kosong' });
    }

    const {email, id_panti, nik, nama, jenis_kelamin, alamat, tempat_lahir, tgl_lahir, no_hp, pekerjaan, status} = req.body;

    const dataBaru = {}
    if (email) { dataBaru.email = email; }
    if (nik) { dataBaru.nik = nik; }
    if (nama) { dataBaru.nama = nama; }
    if (jenis_kelamin) { dataBaru.jenis_kelamin = jenis_kelamin; }
    if (alamat) { dataBaru.alamat = alamat; }
    if (tempat_lahir) { dataBaru.tempat_lahir = tempat_lahir; }
    if (tgl_lahir) { dataBaru.tgl_lahir = tgl_lahir; }
    if (no_hp) { dataBaru.no_hp = no_hp; }
    if (pekerjaan) { dataBaru.pekerjaan = pekerjaan; }
    if (status) { dataBaru.status = status; }
    
    const updateUser = await modelUser.update(dataBaru, {where: {email:emailAdmin} })
    
    const updateAdminPanti = {}
    if (email) { updateAdminPanti.email = email; }
    if (id_panti) { updateAdminPanti.id_panti = id_panti; }

    const updateDetailAdmin = await modelDetailAdminPanti.update(updateAdminPanti, {where: {email} })

    if (updateUser[0]>0 || updateDetailAdmin[0]>0) {
      return res.status(200).json({error: false, message: 'berhasil update data', data_baru:{user:dataBaru, admin_panti:updateAdminPanti} });
    } else { 
      console.error("tidak ada update")
      res.json({error: true, message: 'tidak ada data yang diupdate (email yang dimaksud tidak ada, atau body requestnya kosong)', data_baru:{user:dataBaru, admin_panti:updateAdminPanti}}).status(304);
    } 

  } catch (error) {
    res.status(500).json({ error:true, message: error });
  }
}

const tambahFotoUser = async (req,res, next) =>{
    try {
      const email = req.params.email;

      const user = await modelUser.findByPk(email);
      if (!user) {
        return res.status(404).json({ message: 'User tidak ditemukan' });
      }

      const foto = req.file.filename;
      if (!foto) {
        return res.status(404).json({ message: 'Foto tidak ada' });
      }

      // memberi nama file
    //   const ekstensi_file = foto.split(';')[0].split('/')[1];
    //   const filename = Date.now().toString();
    //   const filePath = `./uploads/pp/${filename}.${ekstensi_file}`;
    //   const content = foto.split('base64,')[1]
  
    //   fs.writeFile(filePath, content, 'base64', (err) => {
    //     if (err) {
    //       console.error(err);
    //     } else {
    //       console.log(`File ${filename}.${ekstensi_file} berhasil disimpan.`);
    //     }
    //   });
  
      const fotoBaru = await modelUser.update({foto}, {where: {email}})
  
      if ( fotoBaru ) {
          return res.status(201).json({ error: false, message: 'Berhasil Upload Foto' });
      } else {
          console.error("gagal upload")
          deleteFile('./uploads/pp/' + foto)
      }
  
    } catch (error) {
        res.status(500).json({ error:true, message: error });
    }
}

const ubahPassword = async (req,res, next) =>{
  try {
    const {sandi_lama, sandi_baru, konfirmasi_sandi_baru} = req.body;

    const sandi = await modelUser.findOne({ where: { sandi_lama } });
    if (!sandi) {
        return res.status(401).json({ error:true, message: 'Masukkan sandi yang sesuai' });
    }

    if (sandi_baru !== konfirmasi_sandi_baru) {
      return res.status(422).json({ error: true, message: 'Password dan konfirmasi password tidak sesuai' })
    }

    // hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(sandi_baru, salt);

    const sandiBaru = await modelUser.update({password:hashedPassword}, {where: {email:req.user.email}})

    if ( sandiBaru[0]>0 ) {
      return res.status(201).json({ error: false, message: 'User berhasil ganti password' });
    } else {
      res.json({error:true, message: "gagal ganti password"})
      console.error("gagal")
    }

  } catch (error) {
    res.status(500).json({ error:true, message: error });
  }
}

module.exports = {registerAdminPanti, lihatProfil, editProfil, tambahFotoUser ,listDataUser, listAdminPanti, detailAdminPanti, editAdminPanti, ubahPassword };