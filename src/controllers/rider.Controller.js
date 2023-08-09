const riderService = require('../services/rider.service');


const getlocationById = async (req, res) => {
    try {
      const location = await riderService.getLocationByID(req.params.id);
      if (!location) {
        return res.status(404).json({ error: 'Location not found' });
      }
      res.status(200).json(location);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  moduke.exports = {
    getlocationById
  }