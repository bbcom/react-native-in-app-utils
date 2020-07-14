jest.mock("react-native");



const {
  loadProducts,
  purchaseProductWithOffer,
  purchaseProduct,
} = require("..");

describe("test loadProducts", () => {
  it("resolves with promise if success loading products", () => {
    return expect(loadProducts(["some-product-sku"])).resolves.toStrictEqual([
      { identifier: "some-product-sku" },
    ]);
  });

  it("rejects if failures to load products", () => {
    return expect(loadProducts(["fail_sku"])).rejects.toThrow("oh no");
  });
});

describe("test purchaseProductWithOffer", () => {
  it("resolves with promise if success purchasing with offer", () => {
    return expect(
      purchaseProductWithOffer("some-product-sku", "nice_offer_bro", {
        keyIdentifier: "key_identifier",
        nonce: "nonce",
        signature: "signature",
        timestamp: 100000001,
      })
    ).resolves.toStrictEqual({
      transactionDate: 100000000,
      transactionIdentifier: "sdlfkjsflskdjf",
      productIdentifier: "some-product-sku",
      transactionReceipt: "sfsdfsdfsdfsf",
    });
  });

  it("rejects if failures to purchase with offer", () => {
    return expect(
      purchaseProductWithOffer("fail_sku", "nice_offer_bro", {
        keyIdentifier: "key_identifier",
        nonce: "nonce",
        signature: "signature",
        timestamp: 100000001,
      })
    ).rejects.toThrow("oh no");
  });

  it("rejects if there is no response from app store", () => {
    return expect(
      purchaseProductWithOffer("no_res_sku", "nice_offer_bro", {
        keyIdentifier: "key_identifier",
        nonce: "nonce",
        signature: "signature",
        timestamp: 100000001,
      })
    ).rejects.toThrow("no_response");
  });
});

describe("test purchaseProduct", () => {
  it("resolves with promise if success purchasing", () => {
    return expect(purchaseProduct("some-product-sku")).resolves.toStrictEqual({
      transactionDate: 100000000,
      transactionIdentifier: "sdlfkjsflskdjf",
      productIdentifier: "some-product-sku",
      transactionReceipt: "sfsdfsdfsdfsf",
    });
  });

  it("rejects if failures to purchase", () => {
    return expect(purchaseProduct("fail_sku")).rejects.toThrow("oh no");
  });

  it("rejects if there is no response from app store", () => {
    return expect(purchaseProduct("no_res_sku")).rejects.toThrow("no_response");
  });
});

describe("test restorePurchases", () => {
    it('resolves with list', () => {
        return expect(restorePurchases()).resolves.toStrictEqual({
            transactionDate: 100000000,
            transactionIdentifier: 'sdlfkjsflskdjf',
            productIdentifier: productSku,
            transactionReceipt: 'sfsdfsdfsdfsf'
        }]);
    });
});
