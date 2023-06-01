function adyen_payment() {
        // Set your X-API-KEY with the API key from the Customer Area.
    const {Client, Config, CheckoutAPI} = require('@adyen/api-library');
    const config = new Config();
    // Set your X-API-KEY with the API key from the Customer Area.
    config.apiKey = 'AQEwhmfxK4LJaR1Hw0m/n3Q5qf3Vb45CJJ1MV3dbx2yikWgWSYvGIvy1ehwhdinHtboZEMFdWw2+5HzctViMSCJMYAc=-vT5BuSUTxyQ8+V7G1Ww96nKUVKn32TVLph58TCvNTwQ=-7Z?@QGD[jc5>F>Y*';
    config.merchantAccount = 'GeoInformationPOS';
    const client = new Client({ config });
    client.setEnvironment("TEST");
    const checkout = new CheckoutAPI(client);
    checkout.payments({
        amount: { currency: "USD", value: 0 },
        paymentMethod: {
            "type": "Ecommerce",
            "encryptedCardNumber": "test_4111111111111111",
            "encryptedExpiryMonth": "test_03",
            "encryptedExpiryYear": "test_2030",
            "encryptedSecurityCode": "test_737",
            holderName: "John Smith"
        },
        reference: "ksad090asdkj",
        merchantAccount: config.merchantAccount,
        storePaymentMethod: "true",
        shopperInteraction: "Ecommerce",
        recurringProcessingModel: "Subscription",
        returnUrl: "http://localhost:8080"
    }).then(res => console.log(res)).catch(res => console.log(res));
}

adyen_payment();