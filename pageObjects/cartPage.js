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

  async open() {
    await super.open("/cart.html");
  }

  async removeFirstItem() {
    const buttons = await this.removeButtons;
    if (buttons.length > 0) {
      await buttons[0].click();
    }
  }
}

module.exports = new CartPage();
