const model = require("../models/panti");

exports.getListPanti = async (req, res) => {
    try {
      const panti = await model.findAll();
      if (panti) {
        res.status(200).json(panti);
      } else {
        res.json({pesan: "data tidak ada"})
      }
    } catch (error) {
      res.status(500).json({ message: 'Error occurred while fetching locations' });
      console.error(error);
    }
  };
