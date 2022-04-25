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

module.exports = {
  getAll,
  getById,
};
