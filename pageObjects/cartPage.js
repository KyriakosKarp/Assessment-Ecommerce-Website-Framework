const BasePage = require("./basePage");

class CartPage extends BasePage {
  get cartItems() {
    return $$(".cart_item");
  }

  get removeButtons() {
    return $$(".cart_item button");
  }

  get cartButton() {
    return $(".shopping_cart_link");
  }

  get cartBadge() {
    return $(".shopping_cart_badge");
  }

  get checkoutButton() {
    return $("#checkout");
  }

  get continueShoppingButton() {
    return $("#continue-shopping");
  }

  get continueShoppingButton() {
    return $("#continue-shopping");
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async open() {
    await super.open("/cart.html");
  }

  async removeItemByIndex(index) {
    const buttons = await this.removeButtons;
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
