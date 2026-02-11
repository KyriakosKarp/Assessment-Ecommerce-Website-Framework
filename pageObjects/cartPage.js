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

  get cartItemTitles() {
    return $$(".inventory_item_name");
  }

  get cartItemPrices() {
    return $$(".inventory_item_price");
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

  async getFirstItemTitle() {
    const items = await this.cartItemTitles;
    return await items[0].getText();
  }

  async getFirstItemPrice() {
    const prices = await this.cartItemPrices;
    const text = await prices[0].getText();
    return parseFloat(text.replace("$", ""));
  }
}

module.exports = new CartPage();
