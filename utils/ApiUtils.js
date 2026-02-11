class ApiUtils {
    //creating constructor to recieve apiContext object from test script
    constructor(apiContext, loginData) {
        //storing external object reference of apiContext to class level local variable using this keywoard
        this.apiContext = apiContext;
        //storing external object reference of loginData to class level local variable using this keywoard
        this.loginData = loginData;

    }

    //method to login and return token
    async getToken() {
        //calling POST method with required URL and passing the payload in data, storing the API response
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                //passing the login payload into the data param
                data: this.loginData
            }
        )
        //converting javascript object to json object using .json() method
        const loginResponseJson = await loginResponse.json();
        //parsing and fetching the required json object called token and storing in global variable
        const token = loginResponseJson.token;
        //returing token to the method call
        return token;
    }

    //method to create order and return orderId
    async getOrderId(orderPayload) {
        //creating empty javascript object 'response'
        let response = {};
        //storing token in response object by invoking getToken() method
        response.token = await this.getToken();
        //API call to create order    
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                //passing payload
                data: orderPayload,
                //passing request headers like token and content type
                headers: {
                    //passing token through response object instead of passing token variable which was stored already
                    'Authorization': response.token,
                    //passing content type directly
                    'Contnet-Type': 'application/json'
                },
            }
        )
        //converting javascript object to json object
        const orderResponseJson = await orderResponse.json();
        //fetching orderid from json object
        response.orderId = orderResponseJson.orders[0];
        //returing order to the method call
        return response;

    }
}

//exposing this class 'ApiUtils' to other modules/files
module.exports = { ApiUtils };