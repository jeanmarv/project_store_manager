const connection = require('./connection');

const getAll = async () => {
  const sales = await connection.execute(`SELECT 
  sale_id as saleId,
  date,
  product_id as productId,
  quantity 
  FROM StoreManager.sales_products AS sProducts
  JOIN StoreManager.sales AS sales
  ON sProducts.sale_id = sales.id`);
  return sales[0];
};

const getById = async (id) => {
  const [sales] = await connection.execute(`SELECT
  date,
  product_id as productId,
  quantity 
  FROM StoreManager.sales_products
  INNER JOIN StoreManager.sales
  ON sales_products.sale_id = sales.id
  WHERE sales_products.sale_id = ?
  ORDER BY sale_id, productId`, [id]);

  return sales;
};

const createID = async () => {
  const [sales] = await connection.execute(
    'INSERT INTO StoreManager.sales SET date = ?', [new Date()],
  );
  return sales.insertId;
};

const postSale = async (id, sales) => {
  await connection.execute(
    'INSERT INTO sales_products SET sale_id = ?, product_id = ?, quantity = ?',
    [id, sales.productId, sales.quantity],
  );
  return {
    productId: sales.productId,
    quantity: sales.quantity,
  };
};

module.exports = {
  getAll,
  getById,
  createID,
  postSale,
};
