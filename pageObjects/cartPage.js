const BasePage = require("./basePage");
const Header = require("./components/header.comp");

class CartPage extends BasePage {
  // -------- Selectors --------

  get cartItems() {
    return $$(".cart_item");
  }

  get removeButtons() {
    return $$('button[data-test^="remove-"]');
  }

  get checkoutButton() {
    return $("#checkout");
  }

  get continueShoppingButton() {
    return $("#continue-shopping");
  }

  // -------- Navigation --------

  async open() {
    await Header.goToCart();
    await this.checkoutButton.waitForDisplayed();
  }

  // -------- Actions --------

  async removeItemByIndex(index) {
    const buttons = this.removeButtons;

    if (!buttons[index]) {
      throw new Error(
        `Remove button at index ${index} not found. Available buttons: ${buttons.length}`,
      );
    }

    await buttons[index].click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async clearCart() {
    let buttons = await this.removeButtons;

    while (buttons.length > 0) {
      await buttons[0].click();
      // buttons.splice(0, 1);
      buttons = await this.removeButtons;
    }
  }
}

module.exports = new CartPage();
