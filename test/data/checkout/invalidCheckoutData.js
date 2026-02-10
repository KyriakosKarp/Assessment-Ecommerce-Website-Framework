const invalidCheckoutData = [
  {
    scenario: "first name is missing",
    firstName: "",
    lastName: "Papa",
    postalCode: "12345",
    expectedError: "Error: First Name is required",
  },
  {
    scenario: "last name is missing",
    firstName: "John",
    lastName: "",
    postalCode: "12345",
    expectedError: "Error: Last Name is required",
  },
  {
    scenario: "postal code is missing",
    firstName: "John",
    lastName: "Papa",
    postalCode: "",
    expectedError: "Error: Postal Code is required",
  },
];

module.exports = invalidCheckoutData;
