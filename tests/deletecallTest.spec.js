import { test, expect } from "@playwright/test";

//test method to validate POST method api
test("POST call token test", async ({ request }) => {
    //storing request body as json in a variable
    const authenticationData = {
        "username": "admin",
        "password": "password123"
    };
    //getting response from POST method by passing headers and data
    const tokenresponse = await request.post("https://restful-booker.herokuapp.com/auth", {
        headers: {
            "Content-Type": "application/json"
        },
        data: authenticationData
    });

    console.log(tokenresponse.status());
    //storing json response of POST method in a variable
    const responseData = await tokenresponse.json();
    //making sure the token in the json response is not null through assertion
    const responsetoken = responseData.token;

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
    };
    //getting response from POST method by passing headers and data
    const bookingresponse = await request.post("https://restful-booker.herokuapp.com/booking", {
        headers: {
            "Content-Type": "application/json"
        },
        data: bookingData
    });


    //storing json response of POST method in a variable
    const bookingresponseData = await bookingresponse.json();
    //making sure bookingid from json response is not null through assertion
    const bookingid = bookingresponseData.bookingid;

    //deleting the booking record
    const deleteresponse = await request.delete("https://restful-booker.herokuapp.com/booking/" + bookingid, {
        headers: {
            "Content-Type": "application/json",
            "Cookie": "token=" + responsetoken
        }
    });
    //printing the status code from response
    console.log(deleteresponse.status());
    //printing the status text from response
    console.log(deleteresponse.statusText());
    //asserting status text is equal to 'Created'
    expect(deleteresponse.statusText()).toBe('Created');
    //using get api to get the response of deleted record
    const getresponse = await request.get("https://restful-booker.herokuapp.com/booking/" + bookingid);
    //printing status code from response
    console.log(getresponse.status());
    //asserting status code to be 404 
    expect(getresponse.status()).toBe(404);
    //printing status text from response
    console.log(getresponse.statusText());
    //asserting status text to be "Not Found"
    expect(getresponse.statusText()).toBe("Not Found");
})