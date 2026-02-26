Feature: Error Validations
    @Validation
    Scenario Outline: Validating the login error message
        Given A login to the ecommerce website with invalid "<username>" and "<password>"
        Then Verify the error message is displayed

        Examples:
            | username                  | password         |
            | kunapareddy.avi@gmail.com | IncorrectPass123 |
            | testuser2@gmail.com       | wrongpass456     |