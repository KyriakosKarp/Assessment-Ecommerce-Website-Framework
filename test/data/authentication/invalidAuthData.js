const invalidAuthData = [
  {
    description: "Empty username and password",
    username: "",
    password: "",
    expectedError: "Epic sadface: Username is required",
  },
  {
    description: "Empty username",
    username: "",
    password: "secret_sauce",
    expectedError: "Epic sadface: Username is required",
  },
  {
    description: "Empty password",
    username: "standard_user",
    password: "",
    expectedError: "Epic sadface: Password is required",
  },
  {
    description: "Wrong password",
    username: "standard_user",
    password: "wrong_password",
    expectedError:
      "Epic sadface: Username and password do not match any user in this service",
  },
  {
    description: "Wrong username",
    username: "wrong_user",
    password: "secret_sauce",
    expectedError:
      "Epic sadface: Username and password do not match any user in this service",
  },
];

module.exports = { invalidAuthData };
