require("../models/associations");
const { nanoid } = require('nanoid');
const modelUser = require("../models/user");
const modelPanti = require("../models/panti");
const modelStatus = require("../models/status");
const modelRelawan = require("../models/relawan");

const pengajuan = async (req, res) => {
    try {
        const { id_panti, bidang, tanggal, waktu, durasi, detail} = req.body;
        
        console.log('ini adalah'+req.file)
        const file = req.file.filename;
        const id_relawan = nanoid(3); //buat id nya dengan generate random string

        if (!file) {
            return res.status(404).json({ error: true, message: 'File tidak ada' });
        }

        await modelRelawan.create({
            id_relawan, id_panti, bidang, tanggal, waktu, durasi, detail, berkas:file, email_relawan:req.user.email, status_id:1
        })

        return res.status(200).json({ error: false, message: 'Berhasil upload request relawan' });

    } catch (err) {
        res.status(500).json({ error:true, message: err });
        console.error(err)
    }
}

const lihatData = async (req, res) => {     //keseluruhan
    try {
        const data_relawan = await modelRelawan.findAll({
            include: [ modelPanti, modelStatus, modelUser],
            order: [
              ['createdAt', 'ASC']
            ],
        }) 

        const data = data_relawan.map((relawan) => {
            return {
              nama : relawan.nama_und,
              panti : relawan.panti.nama_panti,
              tanggal : relawan.tanggal,
              waktu : relawan.waktu,
              durasi : relawan.durasi,
              detail : relawan.detail,
              berkas : `${process.env.APP_URL}/berkas_relawan/${encodeURIComponent(relawan.berkas)}`,
              status : relawan.status.nama_status,
              jadi_direlawi : relawan.jadikah,
              createdAt : relawan.createdAt,
              updatedAt : relawan.updatedAt,
            }
        })

        res.status(200).json({error: false, count:data.length, data_relawan});

    } catch (err) {
        res.status(500).json({ error:true, message: err });
        console.error(err)
    }
}

const lihatDataPanti = async (req, res) => {        //relawan per panti
    try {
        const id = req.params.id_panti
        if (id == null||id == undefined||id== ':id_panti'||id== 'null') {
          return res.status(401).json({ error: true, message: 'Pilih panti terlebih dahulu' });
        }
        
        const data_relawan = await modelRelawan.findAll({
            include: [modelStatus, modelUser],
            where: {id_panti: id}
        })
        
        const data = data_relawan.map((relawan) => {
            return {
              id : relawan.id_relawan, 
              nama : relawan.user.nama,
              user : relawan.email,
              bidang : relawan.bidang,
              tanggal : relawan.tanggal,
              waktu : relawan.waktu,
              durasi : relawan.durasi,
              detail : relawan.detail,
              berkas : `${process.env.APP_URL}/berkas_relawan/${encodeURIComponent(relawan.berkas)}`,
              status : relawan.status.nama_status,
              createdAt : relawan.createdAt,
              updatedAt : relawan.updatedAt,
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
        const { id_relawan } = req.params;
        // const { id_status } = req.body;

        const relawan = await modelRelawan.findOne({
            where: { id_relawan }
        });

        if (!relawan) {
            return res.status(404).json({ error: true, message: 'Data relawan tidak ditemukan' });
        }

        // if (id_status) {
            relawan.status_id = 2;
        // }

        await relawan.save();

        return res.status(200).json({ error: false, message: 'Data relawan berhasil terverifikasi' });

    } catch (err) {
        res.status(500).json({ error:true, message: err });
        console.error(err)
    }
}


module.exports = {pengajuan, lihatData, lihatDataPanti, verifikasi}