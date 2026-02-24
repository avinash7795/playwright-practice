Feature: Ecommerce Validations

    Scenario: Placing the order successfully
        Given A login to the ecommerce website with valid "kunapareddy.avi@gmail.com" and "Avinash@123"
        When Add a product "ZARA COAT 3" to the cart
        Then Verify the product "ZARA COAT 3" is visible in the cart
        When Proceed to checkout and submit the order
        Then Verify the order is present in the order history page