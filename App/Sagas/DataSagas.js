import { call, put, all } from 'redux-saga/effects'
import { path } from 'ramda'
import DataActions from '../Redux/DataRedux'
import { getImageSizeFitWidth } from '../Utils/ImageHeightCalculator'
import { Metrics, Colors } from '../Themes'

export function getImageWidth(imageUrl) {
  // prepare image height for masonry list
  return getImageSizeFitWidth(imageUrl, Metrics.screenWidth / 2).then(height => height);
}

export function * getData (api, action) {
  // make the call to the api
  const responseProducts = yield call(api.getAllProducts)
  const responseStores = yield call(api.getAllStores)
  
  
  if (responseProducts.ok && responseStores.ok) {
    // data conversion
    const stores = responseStores.data.map( (store, index) => ({
      storeId: store.storeId,
      name: store.name,
      location: store.location,
      imageUrl: `${api.baseURL}${store.imageUrl}`,
      color: Colors.pastelColorSet[index % Colors.pastelColorSet.length] // pastel color for default image background color
    }));

    const products = yield all( 
      responseProducts.data.map( async (product, index) => ({
        productId: product._id,
        storeId: product.storeId,
        name: product.name,
        imageUrl: `${api.baseURL}${product.imageUrl}`,
        imageHeight: (await getImageSizeFitWidth(`${api.baseURL}${product.imageUrl}`, Metrics.screenWidth / 2)).height, 
        description: product.descrption,
        category: product.category,
        postageType: product.postage,
        price: product.price,
        storeName: stores.find(store => store.storeId === product.storeId).name,
        color: Colors.pastelColorSet[index % Colors.pastelColorSet.length] // pastel color for default image background color
      }))
    );

    // put result back to Redux
    yield put(DataActions.dataSuccess(products, stores))
  } else {
    // failer
    yield put(DataActions.dataFailure())
  }
}
