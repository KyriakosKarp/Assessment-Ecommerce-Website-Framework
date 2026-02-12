const LoginPage = require("../../pageObjects/loginPage");
const InventoryPage = require("../../pageObjects/inventoryPage");
const BurgerMenu = require("../../pageObjects/components/burgerMenu.comp");
const CartPage = require("../../pageObjects/cartPage");
const { users } = require("../data/authentication/users");

describe("Burger Menu", () => {
  beforeEach(async () => {
    await LoginPage.open();
    await LoginPage.login(
      users.standardUser.username,
      users.standardUser.password,
    );

    const url = await browser.getUrl();
    expect(url).toContain("inventory");

    await InventoryPage.clearCart();
  });

  it("Should open burger menu and display expected options", async () => {
    await BurgerMenu.open();

    const items = await BurgerMenu.getMenuItemsText();
    expect(items).toEqual(["All Items", "About", "Logout", "Reset App State"]);

    await BurgerMenu.close();
  });

  it('Should navigate to "All Items" via burger menu', async () => {
    await BurgerMenu.open();
    await BurgerMenu.clickAllItems();

    const url = await browser.getUrl();
    expect(url).toContain("inventory");
  });

  it('Should navigate to "About" page via burger menu', async () => {
    await BurgerMenu.open();
    await BurgerMenu.clickAbout();

    const url = await browser.getUrl();
    expect(url).toContain("saucelabs.com");
  });

  it("Should log out user via burger menu", async () => {
    await BurgerMenu.open();
    await BurgerMenu.logout();

    await expect(LoginPage.usernameInput).toBeDisplayed();
  });

  it("Should reset app state via burger menu", async () => {
    await InventoryPage.addItemToCart(0);

    await BurgerMenu.open();
    await BurgerMenu.resetAppState();

    await expect(CartPage.cartBadge).not.toBeDisplayed();
  });
});
