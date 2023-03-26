const jwt = require('jsonwebtoken');
require('dotenv').config()

const isMiminMaster = async (req,res, next) =>{
    if (req.user.role_user != "admin_master" ) {
        return res.status(403).json({ error: true, message: 'Anda tidak memiliki hak akses' });
    }
    next();
}

module.exports = {isMiminMaster};