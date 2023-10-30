require("../models/associations");
const { nanoid } = require('nanoid');
const modelKarya = require("../models/karya");
const modelPanti = require("../models/panti");
const { Sequelize, where, Op } = require('sequelize');

const tambahkarya = async (req, res) => {
    try {
        const id_panti = req.params.id_panti
        const {
            nama_karya,
            nama_anak,
            link_karya,
        } = req.body;

		const id_karya = nanoid(3);
        const url_gambar = req.files && req.files.length > 0 ? req.files[0].filename : null;
        if (!url_gambar) {
            return res.status(404).json({ message: "Gambar tidak ada" });
        }

        const baru = await modelKarya.create({
            id_karya,
            id_panti,
            nama_karya,
            nama_anak,
            link_karya,
            url_gambar,
        });

        return res
            .status(201)
            .json({ error: false, message: "Berhasil tambah data karya!" });
    } catch (err) {
        res.status(500).json({ error: true, message: err });
        console.error(err);
    }
};

const lihatkarya = async (req, res) => {
    try {
        const id_panti = req.params.id_panti;
        
        const data_karya = await modelKarya.findAll({
            where: { id_panti: id_panti },
            include: [modelPanti],
            order: [['createdAt', 'ASC']]
        });

        const data = data_karya.map((karya) => {
            return {
                id_karya: karya.id_karya,
                nama_panti: karya.panti.nama_panti,
                nama_karya: karya.nama_karya,
                nama_anak: karya.nama_anak,
                link_karya : karya.link_karya,
                url_gambar : karya.url_gambar,
                createdAt: karya.createdAt,
                updatedAt: karya.updatedAt
            };
        });

        res.status(200).json({ error: false, count: data_karya.length, data });

    } catch (err) {
        res.status(500).json({ error: true, message: err });
        console.error(err);
    }
};

const hapuskarya = async (req, res) => {
    try {
        const id_karya = req.params.id_karya;
        const deletedKarya = await modelKarya.destroy({ where: { id_karya } });

        if (deletedKarya) {
            return res.status(200).json({ error: false, message: "Data karya berhasil dihapus" });
        } else {
            return res.status(404).json({ error: true, message: "Data karya tidak ditemukan" });
        }
    } catch (err) {
        res.status(500).json({ error: true, message: err });
        console.error(err);
    }
};

const editkarya = async (req, res) => {
    try {
        const id_panti = req.params.id_panti;
        const { id_karya } = req.params;
        const { nama_karya, nama_anak, link_karya } = req.body;

        const karyaToUpdate = await modelKarya.findOne({ where: { id_karya, id_panti } });

        if (!karyaToUpdate) {
            return res.status(404).json({ error: true, message: 'Data karya tidak ditemukan' });
        }

        if (nama_karya) {
            karyaToUpdate.nama_karya = nama_karya;
        }
        if (nama_anak) {
            karyaToUpdate.nama_anak = nama_anak;
        }
        if (link_karya) {
            karyaToUpdate.link_karya = link_karya;
        }

        const url_gambar = req.files && req.files.length > 0 ? req.files[0].filename : karyaToUpdate.url_gambar;
        karyaToUpdate.url_gambar = url_gambar;

        await karyaToUpdate.save();

        return res.status(200).json({ error: false, message: 'Data karya berhasil di update' });

    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
        console.error(err);
    }
};

module.exports = { tambahkarya, lihatkarya, hapuskarya, editkarya };






