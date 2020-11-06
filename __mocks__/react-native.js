module.exports = {
    NativeModules: {
        InAppUtils: {
            loadProducts(productSkus, callback) {
                if (productSkus.find(sku => 'fail_sku' === sku)) {
                    callback(new Error('oh no'));
                } else {
                    callback(null, productSkus.map(sku => ({identifier: sku})));
                }
            },

            purchaseProductWithOffer(
                productSku,
                offerIdentifier,
                keyIdentifier,
                nonce,
                signature,
                timestamp,
                callback
            ) {
                if (productSku === 'fail_sku') {
                    callback(new Error('oh no'));
                } else if (productSku === 'no_res_sku') {
                    callback(null);
                } else if (productSku === 'no_pid_sku') {
                    callback(null, {});
                } else {
                    callback(null, {
                        transactionDate: 100000000,
                        transactionIdentifier: 'sdlfkjsflskdjf',
                        productIdentifier: productSku,
                        transactionReceipt: 'sfsdfsdfsdfsf'
                    });
                }
            },

            purchaseProduct(productSku, callback) {
                if (productSku === 'fail_sku') {
                    callback(new Error('oh no'));
                } else if (productSku === 'no_res_sku') {
                    callback(null);
                } else {
                    callback(null, {
                        transactionDate: 100000000,
                        transactionIdentifier: 'sdlfkjsflskdjf',
                        productIdentifier: productSku,
                        transactionReceipt: 'sfsdfsdfsdfsf'
                    });
                }
            },

            restorePurchases(callback) {
                callback(null, [{
                    transactionDate: 100000000,
                    transactionIdentifier: 'sdlfkjsflskdjf',
                    productIdentifier: "a-sku",
                    transactionReceipt: 'sfsdfsdfsdfsf'
                }]);
            },
        }
    }
};