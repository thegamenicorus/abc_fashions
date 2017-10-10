export default {
  // Functions return fixtures
  allProducts: () => {
    const products = require('../Data/Mock/products.json')
    return {
      ok: true,
      data: products,
    }
  },
  allStores: () => {
    const stores = require('../Data/Mock/stores.json')
    return {
      ok: true,
      data: stores,
    }
  }
}
