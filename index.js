// @flow
import { NativeModules } from "react-native";
import { NO_RESPONSE, NO_PRODUCT_ID } from "./error-codes";
const { InAppUtils } = NativeModules;

export * from "./error-codes";

export type PurchaseData = {
  transactionDate: number,
  transactionIdentifier: string,
  productIdentifier: string,
  transactionReceipt: string,
};

export type PriceType = "INTRODUCTORY" | "SUBSCRIPTION" | "";

export type PaymentMode = "FREETRIAL" | "PAYASYOUGO" | "PAYUPFRONT" | "";

export type SubscriptionPeriod = "DAY" | "WEEK" | "MONTH" | "YEAR" | "";

export type Discount = {
  identifier: string,
  type: PriceType,
  numberOfPeriods: string,
  price: number,
  localizedPrice: number,
  paymentMode: PaymentMode,
  subscriptionPeriod: SubscriptionPeriod,
};

export type IntroductoryPrice = {
  identifier: string,
  type: PriceType,
  price: string,
  paymentMode: PaymentMode,
  numberOfPeriods: string,
  subscriptionPeriod: {
    unit: SubscriptionPeriod,
    numberOfUnits: string
  }
};

export type ProductData = {
  identifier: string,
  price: number,
  currencySymbol: string,
  currencyCode: string,
  priceString: string,
  countryCode: string,
  downloadable: "true" | "false",
  description: string,
  title: string,
  discounts: Array<Discount>,
  introductoryPrice:  introductoryPrice,
  subscriptionPeriod: subscriptionPeriod,
};

export class IOSIAPError extends Error {
  constructor(code) {
    super();
    this.code = code;
    this.message = code;
  }
}

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
): Promise<PurchaseData> =>
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
          reject(new IOSIAPError(NO_RESPONSE));
        } else if (!response.productIdentifier) {
          reject(new IOSIAPError(NO_PRODUCT_ID));
        } else {
          resolve(response);
        }
      }
    );
  });

export const purchaseProduct = productSku => {
  return new Promise((resolve, reject): Promise<PurchaseData> => {
    InAppUtils.purchaseProduct(productSku, (error, response) => {
      if (error) {
        reject(error);
      } else if (!response) {
        reject(new IOSIAPError(NO_RESPONSE));
      } else if (!response.productIdentifier) {
        reject(new IOSIAPError(NO_PRODUCT_ID));
      } else {
        resolve(response);
      }
    });
  });
};

export const restorePurchases = () => {
  return new Promise((resolve, reject): Promise<PurchaseData> => {
    InAppUtils.restorePurchases((error, response) => {
      if (error) {
        reject(error);
      } else if (!response) {
        reject(new IOSIAPError(NO_RESPONSE));
      } else {
        resolve(response);
      }
    });
  });
};
