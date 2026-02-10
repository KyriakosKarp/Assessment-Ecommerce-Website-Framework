const LoginPage = require("../../pageObjects/loginPage");
const InventoryPage = require("../../pageObjects/inventoryPage");
const CartPage = require("../../pageObjects/cartPage");
const BurgerMenu = require("../../pageObjects/components/burgerMenu.comp");
const { users } = require("../data/authentication/users");

describe("Cart", () => {
  beforeEach(async () => {
    await LoginPage.open();
    await LoginPage.login(
      users.standardUser.username,
      users.standardUser.password,
    );

    const url = await browser.getUrl();
    expect(url).toContain("inventory");
  });

  it("Should add multiple items to the cart", async () => {
    await InventoryPage.addItemToCart(0);
    await InventoryPage.addItemToCart(1);

    await CartPage.open();

    const items = await CartPage.cartItems;
    expect(items.length).toBe(2);
  });

  it("Should remove item and update cart badge accordingly", async () => {
    await InventoryPage.addItemToCart(0);
    await InventoryPage.addItemToCart(1);

    await CartPage.open();
    await CartPage.removeItemByIndex(0);

    const items = await CartPage.cartItems;
    expect(items.length).toBe(1);

    const badge = await InventoryPage.cartBadge;
    await expect(badge).toHaveText("1");
  });

  it("Should proceed to checkout from cart", async () => {
    await InventoryPage.addItemToCart(0);
    await CartPage.open();

    await CartPage.proceedToCheckout();

    const url = await browser.getUrl();
    expect(url).toContain("checkout-step-one");
  });

  it("Should continue shopping from cart", async () => {
    await InventoryPage.addItemToCart(0);
    await CartPage.open();

    await CartPage.continueShopping();

    const url = await browser.getUrl();
    expect(url).toContain("inventory");
  });

  it("Should clear cart after logout and login with different user", async () => {
    await InventoryPage.addItemToCart(0);

    await BurgerMenu.open();
    await BurgerMenu.logout();

    await LoginPage.login(
      users.problemUser.username,
      users.problemUser.password,
    );

    const badge = await InventoryPage.cartBadge;
    await expect(badge).not.toBeDisplayed();
  });
});
