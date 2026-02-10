const users = {
  standardUser: {
    username: "standard_user",
    password: "secret_sauce",
    shouldLogin: true,
    description: "standard user",
  },
  lockedUser: {
    username: "locked_out_user",
    password: "secret_sauce",
    shouldLogin: false,
    description: "locked out user",
    expectedError: "Epic sadface: Sorry, this user has been locked out.",
  },
  problemUser: {
    username: "problem_user",
    password: "secret_sauce",
    shouldLogin: true,
    description: "problem user",
  },
  performanceUser: {
    username: "performance_glitch_user",
    password: "secret_sauce",
    shouldLogin: true,
    description: "performance glitch user",
  },
  errorUser: {
    username: "error_user",
    password: "secret_sauce",
    shouldLogin: true,
    description: "error user",
  },
  visualUser: {
    username: "visual_user",
    password: "secret_sauce",
    shouldLogin: true,
    description: "visual user",
  },
};

module.exports = { users };
