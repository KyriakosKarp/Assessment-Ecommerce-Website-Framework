const LoginPage = require("../../pageObjects/loginPage");
const users = require("../data/users");

describe("Authentication - data driven (all predefined users)", () => {
  Object.entries(users).forEach(([userKey, user]) => {
    it(`Should ${user.canLogin ? "" : "not "}allow login for ${userKey}`, async () => {
      await LoginPage.open();
      await LoginPage.login(user.username, user.password);

      if (user.canLogin) {
        const url = await browser.getUrl();
        expect(url).toContain("inventory");
      } else {
        await expect(LoginPage.errorMessage).toBeDisplayed();
      }
    });
  });
});
