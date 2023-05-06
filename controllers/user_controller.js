const modelUser = require("../models/user");
const modelStatus = require("../models/status");
const modelDetailAdminPanti = require("../models/detail_admin_panti");
const { QueryTypes } = require('sequelize');
const db = require('../config/db');
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
const listDataUser = async (req,res) =>{
  try {
    const jumlah = parseInt(req.query.jumlah)||25;
    const halaman = parseInt(req.query.halaman)||1;

    // const dataUser = await modelUser.findAndCountAll({
    //   attributes: {exclude:['password', 'role']},
    //   limit: jumlah,
    //   offset: jumlah*(halaman-1),
    //   where: {role: "user_mobile"}
    // });

    const data_user = await db.query('SELECT email, nik, nama, jenis_kelamin, alamat, tempat_lahir, tgl_lahir, no_hp, foto, pekerjaan, nama_status AS status, createdAt , updatedAt FROM user JOIN status ON user.status_id = status.id_status WHERE user.role = ? LIMIT ?, ?', {
      replacements: ['user_mobile', jumlah*(halaman-1), jumlah],
      type : QueryTypes.SELECT
    });

    if (data_user) {
      res.status(200).json({error:false, count:data_user.length, data_user});
    }

  } catch (err) {
    res.status(500).json({ error:true, message: err });
    console.error(err);
  }

}

const listAdminPanti = async (req,res) =>{
  try {
    const jumlah = parseInt(req.query.jumlah)||25;
    const halaman = parseInt(req.query.halaman)||1;

    // const dataAdmin = await modelUser.findAndCountAll({
    //   attributes: {exclude:['password', 'role']},
    //   limit: jumlah,
    //   offset: jumlah*(halaman-1),
    //   where: {role: "admin_panti"}
    // });

    const data_admin = await db.query('SELECT email, nik, nama, jenis_kelamin, alamat, tempat_lahir, tgl_lahir, no_hp, foto, pekerjaan, nama_status AS status, createdAt, updatedAt FROM user JOIN status ON user.status_id = status.id_status WHERE user.role = ? LIMIT ?, ?', {
      replacements: ['admin_panti', jumlah*(halaman-1), jumlah],
      type : QueryTypes.SELECT
    });

    if (data_admin) {
      res.status(200).json({error:false, count:data_admin.length, data_admin});
    }
  } catch (err) {
    res.status(500).json({ error:true, message: err });
    console.error(err);
  }
  
}

const detailAdminPanti = async (req,res) =>{
  try {
    const email = req.params.email
    if (email == null||email == undefined) {
      return res.status(401).json({ error: true, message: 'Email pada parameternya kosong' });
    }

    const data = await modelUser.findByPk(email, {attributes:  {exclude:['password']} }, {where: {role: "admin_panti"}})
    if (data) {
      return res.status(200).json({error: false, data})
    } else {
      res.status(404).json({error:true, message:"user tidak ada"})
    }

  } catch (err) {
    res.status(500).json({ error:true, message: err });
    console.error(err);
  }
}

const lihatProfil = async (req,res) =>{
  try {
    const profil = await modelUser.findByPk( req.user.email, {
      include: modelStatus,
      attributes: {exclude:['password', 'role', 'status_id']},
    } );
    
    if (profil) {
      return res.status(200).json({ error: false, profil: {
        email: profil.email,
        nik: profil.nik,
        nama: profil.nama,
        jenis_kelamin: profil.jenis_kelamin,
        alamat: profil.alamat,
        tempat_lahir: profil.tempat_lahir,
        tgl_lahir: profil.tgl_lahir,
        no_hp: profil.no_hp,
        foto: profil.foto,
        pekerjaan: profil.pekerjaan,
        createdAt: profil.createdAt,
        updatedAt: profil.updatedAt,
        status: profil.status.nama_status,
      }});
    } else {
      res.status(404).json({error:true, message:"User tidak ada"})
    }
    
  } catch (err) {
    res.status(500).json({ error:true, message: err });
    console.error(err);
  }

}

const editProfil = async (req,res) =>{
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

    if (update[0]>0) {
      return res.status(200).json({error: false, message: 'berhasil update data', dataBaru});
    } else { 
      console.error("gagal update")
    } 

  } catch (err) {
    res.status(500).json({ error:true, message: err });
    console.error(err);
  }

}

const registerAdminPanti = async (req,res) =>{
  try {
    const {email, password, konfirmasi_password } = req.body;

    // cek password sudah sama dengan konfirmasi password
    if (password !== konfirmasi_password) {
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
    
    if ( userBaru && adminPantiBaru) {
      return res.status(201).json({ error: false, message: 'User berhasil registrasi' });
    } else {
      res.json({error:true, message: "gagal regis"})
      // console.error(userBaru + "--------" + adminPantiBaru)
    }

  } catch (err) {
    res.status(500).json({ error:true, message: err });
    console.error(err);
  }

}

const editAdminPanti = async (req,res) =>{
  try {
    const emailAdmin = req.params.email;
    if (emailAdmin == null||emailAdmin == undefined) {
      return res.status(401).json({ error: true, message: 'Email pada parameternya kosong' });
    }

    const {email, id_panti, nik, nama, jenis_kelamin, alamat, tempat_lahir, tgl_lahir, no_hp, pekerjaan, status_id} = req.body;

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
    if (status_id) { dataBaru.status_id = status_id; }
    
    const updateUser = await modelUser.update(dataBaru, {where: {email:emailAdmin, role:"admin_panti"} })
    
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

  } catch (err) {
    res.status(500).json({ error:true, message: err });
    console.error(err);
  }
}

const tambahFotoAdminPanti = async (req,res) =>{
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
  
      const fotoBaru = await modelUser.update({foto}, {where: {email}})
  
      if ( fotoBaru[0]>0 ) {
          return res.status(201).json({ error: false, message: 'Berhasil Upload Foto' });
      } else {
          console.error("gagal upload")
          deleteFile('./uploads/pp/' + foto)
      }
  
    } catch (err) {
      res.status(500).json({ error:true, message: err });
      console.error(err);
    }
}

const ubahPassword = async (req,res) =>{
  try {
    const {sandi_lama, sandi_baru, konfirmasi_sandi_baru} = req.body;

    const data_user = await modelUser.findByPk(req.user.email);
    if (!data_user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    const isPasswordValid = await bcrypt.compare(sandi_lama, data_user.password);

    if (!isPasswordValid) {
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

  } catch (err) {
    res.status(500).json({ error:true, message: err });
    console.error(err);
  }
}

const tambahFotoUser = async (req,res) =>{
  try {
    const foto = req.file.filename;
    if (!foto) {
      return res.status(404).json({ message: 'Foto tidak ada' });
    }

    const fotoBaru = await modelUser.update({foto}, {where: {email:req.user.email}})
  
    if ( fotoBaru[0]>0 ) {
        return res.status(201).json({ error: false, message: 'Berhasil Upload Foto' });
    } else {
        console.error("gagal upload")
        deleteFile('./uploads/pp/' + foto)
    }

  } catch (err) {
    res.status(500).json({ error:true, message: err });
    console.error(err);
  }
}


module.exports = {registerAdminPanti, lihatProfil, editProfil, tambahFotoAdminPanti ,listDataUser, listAdminPanti, detailAdminPanti, editAdminPanti, ubahPassword, tambahFotoUser };