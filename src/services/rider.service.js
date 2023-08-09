const  {User}  = require('../models');

const getLocation = async () => {
    return await User.find();
  };
const getLocationByID = async (id) => {
    return await User.findById(id);
  };

module.exports = {
  getLocation,getLocationByID
}