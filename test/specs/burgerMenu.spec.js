const LoginPage = require("../../pageObjects/loginPage");
const InventoryPage = require("../../pageObjects/inventoryPage");
const CartPage = require("../../pageObjects/cartPage");
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

  it("Should reset application state by clearing the cart", async () => {
    await LoginPage.open();
    await LoginPage.login(standardUser.username, standardUser.password);

    await InventoryPage.addFirstItemToCart();
    await expect(CartPage.cartBadge).toBeDisplayed();

    await BurgerMenu.resetAppState();

    await expect(CartPage.cartBadge).not.toBeDisplayed();
  });
});
