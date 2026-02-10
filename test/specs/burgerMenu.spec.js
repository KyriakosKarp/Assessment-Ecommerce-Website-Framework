const LoginPage = require("../../pageObjects/loginPage");
const InventoryPage = require("../../pageObjects/inventoryPage");
const CartPage = require("../../pageObjects/cartPage");
const BurgerMenu = require("../../pageObjects/components/burgerMenu");
const { users } = require("../data/authentication/users");

describe("Burger Menu", () => {
  it("Should log out user successfully", async () => {
    await LoginPage.open();
    await LoginPage.login(users.standardUser.username, users.standardUser.password);

    await BurgerMenu.logout();

    const url = await browser.getUrl();
    expect(url).toContain("saucedemo.com");

    await expect(LoginPage.loginButton).toBeDisplayed();
  });

  it("Should reset application state by clearing the cart", async () => {
    await LoginPage.open();
    await LoginPage.login(users.standardUser.username, users.standardUser.password);

    await InventoryPage.addItemToCart();
    await expect(CartPage.cartBadge).toBeDisplayed();

    await BurgerMenu.resetAppState();

    await expect(CartPage.cartBadge).not.toBeDisplayed();
  });
});
