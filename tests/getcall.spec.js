import { test, expect } from "@playwright/test";


test("Test GET API call", async ({ request }) => {
    //getting response from API using GET method
    const resp = await request.get("https://jsonplaceholder.typicode.com/posts/1");
    //console.log(resp);
    const resbody = await resp.body(); //gives the response body as buffer in output
    //get the response body as json response
    const respjson = await resp.json();
    //console.log(respjson);
    const respheaders = resp.headers(); //get response headers as it is
    //console.log(respheaders);
    const respheadersarray = resp.headersArray(); //get response headers as array
    //console.log(respheadersarray);
    const respstatus = resp.status(); //get response status code
    //console.log(respstatus);
    const resptext = resp.statusText(); //get response status message as text
    //console.log(resptext);
    expect(respstatus).toBe(200); //assertion to check the response status code is '200'
    expect(resptext).toBe("OK"); //assertion to check the respsonse status text is 'OK'
    expect(resp.ok()).toBeTruthy(); //assertion to check the response was successfull or not
    expect(respjson).toHaveProperty("userId", 1); //assertion to check the particular property is present in the json response
    //assertion to check the presence of title in json response
    expect(respjson).toHaveProperty("title", "sunt aut facere repellat provident occaecati excepturi optio reprehenderit");
    //assertion to check the presence of partial value from json body
    expect(respjson.body).toContain("quia et suscipit\nsuscipit");

});