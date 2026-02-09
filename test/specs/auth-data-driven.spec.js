const LoginPage = require("../../pageObjects/loginPage");
const users = require("../data/users");

describe("Authentication - predefined users access rules", () => {
  Object.entries(users).forEach(([userKey, user]) => {
    it(`Should ${user.canLogin ? "" : "not "}allow login for ${userKey}`, async () => {
      await LoginPage.open();
      await LoginPage.login(user.username, user.password);

      if (user.canLogin) {
        const url = await browser.getUrl();
        expect(url).toContain("inventory");
      } else {
        await expect(LoginPage.lockedOutErrorMessage).toBeDisplayed();
      }
    });
  });
});

describe("Authentication - invalid credentials", () => {
  const invalidCredentials = [
    {
      description: "unknown username with valid password",
      username: "Kyriakos",
      password: "secret_sauce",
    },
    {
      description: "valid username with wrong password",
      username: "standard_user",
      password: "wrong_password",
    },
  ];

  invalidCredentials.forEach((data) => {
    it(`Should not allow login with ${data.description}`, async () => {
      await LoginPage.open();
      await LoginPage.login(data.username, data.password);

      await expect(LoginPage.errorMessage).toBeDisplayed();
    });
  });
});
