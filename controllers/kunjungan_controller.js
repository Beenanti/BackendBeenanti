require("../models/associations");
const { nanoid } = require('nanoid');
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
            id_und, nama_und:nama, id_panti, tanggal, waktu, durasi, detail, berkas:file, email:req.user.email, status_id:1
        })

        return res.status(200).json({ error: false, message: 'Berhasil upload request kunjungan' });

    } catch (error) {
        res.status(500).json({ error:true, message: error });
        console.error(error)
    }
}

const riwayat = async (req, res) => {
    try {
        const id = req.params.id_panti
        if (id == null||id == undefined) {
          return res.status(401).json({ error: true, message: 'Pilih panti terlebih dahulu' });
        }
        
        const riwayat = await modelKunjungan.findAll({
            where: {id_panti: id}
        })

        return res.status(200).json({error: false, riwayat});

    } catch (error) {
        res.status(500).json({ error:true, message: error });
        console.error(err)
    }
}

const lihat_data = async (req, res) => {
    try {
        const data_kunjungan = await modelKunjungan.findAll({
            include: [ modelPanti, modelStatus],
            order: [
              ['createdAt', 'ASC']
            ],
        })

        const data = data_kunjungan.map((kunjungan) => {
            return {
              id_und : kunjungan.id_und, 
              nama_und : kunjungan.nama_und,
              panti : kunjungan.panti.nama_panti,
              tanggal : kunjungan.tanggal,
              waktu : kunjungan.waktu,
              durasi : kunjungan.durasi,
              detail : kunjungan.detail,
              berkas : kunjungan.berkas,
              status : kunjungan.status.nama_status
            }
          })
    
          res.status(200).json({error: false, count:data.length, data});
        
    } catch (error) {
        res.status(500).json({ error:true, message: error });
        console.error(error)
    }
}

const verifikasi = async (req, res) => {
    try {
        // update status kunjungannya, diverifikasi atau tidak
        
    } catch (error) {
        res.status(500).json({ error:true, message: error });
        console.error(err)
    }
}

module.exports = {pengajuan, riwayat, lihat_data, verifikasi}