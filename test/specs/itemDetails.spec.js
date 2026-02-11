const LoginPage = require("../../pageObjects/loginPage");
const InventoryPage = require("../../pageObjects/inventoryPage");
const ItemPage = require("../../pageObjects/itemPage");
const CartPage = require("../../pageObjects/cartPage");
const { users } = require("../data/authentication/users");

describe("Item Details - Cross Page State Consistency", () => {
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

  it("Should maintain consistent item state across navigation layers", async () => {
    // Capture item data from inventory
    const names = await InventoryPage.getItemNames();
    const inventoryItemTitle = names[0]
    const prices = await InventoryPage.getItemPrices();
    const inventoryItemPrice = prices[0]

    // Navigate to item details
    await InventoryPage.clickFirstItem();

    const detailsUrl = await browser.getUrl();
    expect(detailsUrl).toContain("inventory-item");

    // Validate item data consistency
    const detailsItemTitle = await ItemPage.getItemTitle();
    const detailsItemPrice = await ItemPage.getItemPrice();

    expect(detailsItemTitle).toBe(inventoryItemTitle);
    expect(detailsItemPrice).toBe(inventoryItemPrice);

    // Add to cart & validate UI state mutation
    await ItemPage.addToCart();
    const buttonText = await ItemPage.getAddRemoveButtonText();
    expect(buttonText).toBe("Remove");

    // Validate cart badge update
    const cartCount = await InventoryPage.getCartItemCount();
    expect(cartCount).toBe(1);

    // Browser-level back navigation (state persistence check)
    await browser.back();

    const backUrl = await browser.getUrl();
    expect(backUrl).toContain("inventory");

    const persistedCartCount = await InventoryPage.getCartItemCount();
    expect(persistedCartCount).toBe(1);

    // Validate cart content consistency
    await InventoryPage.goToCart();

    const cartItemTitle = await CartPage.getFirstItemTitle();
    const cartItemPrice = await CartPage.getFirstItemPrice();

    //   const names = await InventoryPage.getItemNames();
    // const inventoryItemTitle = names[0]
    // const prices = await InventoryPage.getItemPrices();
    // const inventoryItemPrice = prices[0]

    expect(cartItemTitle).toBe(inventoryItemTitle);
    expect(cartItemPrice).toBe(inventoryItemPrice);
  });
});
