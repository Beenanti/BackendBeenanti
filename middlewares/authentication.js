const modelToken = require("../models/token_user");
const jwt = require('jsonwebtoken');
require('dotenv').config()

const authenticateUser = async (req,res, next) =>{
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
        
        req.user = user;
        next();
    });
}

module.exports = {authenticateUser}