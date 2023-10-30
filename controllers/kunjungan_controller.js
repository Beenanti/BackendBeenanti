require("../models/associations");
const { nanoid } = require('nanoid');
const { Op } = require("sequelize");
// const modelUser = require("../models/user");
const modelPanti = require("../models/panti");
const modelStatus = require("../models/status");
const modelKunjungan = require("../models/kunjungan_und");

const pengajuan = async (req, res) => {
    try {
        const {nama, id_panti, tanggal, waktu, durasi, detail} = req.body;
        const file = req.file.filename;
        const id_und = nanoid(3); //buat id nya dengan generate random string

        if (!file) {
            return res.status(404).json({ error: true, message: 'File tidak ada' });
        }
        
        await modelKunjungan.create({
            id_und, nama_und:nama, id_panti, tanggal, waktu, durasi, detail, berkas:file, jadikah:null, email:req.user.email, status_id:1
        })

        return res.status(200).json({ error: false, message: 'Berhasil upload request kunjungan' });

    } catch (error) {
        res.status(500).json({ error:true, message: error });
        console.error(error)
    }
}

const riwayat = async (req, res) => {
    try {
        const data_kunjungan = await modelKunjungan.findAll({
            include: [modelStatus, modelPanti],
            where: { [Op.or]: [{ jadikah: true }, { jadikah: false }]}
        })

        const data = data_kunjungan.map((kunjungan) => {
            return {
              id : kunjungan.id_und, 
              nama : kunjungan.nama_und,
              panti : kunjungan.panti.nama_panti,
              tanggal : kunjungan.tanggal,
              waktu : kunjungan.waktu,
              durasi : kunjungan.durasi,
              detail : kunjungan.detail,
              berkas : `${process.env.APP_URL}/berkas_kunjungan/${encodeURIComponent(kunjungan.berkas)}`,
              status : kunjungan.status.nama_status,
              jadi_dikunjungi : kunjungan.jadikah,
              createdAt : kunjungan.createdAt,
              updatedAt : kunjungan.updatedAt,
            }
          })
    
          res.status(200).json({error: false, count:data.length, data});

    } catch (error) {
        res.status(500).json({ error:true, message: error });
        console.error(err)
    }
}

const lihatData = async (req, res) => {        //list keseluruhan
    try {
        const data_kunjungan = await modelKunjungan.findAll({
            include: [ modelPanti, modelStatus],
            order: [
              ['createdAt', 'ASC']
            ],
        })

        const data = data_kunjungan.map((kunjungan) => {
            return {
              id : kunjungan.id_und, 
              nama : kunjungan.nama_und,
              panti : kunjungan.panti.nama_panti,
              tanggal : kunjungan.tanggal,
              waktu : kunjungan.waktu,
              durasi : kunjungan.durasi,
              detail : kunjungan.detail,
              berkas : `${process.env.APP_URL}/berkas_kunjungan/${encodeURIComponent(kunjungan.berkas)}`,
              status : kunjungan.status.nama_status,
              jadi_dikunjungi : kunjungan.jadikah,
              createdAt : kunjungan.createdAt,
              updatedAt : kunjungan.updatedAt,
            }
          })
    
          res.status(200).json({error: false, count:data.length, data});
        
    } catch (error) {
        res.status(500).json({ error:true, message: error });
        console.error(error)
    }
}

const detail = async (req, res) => {
    try {
        const id = req.params.id_kunjungan;

        if (id == null||id == undefined) {
            return res.status(401).json({ error: true, message: 'Pilih kunjungan terlebih dahulu' });
        }

        const dataKunjungan = await modelKunjungan.findByPk(id, {
            include: [ modelStatus, modelPanti ]
        })

        if (dataKunjungan) {
            return res.status(200).json({error: false, data: {
              nama: dataKunjungan.nama_und,
              user: dataKunjungan.email,
              panti: dataKunjungan.panti.nama_panti,
              tanggal: dataKunjungan.tanggal,
              waktu: dataKunjungan.waktu,
              durasi: dataKunjungan.durasi,
              detail: dataKunjungan.detail,
              status: dataKunjungan.status.nama_status,
              jadi_dikunjungi : kunjungan.jadikah,
              berkas: `${process.env.APP_URL}/berkas_kunjungan/${encodeURIComponent(dataKunjungan.berkas)}`,
              createdAt : dataKunjungan.createdAt,
              updatedAt : dataKunjungan.updatedAt
            }})
          } else {
            res.status(404).json({error:true, message:"panti tidak ada"})
          }

    } catch (error) {
        res.status(500).json({ error:true, message: error });
        console.error(error)
    }
}


const lihatDataPanti = async (req, res) => {
    try {
        const id = req.params.id_panti
        if (id == null||id == undefined||id== ':id_panti'||id== 'null') {
          return res.status(401).json({ error: true, message: 'Pilih panti terlebih dahulu' });
        }
        
        const data_kunjungan = await modelKunjungan.findAll({
            include: modelStatus,
            where: {id_panti: id}
        })
        
        const data = data_kunjungan.map((kunjungan) => {
            return {
              id : kunjungan.id_und, 
              nama : kunjungan.nama_und,
              user : kunjungan.email,
              tanggal : kunjungan.tanggal,
              waktu : kunjungan.waktu,
              durasi : kunjungan.durasi,
              detail : kunjungan.detail,
              status : kunjungan.status.nama_status,
              jadi_dikunjungi : kunjungan.jadikah,
              berkas : `${process.env.APP_URL}/berkas_kunjungan/${encodeURIComponent(kunjungan.berkas)}`,
              createdAt : kunjungan.createdAt,
              updatedAt : kunjungan.updatedAt,
            }
          })

        return res.status(200).json({error: false, count:data.length, data});

    } catch (error) {
        res.status(500).json({ error:true, message: error });
        console.error(error)
    }
}

const verifikasi = async (req, res) => {
    try {
        const { id_kunjungan } = req.params;
        // const { id_status } = req.body;

        const kunjungan = await modelKunjungan.findOne({
            where: { id_und: id_kunjungan }
        });

        if (!kunjungan) {
            return res.status(404).json({ error: true, message: 'Data kunjungan tidak ditemukan' });
        }

        // if (id_status) {
            kunjungan.status_id = 2;
        // }

        await kunjungan.save();

        return res.status(200).json({ error: false, message: 'Data kunjungan berhasil terverifikasi' });
        
    } catch (error) {
        res.status(500).json({ error:true, message: error });
        console.error(error)
    }
}

module.exports = {pengajuan, riwayat, lihatData, detail, lihatDataPanti, verifikasi}