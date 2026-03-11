import { test, expect } from "@playwright/test";

//test to monitor api health
test("monitor GET api health", async ({ request }) => {
    //removing the default timeout and executing the test beyond 30 seconds
    test.setTimeout(0);
    //making the test to run infinite times
    while (true) {
        //recording the system time before running the api
        const start = Date.now();
        //running the required api to test the api health
        const response = await request.get("https://restful-booker.herokuapp.com/ping");
        //recording the system time after running the api
        const end = Date.now();
        //calculating the time taken to run the api
        const duration = end - start;
        //logic to throw error if api execution time is greater than 2 seconds
        if (duration > 2000) {
            throw new Error(`API response time is slow ${duration}`);
        } else {
            console.log(`Total duration of API response is ${duration}`);
        }
        //fetching the status-code from the response
        const statuscode = response.status();
        //printing actual status code from the api response
        console.log(`Response Code from API is ${statuscode}`);
        //making sure the status code is matching with 201
        expect(statuscode).toBe(201);
    }
})