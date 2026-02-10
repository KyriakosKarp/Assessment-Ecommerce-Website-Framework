const LoginPage = require("../../pageObjects/loginPage");
const InventoryPage = require("../../pageObjects/inventoryPage");
const CartPage = require("../../pageObjects/cartPage");
const CheckoutPage = require("../../pageObjects/checkoutPage");
const invalidCheckoutData = require("../data/checkout/invalidCheckoutData");
const { standardUser } = require("../data/authentication/users");

describe("Checkout - happy path", () => {
  before(async () => {
    await LoginPage.open();
    await LoginPage.login(standardUser.username, standardUser.password);

    await InventoryPage.addFirstItemToCart();
    await CartPage.cartButton.click();

    await CheckoutPage.startCheckout();
    await CheckoutPage.fillCheckoutInfo("John", "Papa", "12345");
    await CheckoutPage.finishCheckout();
  });

  it("Should complete checkout successfully", async () => {
    const url = await browser.getUrl();
    expect(url).toContain("checkout-complete");

    await expect(CheckoutPage.completeHeader).toBeDisplayed();
    await expect(CheckoutPage.completeHeader).toHaveText(
      "Thank you for your order!",
    );
  });

  it("Should navigate back to inventory when clicking Back Home", async () => {
    await CheckoutPage.backHomeButton.click();

    const url = await browser.getUrl();
    expect(url).toContain("inventory");
  });
});

describe("Checkout - negative scenarios", () => {
  beforeEach(async () => {
    await LoginPage.open();
    await LoginPage.login(standardUser.username, standardUser.password);

    await InventoryPage.addFirstItemToCart();
    await CartPage.cartButton.click();
    await CheckoutPage.startCheckout();
  });

  invalidCheckoutData.forEach(
    ({ scenario, firstName, lastName, postalCode, expectedError }) => {
      it(`Should show error when ${scenario}`, async () => {
        await CheckoutPage.fillCheckoutInfo(firstName, lastName, postalCode);

        await expect(CheckoutPage.errorMessage).toHaveText(expectedError);
      });
    },
  );
});
