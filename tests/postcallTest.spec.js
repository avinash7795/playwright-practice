import { test, expect } from "@playwright/test";

//test method to validate POST method api
test("POST call token test", async ({ request }) => {
    //storing request body as json in a variable
    const authenticationData = {
        "username": "admin",
        "password": "password123"
    }
    //getting response from POST method by passing headers and data
    const response = await request.post("https://restful-booker.herokuapp.com/auth", {
        headers: {
            "Content-Type": "application/json"
        }, data: authenticationData
    })

    console.log(response.status());
    //storing json response of POST method in a variable
    const responseData = await response.json();
    //making sure the token in the json response is not null through assertion
    expect(responseData.token).not.toBeNull();
})


//test method to validate POST method api
test("POST call test with Booking ID", async ({ request }) => {
    //storing request body as json in a variable
    const bookingData = {
        "firstname": "Jim",
        "lastname": "Brown",
        "totalprice": 111,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2018-01-01",
            "checkout": "2019-01-01"
        },
        "additionalneeds": "Breakfast"
    }
    //getting response from POST method by passing headers and data
    const response = await request.post("https://restful-booker.herokuapp.com/booking", {
        headers: {
            "Content-Type": "application/json"
        }, data: bookingData
    })

    console.log(response.status());
    //storing json response of POST method in a variable
    const responseData = await response.json();
    //making sure bookingid from json response is not null through assertion
    expect(responseData.bookingid).not.toBeNull();
    //making sure firstname from json response is matching with the firstname of reqeust body data
    expect(responseData.booking.firstname).toBe(bookingData.firstname);
})