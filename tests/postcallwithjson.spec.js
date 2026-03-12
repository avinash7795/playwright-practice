import { test, expect } from "@playwright/test";

//storing external json file to a variable by importing through require
const testData = require('../testdata/booking.json');

//sript to read request payload from external json file
test("create booking using external json file with POST api", async ({ request }) => {

    const response = await request.post("https://restful-booker.herokuapp.com/booking", {
        headers: {
            "Content-Type": "application/json"
        },
        data: testData
    }
    )
    console.log(await response.json());
})