const modelUser = require("../models/user");
const modelToken = require("../models/token_user");
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
            return res.status(422).json({ error:true, message: 'Password dan Konfirmasi Password tidak cocok' })
        } 

        // cek sudah ada email sudah digunakan atau belum
        const adaEmail = await modelUser.findOne({ where: { email } });
        if (adaEmail) {
            return res.status(409).json({ error: true, message: 'Email sudah digunakan' });
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
            return res.status(201).json({ error:false, message: 'User berhasil registrasi' });
        } else {
            return res.json({ error:true, message: 'Gagal menambahkan data' });
        }

    } catch (error) {
        res.status(500).json({ error:true, message: error });
    }
}

const registerAdminMaster = async (req,res) =>{
    try {
        const {email, nama, password, konfirmasiPassword} = req.body;

        // cek password sudah sama dengan konfirmasi password
        if (password !== konfirmasiPassword) {
            return res.status(422).json({ error:true, message: 'Password dan Konfirmasi Password tidak cocok' })
        } 

        // cek sudah ada email sudah digunakan atau belum
        const adaEmail = await modelUser.findOne({ where: { email } });
        if (adaEmail) {
            return res.status(409).json({ error:true, message: 'Email sudah digunakan' });
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
            return res.status(201).json({ error:false, message: 'User berhasil registrasi' });
        } else {
            return res.json({ error:false, message: 'Gagal menambahkan data' });
        }

    } catch (error) {
        res.status(500).json({ error:true, message: error });
    }
}


// --------------------Login--------------------------

const login = async (req, res, next) =>{
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
            return res.status(422).json({ error:true, message: 'Email atau password tidak valid' });
        }

        // Check if password is correct
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(422).json({ error:true, message: 'Email atau password tidak valid' });
        }
        
        // ambil role, email dan nama user
        const role_user = user.role;
        const nama_user =user.nama;
        const ip = req.connection.remoteAddress || req.ip;

        // Create and sign a JWT token
        const token = jwt.sign({email, role_user }, process.env.SECRET_KEY, {
            expiresIn: '90d',  //token kadaluarsa dalam 90 hari
        });
        
        await modelToken.create({ 
            user: email,
            remember_token: token,
            ip_address: ip,
            createdAt: new Date(),
        });

        // Return the token and user information
        return res.status(200).json({
            error: false,
            message: 'Berhasil Login!',
            token, 
            data_user: {
                email, nama_user, role_user
            }
        });

    } catch (error) {
        res.status(500).json({ error: true, message: error});
    }
}
    
// --------------------Logout-------------------------
const logout = async (req, res) =>{
    try {
        // mengambil token dari header Authorization
        const authHeader = req.get('Authorization');
        
        // jika token tidak ada, kembalikan respons error
        if (authHeader == null||authHeader == undefined) {
            return res.status(401).json({ error: true, message: 'Token tidak ada' });
        }

        const token = authHeader.split(' ')[1];
        
        // verifikasi token
        jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
            if (err) {
              return res.status(401).json({ error: true, message: err });
            }

            const adaToken = await modelToken.findOne({where: {remember_token: token}})
            if (!adaToken) {
                return res.status(401).json({ error: true, message: "Tidak ada token atau sudah logout sebelumnya" });
            }
            
            // hapus token dari database
            await modelToken.destroy({ where: {remember_token: token}});
        
            // kembalikan respons berhasil logout
            res.status(200).json({ error: false, message: 'Logout berhasil' });
        });
        
    } catch (error) {
        res.status(500).json({ error: true, message: error });
    }
}

module.exports = {registerMobile, registerAdminMaster, login, logout}