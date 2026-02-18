//importing the playwright package to use its test functions in custom test
import { test as baseTest } from '@playwright/test';

interface TestDataForOrder {
    username: string;
    password: string;
    productName: string;
    contryCode: string;
    country: string;
};
//creating and exporting custom test by extending the base test of playwright to use it in test files and fetch test data from fixture
export const customtest = baseTest.extend<{ testDataForOrder: TestDataForOrder }>(
    {
        testDataForOrder: {
            username: "kunapareddy.avi@gmail.com",
            password: "Avinash@123",
            productName: "ZARA COAT 3",
            contryCode: "ind",
            country: "India"
        }
    }
);