const model = require("../models/user");
const bcrypt = require('bcryptjs');

//----------------------Register----------------------
exports.registerMobile = async (req,res) =>{
    try {
        const {email, nama, password, konfirmasiPassword} = req.body;

        // cek password sudah sama dengan konfirmasi password
        if (password !== konfirmasiPassword) {
            return res.status(400).json({ message: 'Password dan Confirm Password tidak cocok' })
        } 

        // cek sudah ada email sudah digunakan atau belum
        const adaEmail = await model.findOne({ where: { email } });
        if (adaEmail) {
            return res.status(400).json({ message: 'Email sudah digunakan' });
        }

        // hash password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const userBaru = await model.create({
            email, nama,
            password:hashedPassword,
            role: 'user_mobile',
            status_id: '1'
        })

        // kembalikan pesan sukses
        if (userBaru) {
            return res.status(201).json({ message: 'User berhasil registrasi' });
        } else {
            return res.json({ message: 'Gagal menambahkan data' });
        }

    } catch (error) {
        res.status(500).json({ message: 'Server error kbt🙏' });
        console.error(error);
    }
}

exports.registerAdminMaster = async (req,res) =>{
    try {
        const {email, nama, password, konfirmasiPassword} = req.body;

        // cek password sudah sama dengan konfirmasi password
        if (password !== konfirmasiPassword) {
            return res.status(400).json({ message: 'Password dan Confirm Password tidak cocok' })
        } 

        // cek sudah ada email sudah digunakan atau belum
        const adaEmail = await model.findOne({ where: { email } });
        if (adaEmail) {
            return res.status(400).json({ message: 'Email sudah digunakan' });
        }

        // hash password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const userBaru = await model.create({
            email, nama,
            password:hashedPassword,
            role: 'admin_master',
            status_id: '1'
        })

        // kembalikan pesan sukses
        if (userBaru) {
            return res.status(201).json({ message: 'User berhasil registrasi' });
        } else {
            return res.json({ message: 'Gagal menambahkan data' });
        }

    } catch (error) {
        res.status(500).json({ message: 'Server error kbt🙏' });
        console.error(error);
    }
}

exports.registerAdminPanti = async (req,res) =>{
    try {
        const {id_panti, nik, email, nama, nohp, jenis_kelamin, tempat_lahir, tgl_lahir, password, konfirmasiPassword} = req.body;

        const foto = req.file.filename

        // cek password sudah sama dengan konfirmasi password
        if (password !== konfirmasiPassword) {
            return res.status(400).json({ message: 'Password dan Confirm Password tidak cocok' })
        } 

        // cek sudah ada email sudah digunakan atau belum
        const adaEmail = await model.findOne({ where: { email } });
        if (adaEmail) {
            return res.status(400).json({ message: 'Email sudah digunakan' });
        }

        // hash password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        // masukin ke database
        const userBaru = await model.create({
            id_panti, nik, email, nama, nohp, jenis_kelamin, tempat_lahir, tgl_lahir, foto,
            password:hashedPassword,
            role: 'admin_panti',
            status_id: '1'
        })

        if (userBaru) {
            return res.status(201).json({ message: 'User berhasil registrasi' });
        } else {
            return res.json({ message: 'Gagal menambahkan data' });
        }
        
    } catch (error) {
        res.status(500).json({ message: 'Server error kbt🙏' });
        console.error(error);
    }
}