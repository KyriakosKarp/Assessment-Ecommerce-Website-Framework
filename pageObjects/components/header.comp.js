class HeaderComponent {
  get cartButton() {
    return $(".shopping_cart_link");
  }

  get cartBadge() {
    return $(".shopping_cart_badge");
  }

  async goToCart() {
    await this.cartButton.click();
  }

  async getCartCount() {
    if (await this.cartBadge.isExisting()) {
      return await this.cartBadge.getText();
    }
    return null;
  }
}

module.exports = new HeaderComponent();
