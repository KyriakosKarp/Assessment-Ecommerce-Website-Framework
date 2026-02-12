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

  get itemTitleLinks() {
    return $$(".inventory_item_name");
  }

  get itemImages() {
    return $$(".inventory_item_img a");
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

  async clickFirstItem() {
    const items = await this.itemTitleLinks;
    await items[0].click();
  }

  async clickFirstItemImage() {
    const images = await this.itemImages;
    await images[0].click();
  }

  // -------- Sorting --------

  async sortByNameAToZ() {
    await this.sortDropdown.selectByVisibleText("Name (A to Z)");
  }

  async sortByNameZToA() {
    await this.sortDropdown.selectByVisibleText("Name (Z to A)");
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

  async getCartItemCount() {
    if (!(await Header.cartBadge.isExisting())) {
      return 0;
    }

    const text = await Header.cartBadge.getText();
    return parseInt(text, 10);
  }
}

module.exports = new InventoryPage();
