const LoginPage = require("../../pageObjects/loginPage");
const InventoryPage = require("../../pageObjects/inventoryPage");
const { standardUser } = require("../data/users");

describe("Inventory - products basic flow", () => {
  beforeEach(async () => {
    await LoginPage.open();
    await LoginPage.login(standardUser.username, standardUser.password);
  });

  it("Should display products after login", async () => {
    const items = await InventoryPage.inventoryItems;
    expect(items.length).toBeGreaterThan(0);
  });

  it("Should add product to cart", async () => {
    await InventoryPage.addFirstItemToCart();
    await expect(InventoryPage.cartBadge).toBeDisplayed();
    await expect(InventoryPage.cartBadge).toHaveText("1");
  });
});
