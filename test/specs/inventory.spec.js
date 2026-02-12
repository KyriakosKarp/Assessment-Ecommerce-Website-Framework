const LoginPage = require("../../pageObjects/loginPage");
const InventoryPage = require("../../pageObjects/inventoryPage");
const Header = require("../../pageObjects/components/header.comp");
const { standardUser } = require("../data/authentication/users").users;

describe("Inventory page", () => {
  beforeEach(async () => {
    await LoginPage.open();
    await LoginPage.login(standardUser.username, standardUser.password);
    await InventoryPage.clearCart();

    const url = await browser.getUrl();
    expect(url).toContain("inventory");
  });

  it("Should display products on inventory page", async () => {
    const items = await InventoryPage.inventoryItems;
    expect(items.length).toBeGreaterThan(0);
  });

  it("Should sort products alphabetically from A to Z", async () => {
    await InventoryPage.sortByNameAToZ();

    const names = await InventoryPage.getItemNames();
    const sorted = [...names].sort();

    expect(names).toEqual(sorted);
  });

  it("Should sort products alphabetically from Z to A", async () => {
    await InventoryPage.sortByNameZToA();

    const names = await InventoryPage.getItemNames();
    const sorted = [...names].sort().reverse();

    expect(names).toEqual(sorted);
  });

  it("Should sort products by price from low to high", async () => {
    await InventoryPage.sortByPriceLowToHigh();

    const prices = await InventoryPage.getItemPrices();
    const sorted = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sorted);
  });

  it("Should sort products by price from high to low", async () => {
    await InventoryPage.sortByPriceHighToLow();

    const prices = await InventoryPage.getItemPrices();
    const sorted = [...prices].sort((a, b) => b - a);

    expect(prices).toEqual(sorted);
  });

  it("Should add a product to the cart from inventory", async () => {
    await InventoryPage.addItemToCart();

    await expect(Header.cartBadge).toBeDisplayed();
    await expect(Header.cartBadge).toHaveText("1");
  });
});
