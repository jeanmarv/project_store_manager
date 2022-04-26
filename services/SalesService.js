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
  const allSalesId = await salesModel.allID();
  const findSale = allSalesId.find((saleID) => saleID.id === parseInt(id, 10));
  if (!findSale) {
    return false;
  }
  const sales = await salesModel.getAll();
  const filterSale = sales.filter((filteredID) => filteredID.saleId === parseInt(id, 10));

  filterSale.forEach((sale) => { 
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