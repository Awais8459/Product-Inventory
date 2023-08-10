const User = require('../models/user.model');
const Delivery = require('../models/delivery.model');

async function createDeliveryDocument(role, userId) {
  try {
    const user = await User.findOne({ _id: userId, role });
    if (!user) {
      throw new Error('User not found with the given role and ID');
    }

    const newDelivery = new Delivery({
      role: user.role,
      userId: user._id,
      name: user.name,
      location: user.location,
    });

    return newDelivery.save();
  } catch (error) {
    throw new Error('Failed to create delivery document');
  }
}


module.exports = { createDeliveryDocument };
