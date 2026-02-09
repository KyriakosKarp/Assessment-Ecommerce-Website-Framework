const LoginPage = require("../../pageObjects/loginPage");
const InventoryPage = require("../../pageObjects/inventoryPage");
const CartPage = require("../../pageObjects/cartPage");
const { standardUser } = require("../data/authentication/users")

describe("Cart - add and remove item flow", () => {
  beforeEach(async () => {
    await LoginPage.open();
    await LoginPage.login(standardUser.username, standardUser.password);
    await InventoryPage.addFirstItemToCart();
    await CartPage.open();
  });

  it("Should display added product in cart", async () => {
    const items = await CartPage.cartItems;
    expect(items.length).toBe(1);
  });

  it("Should remove product from cart", async () => {
    await CartPage.removeFirstItem();

    await expect(CartPage.cartItems).toBeElementsArrayOfSize(0);
  });
});
