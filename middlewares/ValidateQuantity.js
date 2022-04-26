const connection = require('../models/connection');

const validateQuantity = async (id, quantity) => {
  await connection.execute('UPDATE StoreManager.products set quantity = ? WHERE id = ?;',
      [quantity, id]);
  return {
    productId: id,
    quantity,
  };
};

module.exports = {
  validateQuantity,
};