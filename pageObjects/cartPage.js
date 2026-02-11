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
}

module.exports = new CartPage();
