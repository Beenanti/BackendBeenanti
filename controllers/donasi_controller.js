require("../models/associations");
const { nanoid } = require('nanoid');
const modelDonasi = require("../models/donasi");
const modelPanti = require("../models/panti");
const modelUser = require("../models/user");
const modelJenisKebutuhan = require("../models/jenis_kebutuhan");
const modelSatuan = require("../models/satuan");
const modelStatus = require("../models/status");
const { Sequelize, where, Op } = require("sequelize");

const tambah = async (req, res) => {
    try {
        const {
            id_panti,
            nama_donasi,
            id_jenis_kebutuhan,
            id_satuan,
            jumlah_donasi,
            alamat_donasi,
        } = req.body;

		const id_donasi = nanoid(5);
        const bukti_tanda_terima = req.file.filename;
        if (!bukti_tanda_terima) {
            return res.status(404).json({ message: "Bukti Donasi tidak ada" });
        }

		const email_donatur = req.user.email;

        const id_status = 1; // Set the value of id_status to 1 directly

        const baru = await modelDonasi.create({
            id_donasi,
            id_panti,
            email_donatur,
            nama_donasi,
            id_jenis_kebutuhan,
            id_satuan,
            jumlah_donasi,
            alamat_donasi,
            id_status,
            bukti_tanda_terima,
        });

        return res
            .status(200)
            .json({ error: false, message: "Berhasil tambah data donasi!" });
    } catch (err) {
        res.status(500).json({ error: true, message: err });
        console.error(err);
    }
};

const getList = async (req, res) => {
	try {
		const data_donasi = await modelDonasi.findAll({
			include: [
				modelPanti,
				modelUser,
				modelJenisKebutuhan,
				modelSatuan,
				modelStatus,
			],
			order: [["createdAt", "ASC"]],
		});

		const data = data_donasi.map((donasi) => {
			return {
				id_donasi: donasi.id_donasi,
				nama_panti: donasi.panti.nama_panti,
				email_donatur: donasi.email_donatur,
				nama_donasi: donasi.nama_donasi,
				jenis_kebutuhan: donasi.jenis_kebutuhan.nama_jenis_kebutuhan,
				satuan: donasi.satuan.nama_satuan,
				jumlah_donasi: donasi.jumlah_donasi,
				alamat_donasi: donasi.alamat_donasi,
				status: donasi.status.nama_status,
				bukti_tanda_terima: donasi.bukti_tanda_terima,
				createdAt: donasi.createdAt,
				updatedAt: donasi.updatedAt,
			};
		});

		res.status(200).json({ error: false, count: data_donasi.length, data });
	} catch (err) {
		res.status(500).json({ error: true, message: err });
		console.error(err);
	}
};

const verifikasi = async (req, res) => {
    try {
        const { id_donasi } = req.params;
        const { id_status } = req.body;

        const donasi = await modelDonasi.findOne({
            where: { id_donasi }
        });

        if (!donasi) {
            return res.status(404).json({ error: true, message: 'Data donasi tidak ditemukan' });
        }

        if (id_status) {
            donasi.id_status = id_status;
        }

        await donasi.save();

        return res.status(200).json({ error: false, message: 'Data donasi berhasil terferifikasi' });

    } catch (err) {
        res.status(500).json({ error: true, message: err });
        console.error(err);
    }
};

const riwayatdonasi = async (req, res) => {
    try {
        const email_donatur = req.user.email;

        const data_donasi = await modelDonasi.findAll({
            where: { email_donatur },
            include: [modelPanti, modelUser, modelJenisKebutuhan, modelSatuan, modelStatus],
            order: [['createdAt', 'ASC']]
        });

        const data = data_donasi.map((donasi) => {
            return {
                id_donasi: donasi.id_donasi,
                nama_panti: donasi.panti.nama_panti,
                email_donatur: donasi.email_donatur,
                nama_donasi: donasi.nama_donasi,
                jenis_kebutuhan: donasi.jenis_kebutuhan.nama_jenis_kebutuhan,
                satuan: donasi.satuan.nama_satuan,
                jumlah_donasi: donasi.jumlah_donasi,
                alamat_donasi: donasi.alamat_donasi,
                status: donasi.status.nama_status,
                bukti_tanda_terima: donasi.bukti_tanda_terima,
                createdAt: donasi.createdAt,
                updatedAt: donasi.updatedAt,
            };
        });

        res.status(200).json({ error: false, count: data_donasi.length, data });

    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
        console.error(err);
    }
};

const verifikasidonasi = async (req, res) => {
    try {
        const { id_donasi, id_panti } = req.params;
        const { id_status } = req.body;

        const donasi = await modelDonasi.findOne({
            where: { id_donasi, id_panti },
            include: [modelPanti] // Pastikan untuk mengikutsertakan model Panti
        });

        if (!donasi) {
            return res.status(404).json({ error: true, message: 'Data donasi tidak ditemukan' });
        }

        if (id_status) {
            donasi.id_status = id_status;
        }

        await donasi.save();

        return res.status(200).json({ error: false, message: 'Data donasi berhasil di verifikasi' });

    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
        console.error(err);
    }
};

const lihatdonasi = async (req, res) => {
    try {
        const { id_panti } = req.params;

        const data_donasi = await modelDonasi.findAll({
            where: { id_panti },
            include: [modelPanti, modelUser, modelJenisKebutuhan, modelSatuan, modelStatus],
            order: [['createdAt', 'ASC']]
        });

        const data = data_donasi.map((donasi) => {
            return {
                id_donasi: donasi.id_donasi,
                nama_panti: donasi.panti.nama_panti,
                email_donatur: donasi.email_donatur,
                nama_donasi: donasi.nama_donasi,
                jenis_kebutuhan: donasi.jenis_kebutuhan.nama_jenis_kebutuhan,
                satuan: donasi.satuan.nama_satuan,
                jumlah_donasi: donasi.jumlah_donasi,
                alamat_donasi: donasi.alamat_donasi,
                status: donasi.status.nama_status,
                bukti_tanda_terima: donasi.bukti_tanda_terima,
                createdAt: donasi.createdAt,
                updatedAt: donasi.updatedAt,
            };
        });

        res.status(200).json({ error: false, count: data_donasi.length, data });

    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
        console.error(err);
    }
};

module.exports = { tambah, getList, verifikasi, verifikasidonasi, riwayatdonasi, lihatdonasi };
