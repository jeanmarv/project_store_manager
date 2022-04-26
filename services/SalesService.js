const salesModel = require('../models/SalesModel');
const updateQuantity = require('../middlewares/UpdateQuantity');

const getAll = async () => {
  const product = await salesModel.getAll();
  return product;
};

const getById = async (id) => {
  const product = await salesModel.getById(id);
  return product;
};

const postSale = async (sales) => {
  const createID = await salesModel.createID();
  sales.forEach(async (sale) => {
    await salesModel.postSale(createID, sale);
    await updateQuantity.updateQuantity(sale.productId, sale.quantity);
  });
  return {
    id: createID,
    itemsSold: sales,
  };
};

const updateSales = async (id, sales) => {  
  sales.forEach(async (sale) => {
    await salesModel.updateSales(id, sale);
    await updateQuantity.updateQuantity(sale.productId, sale.quantity);
  });
return {
  saleId: id,
  itemUpdated: sales,
};
};

const removeSales = async (id) => {
  const allID = await salesModel.allID();
  const findID = allID.find((saleID) => saleID.id === id);

  if (!findID) {
    return false;
  }

  const allSales = await salesModel.getAll();
  const filteredSale = allSales.filter((filteredID) => filteredID.saleId === id);

  filteredSale.forEach((sale) => { 
    updateQuantity.updateQuantity(sale.productId, (-sale.quantity));
  });

  await salesModel.removeSales(id);
};

module.exports = {
  getAll,
  getById,
  postSale,
  updateSales,
  removeSales,
};