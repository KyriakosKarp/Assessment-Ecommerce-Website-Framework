const LoginPage = require("../../pageObjects/loginPage");
const BurgerMenu = require("../../pageObjects/components/burgerMenu");
const { standardUser } = require("../data/authentication/users");

describe("Burger Menu", () => {
  it("Should log out user successfully", async () => {
    await LoginPage.open();
    await LoginPage.login(standardUser.username, standardUser.password);

    await BurgerMenu.logout();

    const url = await browser.getUrl();
    expect(url).toContain("saucedemo.com");

    await expect(LoginPage.loginButton).toBeDisplayed();
  });
});
