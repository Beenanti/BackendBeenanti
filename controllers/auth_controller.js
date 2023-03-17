const modelUser = require("../models/user");
const modelToken = require("../models/token_user");
const modelDetailAdminPanti = require("../models/detail_admin_panti");
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
require('dotenv').config()

// ----------------------Register----------------------
const registerMobile = async (req,res) =>{
    try {
        const {email, nama, password, konfirmasiPassword} = req.body;

        // cek password sudah sama dengan konfirmasi password
        if (password !== konfirmasiPassword) {
            return res.status(400).json({ message: 'Password dan Confirm Password tidak cocok' })
        } 

        // cek sudah ada email sudah digunakan atau belum
        const adaEmail = await modelUser.findOne({ where: { email } });
        if (adaEmail) {
            return res.status(400).json({ message: 'Email sudah digunakan' });
        }

        // hash password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const userBaru = await modelUser.create({
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
        res.status(500).json({ message: error });
    }
}

const registerAdminMaster = async (req,res) =>{
    try {
        const {email, nama, password, konfirmasiPassword} = req.body;

        // cek password sudah sama dengan konfirmasi password
        if (password !== konfirmasiPassword) {
            return res.status(400).json({ message: 'Password dan Confirm Password tidak cocok' })
        } 

        // cek sudah ada email sudah digunakan atau belum
        const adaEmail = await modelUser.findOne({ where: { email } });
        if (adaEmail) {
            return res.status(400).json({ message: 'Email sudah digunakan' });
        }

        // hash password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const userBaru = await modelUser.create({
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
        res.status(500).json({ message: error });
    }
}

const registerAdminPanti = async (req,res) =>{
    try {
        const {id_panti, nik, nama, email, nohp, jenis_kelamin, tempat_lahir, tgl_lahir, alamat, password, konfirmasiPassword} = req.body;

        const foto = req.file.filename

        // cek password sudah sama dengan konfirmasi password
        if (password !== konfirmasiPassword) {
            return res.status(400).json({ message: 'Password dan Confirm Password tidak cocok' })
        } 

        // cek sudah ada email sudah digunakan atau belum
        const adaEmail = await modelUser.findOne({ where: { email } });
        if (adaEmail) {
            return res.status(400).json({ message: 'Email sudah digunakan' });
        }

        // hash password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        // masukin ke database
        const userBaru = await modelUser.create({
            email, nik, nama, jenis_kelamin, alamat, tempat_lahir, tgl_lahir, nohp, foto,
            password:hashedPassword,
            role: 'admin_panti',
            status_id: '1'
        })

        const adminBaru = await modelDetailAdminPanti.create({
            id_panti, email
        })
        
        if (userBaru && adminBaru) {
            return res.status(201).json({ message: 'User berhasil registrasi' });
        } else {
            return res.json({ message: 'Gagal menambahkan data' });
        }
        
    } catch (error) {
        res.status(500).json({ message: error });
        console.error(error);
    }
}

// --------------------Login--------------------------

const login = async (req, res) =>{
    try {
        const {email, password} = req.body;

        // Validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        // Check if user exists
        const user = await modelUser.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Email atau password tidak valid' });
        }

        console.log(user);

        // Check if password is correct
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Email atau password tidak valid' });
        }
        
        // ambil role, email dan nama user
        const role_user = user.role;
        const nama_user =user.nama;

        // cek udah ada token dari ip yang sama atau belum
        const ip = req.ip;
        const adaIp = await modelToken.findOne({where: {ip_address: ip}})
        if (adaIp) {
            return res.status(401).json({ 
                message: 'logout dulu, baru login lagi',
                token_sebelumnya : adaIp.remember_token, 
                data_user: {
                    email, nama_user, role_user
                } 
            });
        }

        // Create and sign a JWT token
        const token = jwt.sign({email, role_user }, process.env.SECRET_KEY, {
            // expiresIn: '1m',
        });
        
        await modelToken.create( { 
                user: email,
                remember_token: token,
                ip_address: req.ip,
                createdAt: new Date(),
            }, 
            { where: { email }}
        );

        // Return the token and user information
        return res.status(200).json({
            message: 'Berhasil Login!',
            token, 
            data_user: {
                email, nama_user, role_user
            }
        });

    } catch (error) {
        res.status(500).json({ message: error});
    }
}
    
// --------------------Logout-------------------------
const logout = async (req, res) =>{
    try {
        // mengambil token dari header Authorization
        const authHeader = req.get('Authorization');
        const token = authHeader.split(' ')[1];
        
        // jika token tidak ada, kembalikan respons error
        if (authHeader == null||authHeader == undefined) {
            return res.status(401).json({ message: 'Token tidak ada' });
        }

        // verifikasi token
        jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
            if (err) {
              return res.status(401).json({ message: err });
            }

            const adaToken = await modelToken.findOne({where: {remember_token: token}})
            if (!adaToken) {
                return res.status(401).json({ message: "Tidak ada token atau sudah logout sebelumnya" });
            }
            
            // hapus token dari database
            await modelToken.destroy(
                { where: {remember_token: token}}
            );
        
            // kembalikan respons berhasil logout
            res.status(200).json({ message: 'Logout berhasil' });
        });
        
    } catch (error) {
        res.status(500).json({ message: error });
        console.error(error);
    }
}

module.exports = {registerMobile, registerAdminMaster, registerAdminPanti, login, logout}