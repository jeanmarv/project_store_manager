const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products;',
  );
  return products;
};

const getById = async (productID) => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id=?', [productID],
  );
  return products[0];
};

module.exports = {
  getAll,
  getById,
};
