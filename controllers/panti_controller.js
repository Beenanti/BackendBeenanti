const model = require("../models/panti");

exports.getListPanti = async (req, res) => {
    try {
      const locations = await model.findAll();
      res.status(200).json(locations);
    } catch (error) {
      res.status(500).json({ message: 'Error occurred while fetching locations' });
      console.error(error);
    }
  };
