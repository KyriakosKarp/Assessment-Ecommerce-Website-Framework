const BasePage = require("./basePage");
const Header = require("./components/header.comp");
const CartPage = require("./cartPage");

class InventoryPage extends BasePage {
  // -------- Selectors --------

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

  get inventoryButtons() {
    return $$(".btn_inventory");
  }

  get cartBadge() {
    return Header.cartBadge;
  }

  // -------- Cart Actions --------

  async addItemToCart(index = 0) {
    const buttons = await this.inventoryButtons;

    if (!buttons[index]) {
      throw new Error(`Add to cart button at index ${index} not found`);
    }

    await buttons[index].click();
  }

  async clearCart() {
    let buttons = await CartPage.removeButtons;

    while (buttons.length > 0) {
      await buttons[0].click();
      buttons = await CartPage.removeButtons;
    }
  }

  // -------- Sorting --------

  async sortByNameAToZ() {
    await this.sortDropdown.selectByVisibleText("Name (A to Z)");
  }

  async sortByPriceLowToHigh() {
    await this.sortDropdown.selectByVisibleText("Price (low to high)");
  }

  async sortByPriceHighToLow() {
    await this.sortDropdown.selectByVisibleText("Price (high to low)");
  }

  // -------- Data Extraction --------

  async getItemNames() {
    const elements = await this.itemNamesElements;
    const names = [];

    for (const el of elements) {
      names.push(await el.getText());
    }

    return names;
  }

  async getItemPrices() {
    const elements = await this.itemPriceElements;
    const prices = [];

    for (const el of elements) {
      const text = await el.getText();
      prices.push(parseFloat(text.replace("$", "")));
    }

    return prices;
  }
}

module.exports = new InventoryPage();
