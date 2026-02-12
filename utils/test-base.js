//storing the playwright package in a variable to use its test and expect functions in custom test
const base = require('@playwright/test');

//creating and exporting custom test by extending the base test of playwright to use it in test files and fetch test data from fixture
exports.customtest = base.test.extend({
    testDataForOrder: {
        username: "kunapareddy.avi@gmail.com",
        password: "Avinash@123",
        productName: "ZARA COAT 3",
        contryCode: "ind",
        country: "India"
    }
})