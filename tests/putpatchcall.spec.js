import { test, expect } from "@playwright/test";

test("PUT api testing", async ({ request }) => {
    //storing request payload to generate token
    const authenticationData = {
        "username": "admin",
        "password": "password123"
    }
    //getting token response from POST method by passing headers and data
    const response = await request.post("https://restful-booker.herokuapp.com/auth", {
        headers: {
            "Content-Type": "application/json"
        }, data: authenticationData
    })

    //fetching json response from token api
    const responseData = await response.json();
    //fetching token from json response
    const authtoken = responseData.token;
    //priting token on the terminal
    console.log("token is " + authtoken);

    //storing request payload to generate booking
    const newbookingData = {
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
    //getting booking response from POST method by passing headers and data
    const bookingresponse = await request.post("https://restful-booker.herokuapp.com/booking", {
        headers: {
            "Content-Type": "application/json"
        }, data: newbookingData
    })
    //fetching booking response as json
    const bookingresponsejson = await bookingresponse.json();
    //fetching booking id from json response
    const bookingID = bookingresponsejson.bookingid;
    //priting booking id on the terminal
    console.log("Booking ID " + bookingID);

    //storing request payload to update booking
    const updatebookingdata = {
        "firstname": "Avinash",
        "lastname": "K",
        "totalprice": 124,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2026-01-01",
            "checkout": "2026-02-01"
        },
        "additionalneeds": "Breakfast and Lunch"
    }


    //getting response from PUT method by passing headers and data
    const updatedBookingResponse = await request.put("https://restful-booker.herokuapp.com/booking/" + bookingID, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Cookie": "token=" + authtoken
        }, data: updatebookingdata
    })

    //fetching update response as json
    const updatedBookingRespJson = await updatedBookingResponse.json();
    //priting update json response on the terminal
    console.log(updatedBookingRespJson);
    //asserting total price is updated or not
    expect(updatedBookingRespJson.totalprice).toBe(updatebookingdata.totalprice);
    //asserting additonalneeds is updated or not
    expect(updatedBookingRespJson.additionalneeds).toBe(updatebookingdata.additionalneeds);

})