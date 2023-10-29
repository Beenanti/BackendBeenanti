require("../models/associations");
const { nanoid } = require('nanoid');
const modelKebutuhan = require("../models/kebutuhan_panti");
const modelJenisKebutuhan = require("../models/jenis_kebutuhan");
const modelSatuan = require("../models/satuan");
const modelPanti = require("../models/panti");
const modelUser = require("../models/user")
const { Sequelize, where, Op } = require('sequelize');

const tambahkebutuhan = async (req, res) =>{
    try {
        const {id_panti,	nama_kebutuhan, id_jenis_kebutuhan, id_satuan, jumlah_kebutuhan} = req.body;
        const id_kebutuhan = nanoid(2);
        const baru = await modelKebutuhan.create({
            id_kebutuhan, id_panti,	nama_kebutuhan, id_jenis_kebutuhan, id_satuan, jumlah_kebutuhan
        })

        return res.status(201).json({ error: false, message: 'Berhasil tambah data Kebutuhan Panti!' });
    } catch (err) {
        res.status(500).json({ error:true, message: err });
        console.error(err)
      }
}

const lihatkebutuhan = async (req, res) => {
    try {

        const data_kebutuhan = await modelKebutuhan.findAll({
          include: [ modelPanti, modelJenisKebutuhan, modelSatuan],
          order: [
            ['createdAt', 'ASC']
          ],
        })
  
        const data = data_kebutuhan.map((kebutuhan_panti) => {
          return {
            id_kebutuhan : kebutuhan_panti.id_kebutuhan, 
            nama_panti : kebutuhan_panti.panti.nama_panti,	
            nama_kebutuhan : kebutuhan_panti.nama_kebutuhan, 
            jenis_kebutuhan : kebutuhan_panti.jenis_kebutuhan.nama_jenis_kebutuhan, 
            satuan : kebutuhan_panti.satuan.nama_satuan, 
            jumlah_kebutuhan : kebutuhan_panti.jumlah_kebutuhan,
            createdAt : kebutuhan_panti.createdAt,
            updatedAt : kebutuhan_panti.updatedAt
          }
        })
  
        res.status(200).json({error: false, count:data_kebutuhan.length, data});
        
      } catch (err) {
        res.status(500).json({ error:true, message: err });
        console.error(err)
      }
  };

const editkebutuhan = async (req, res) => {
    try {
        const { id_kebutuhan } = req.params; 
        const { id_panti, nama_kebutuhan, id_jenis_kebutuhan, id_satuan, jumlah_kebutuhan } = req.body;

        const kebutuhan = await modelKebutuhan.findOne({
            where: { id_kebutuhan }
        });

        if (!kebutuhan) {
            return res.status(404).json({ error: true, message: 'Data kebutuhan tidak ditemukan' });
        }

        if (id_panti) {
            kebutuhan.id_panti = id_panti;
        }
        if (nama_kebutuhan) {
            kebutuhan.nama_kebutuhan = nama_kebutuhan;
        }
        if (id_jenis_kebutuhan) {
            kebutuhan.id_jenis_kebutuhan = id_jenis_kebutuhan;
        }
        if (id_satuan) {
            kebutuhan.id_satuan = id_satuan;
        }
        if (jumlah_kebutuhan) {
            kebutuhan.jumlah_kebutuhan = jumlah_kebutuhan;
        }

        await kebutuhan.save(); 

        return res.status(200).json({ error: false, message: 'Data kebutuhan berhasil di perbarui' });

    } catch (err) {
        res.status(500).json({ error: true, message: err });
        console.error(err);
    }
};

const hapuskebutuhan = async (req, res) => {
    try {
        const { id_kebutuhan } = req.params; 
        const deleted = await modelKebutuhan.destroy({
            where: { id_kebutuhan }
        });

        if (deleted) {
            return res.status(200).json({ error: false, message: 'Data kebutuhan berhasil dihapus' });
        } else {
            return res.status(404).json({ error: true, message: 'Data kebutuhan gagal dihapus' });
        }

    } catch (err) {
        res.status(500).json({ error: true, message: err });
        console.error(err);
    }
};

const tambahkebpanti = async (req, res) => {
    try {
        const id_panti = req.params.id_panti
        const { nama_kebutuhan, id_jenis_kebutuhan, id_satuan, jumlah_kebutuhan } = req.body;
        const trukah = await modelPanti.findOne({
            include: [
              {
                model: modelUser,
                where: {email: req.user.email }
              }
            ],
            where: {id_panti}
          })

        //   console.log(trukah + "hbubu")

        const id_kebutuhan = nanoid(2);
        const baru = await modelKebutuhan.create({
            id_kebutuhan,
            id_panti,
            nama_kebutuhan,
            id_jenis_kebutuhan,
            id_satuan,
            jumlah_kebutuhan
        });

        return res.status(201).json({ error: false, message: 'Berhasil tambah data Kebutuhan Panti!' });
    } catch (err) {
        res.status(500).json({ error: true, message: err });
        console.error(err);
    }
};




const lihatkebpanti = async (req, res) => {
    try {
        const id_panti = req.params.id_panti;
        const trukah = await modelPanti.findOne({
            include: [
                {
                    model: modelUser,
                    where: { email: req.user.email }
                }
            ],
            where: { id_panti }
        });

        if (!trukah) {
            return res.status(404).json({ error: true, message: 'Panti tidak ditemukan' });
        }

        const data_kebutuhan = await modelKebutuhan.findAll({
            where: { id_panti: id_panti },
            include: [modelPanti, modelJenisKebutuhan, modelSatuan],
            order: [['createdAt', 'ASC']]
        });

        const data = data_kebutuhan.map((kebutuhan_panti) => {
            return {
                id_kebutuhan: kebutuhan_panti.id_kebutuhan,
                nama_panti: kebutuhan_panti.panti.nama_panti,
                nama_kebutuhan: kebutuhan_panti.nama_kebutuhan,
                jenis_kebutuhan: kebutuhan_panti.jenis_kebutuhan.nama_jenis_kebutuhan,
                satuan: kebutuhan_panti.satuan.nama_satuan,
                jumlah_kebutuhan: kebutuhan_panti.jumlah_kebutuhan,
                createdAt: kebutuhan_panti.createdAt,
                updatedAt: kebutuhan_panti.updatedAt
            };
        });

        res.status(200).json({ error: false, count: data_kebutuhan.length, data });

    } catch (err) {
        res.status(500).json({ error: true, message: err });
        console.error(err);
    }
};

const editkebpanti = async (req, res) => {
    try {
        const id_panti = req.params.id_panti;
        const { id_kebutuhan } = req.params;
        const { nama_kebutuhan, id_jenis_kebutuhan, id_satuan, jumlah_kebutuhan } = req.body;

        const kebutuhan = await modelKebutuhan.findOne({
            where: { id_kebutuhan, id_panti }
        });

        if (!kebutuhan) {
            return res.status(404).json({ error: true, message: 'Data kebutuhan tidak ditemukan' });
        }

        if (nama_kebutuhan) {
            kebutuhan.nama_kebutuhan = nama_kebutuhan;
        }
        if (id_jenis_kebutuhan) {
            kebutuhan.id_jenis_kebutuhan = id_jenis_kebutuhan;
        }
        if (id_satuan) {
            kebutuhan.id_satuan = id_satuan;
        }
        if (jumlah_kebutuhan) {
            kebutuhan.jumlah_kebutuhan = jumlah_kebutuhan;
        }

        await kebutuhan.save();

        return res.status(200).json({ error: false, message: 'Data kebutuhan berhasil di update' });

    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
        console.error(err);
    }
};

const hapuskebpanti = async (req, res) => {
    try {
        const id_panti = req.params.id_panti;
        const { id_kebutuhan } = req.params;

        const deleted = await modelKebutuhan.destroy({
            where: { id_kebutuhan, id_panti }
        });

        if (deleted) {
            return res.status(200).json({ error: false, message: 'Data kebutuhan berhasil dihapus' });
        } else {
            return res.status(404).json({ error: true, message: 'Data kebutuhan gagal dihapus' });
        }

    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
        console.error(err);
    }
};


module.exports = { tambahkebutuhan, lihatkebutuhan, editkebutuhan, hapuskebutuhan, tambahkebpanti, lihatkebpanti, editkebpanti, hapuskebpanti };
