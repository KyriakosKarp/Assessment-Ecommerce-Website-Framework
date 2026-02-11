const LoginPage = require("../../pageObjects/loginPage");
const InventoryPage = require("../../pageObjects/inventoryPage");
const Header = require("../../pageObjects/components/header.comp");
const CheckoutPage = require("../../pageObjects/checkoutPage");
const invalidCheckoutData = require("../data/checkout/invalidCheckoutData");
const { users } = require("../data/authentication/users");

describe("Checkout Flow", () => {
  async function loginAndGoToCheckoutStepOne() {
    await LoginPage.open();
    await LoginPage.login(
      users.standardUser.username,
      users.standardUser.password,
    );

    await InventoryPage.clearCart();
    await InventoryPage.addItemToCart();
    await Header.goToCart();
    await CheckoutPage.proceedToCheckout();
  }

  async function completeValidCheckout() {
    await CheckoutPage.fillCheckoutInfo("John", "Papa", "12345");
  }

  beforeEach(async () => {
    await LoginPage.open();
  });

  // ------------
  //  HAPPY PATH
  // ------------

  it("Should complete checkout successfully", async () => {
    await loginAndGoToCheckoutStepOne();

    await completeValidCheckout();
    await CheckoutPage.finishCheckout();

    const url = await browser.getUrl();
    expect(url).toContain("checkout-complete");

    await expect(CheckoutPage.completeHeader).toHaveText(
      "Thank you for your order!",
    );
  });

  // -----------
  //  BACK HOME
  // -----------

  it("Should navigate back to inventory when clicking Back Home", async () => {
    await loginAndGoToCheckoutStepOne();

    await completeValidCheckout();
    await CheckoutPage.finishCheckout();

    await CheckoutPage.backHomeButton.click();

    const url = await browser.getUrl();
    expect(url).toContain("inventory");
  });

  // -------------
  //  CANCEL FLOW
  // -------------

  it("Should cancel checkout and return to inventory", async () => {
    await loginAndGoToCheckoutStepOne();

    await completeValidCheckout();

    await CheckoutPage.cancelButton.click();

    const url = await browser.getUrl();
    expect(url).toContain("inventory");
  });

  // --------------------
  //  SUMMARY VALIDATION
  // --------------------

  it("Should calculate correct total (subtotal + tax)", async () => {
    await loginAndGoToCheckoutStepOne();

    await completeValidCheckout();

    const prices = await CheckoutPage.getItemPrices();

    const subtotal = prices.reduce((sum, p) => sum + p, 0);

    const tax = await CheckoutPage.getTax();
    const expectedTotal = parseFloat((subtotal + tax).toFixed(2));

    const total = await CheckoutPage.getTotal();

    expect(total).toBe(expectedTotal);
  });

  // ----------------
  //  NEGATIVE CASES
  // ----------------

  invalidCheckoutData.forEach(
    ({ scenario, firstName, lastName, postalCode, expectedError }) => {
      it(`Should show error when ${scenario}`, async () => {
        await loginAndGoToCheckoutStepOne();

        await CheckoutPage.fillCheckoutInfo(firstName, lastName, postalCode);

        await expect(CheckoutPage.errorMessage).toHaveText(expectedError);
      });
    },
  );
});
