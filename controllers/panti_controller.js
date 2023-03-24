const modelPanti = require("../models/panti");
// const modelDetailAdminPanti = require("../models/detail_admin_panti");


// ------------------------------------------------------
const getListPanti = async (req, res) => {
    try {
      const panti = await modelPanti.findAndCountAll();
      if (panti) {
        res.status(200).json(panti);
      } else if(!panti){
        res.status(204).json({message: "data tidak ada"})
      }
    } catch (error) {
      res.status(500).json({ message: error });
      console.error(error);
    }
};


module.exports = {getListPanti}