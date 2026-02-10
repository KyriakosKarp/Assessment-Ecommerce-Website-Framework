const BasePage = require("./basePage");

class InventoryPage extends BasePage {
  get inventoryItems() {
    return $$(".inventory_item");
  }

  get sortDropdown() {
    return $(".product_sort_container");
  }

  get itemNamesElements() {
    return $$(".inventory_item_name");
  }

  get itemPriceElements() {
    return $$(".inventory_item_price");
  }

  // Uses .btn_inventory as it covers both Add and Remove states
  get addToCartButtons() {
    return $$(".btn_inventory");
  }

  async sortByNameAToZ() {
    await this.sortDropdown.selectByVisibleText("Name (A to Z)");
  }

  async sortByPriceLowToHigh() {
    await this.sortDropdown.selectByVisibleText("Price (low to high)");
  }

  async sortByPriceHighToLow() {
    await this.sortDropdown.selectByVisibleText("Price (high to low)");
  }

  async getItemNames() {
    const names = [];
    for (const el of await this.itemNamesElements) {
      names.push(await el.getText());
    }
    return names;
  }

  async getItemPrices() {
    const prices = [];
    for (const el of await this.itemPriceElements) {
      const text = await el.getText(); // "$29.99"
      prices.push(parseFloat(text.replace("$", "")));
    }
    return prices;
  }

  // Adds item to cart by index.
  // Defaults to index 0 to keep tests concise for single-item scenarios.
  async addItemToCart(index = 0) {
    const buttons = await this.addToCartButtons;
    await buttons[index].click();
  }
}

module.exports = new InventoryPage();
