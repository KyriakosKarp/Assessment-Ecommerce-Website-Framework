const BasePage = require("./basePage");

class InventoryPage extends BasePage {
  get inventoryItems() {
    return $$(".inventory_item");
  }

  get firstAddToCartButton() {
    return $(".inventory_item button");
  }

  get cartBadge() {
    return $(".shopping_cart_badge");
  }

  async addFirstItemToCart() {
    await this.firstAddToCartButton.click();
  }
}

module.exports = new InventoryPage();
