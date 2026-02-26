Feature: Error Validations
    @Validation
    Scenario: Validating the login error message
        Given A login to the ecommerce website with invalid "kunapareddy.avi@gmail.com" and "Avinash@123"
        Then Verify the error message is displayed