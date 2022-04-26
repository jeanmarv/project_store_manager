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

const postProduct = async (name, quantity) => {
  const [products] = await connection.execute(
    'INSERT INTO StoreManager.products (name, quantity)VALUES (?, ?)',
  [name, quantity],
);
  return {
    id: products.insertId,
    name,
    quantity,
  };
};

const registerProduct = async (name) => {
  const select = 'SELECT * FROM StoreManager.products WHERE name = ?';
  const [product] = await connection.query(select, name);
  
  if (product[0] !== undefined) {
    return product[0];
  }
};

module.exports = {
  getAll,
  getById,
  postProduct,
  registerProduct,
};
