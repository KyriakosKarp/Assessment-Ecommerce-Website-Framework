const LoginPage = require("../../pageObjects/loginPage");
const InventoryPage = require("../../pageObjects/inventoryPage");
const { users } = require("../data/authentication/users");
const { invalidAuthData } = require("../data/authentication/invalidAuthData");

describe("Authentication scenarios", () => {
  beforeEach(async () => {
    await LoginPage.open();
  });

  Object.entries(users).forEach(([userKey, user]) => {
    it(`Should handle login for ${user.description}`, async () => {
      await LoginPage.login(user.username, user.password);

      if (user.shouldLogin) {
        const url = await browser.getUrl();
        expect(url).toContain("inventory");

        const items = await InventoryPage.inventoryItems;
        expect(items.length).toBeGreaterThan(0);
      } else {
        await expect(LoginPage.errorMessage).toBeDisplayed();

        if (user.expectedError) {
          await expect(LoginPage.errorMessage).toHaveText(user.expectedError);
        }
      }
    });
  });

  invalidAuthData.forEach((user) => {
    it(`Should show error for invalid login: ${user.description}`, async () => {
      await LoginPage.login(user.username, user.password);

      await expect(LoginPage.errorMessage).toBeDisplayed();
      await expect(LoginPage.errorMessage).toHaveText(user.expectedError);
    });
  });
});
