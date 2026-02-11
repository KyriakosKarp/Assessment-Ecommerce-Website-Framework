const LoginPage = require("../../pageObjects/loginPage");
const InventoryPage = require("../../pageObjects/inventoryPage");
const CartPage = require("../../pageObjects/cartPage");
const Header = require("../../pageObjects/components/header.comp");
const { users } = require("../data/authentication/users");

describe("Cart", () => {
  beforeEach(async () => {
    // Force clean browser session per testto avoid shared cart state
    // WDIO runs all `it` blocks in the same session withing a spec file
    // Without this, cart state persists betweem tests and causes flakiness
    await browser.reloadSession();

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

    // Badge initially 2
    await expect(Header.cartBadge).toHaveText("2");

    await CartPage.open();
    await CartPage.removeItemByIndex(0);

    const items = await CartPage.cartItems;
    expect(items.length).toBe(1);

    // Back to inventory to check badge
    await CartPage.continueShopping();

    await expect(Header.cartBadge).toHaveText("1");
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
});
