import { NativeModules } from 'react-native';
const { InAppUtils } = NativeModules;

export const loadProducts = productSkus =>
  new Promise((resolve, reject) => {
    InAppUtils.loadProducts(productSkus, (error, products) => {
      if (error) {
        reject(error);
      } else {
        resolve(products);
      }
    });
  });

export const purchaseProductWithOffer = (
  productSku,
  offerIdentifier,
  { nonce, timestamp, keyIdentifier, signature }
) =>
  new Promise((resolve, reject) => {
    InAppUtils.purchaseProductWithOffer(
      productSku,
      offerIdentifier,
      keyIdentifier,
      nonce,
      signature,
      timestamp,
      (error, response) => {
        if (error) {
          reject(error);
        } else if (!response) {
          reject(new Error("no_response"));
        } else {
          resolve(response);
        }
      }
    );
  });
