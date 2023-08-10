const  deliveryService  = require('../services/delivery.service');

async function createDelivery(req, res) {
  const { role, userId } = req.params;

  try {
    const deliveryDocument = await deliveryService.createDeliveryDocument(role, userId);
    res.status(201).json(deliveryDocument);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the delivery document.' });
  }
}

module.exports = { createDelivery };
