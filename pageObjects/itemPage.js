class ItemPage {
  // Selectors
  get itemTitle() {
    return $(".inventory_details_name");
  }

  get itemPrice() {
    return $(".inventory_details_price");
  }

  get backButton() {
    return $("#back-to-products");
  }

  get addRemoveButton() {
    return $(".btn_inventory");
  }

  // Actions

  async getItemTitle() {
    return await this.itemTitle.getText();
  }

  async getItemPrice() {
    const text = await this.itemPrice.getText();
    return parseFloat(text.replace("$", ""));
  }

  async addToCart() {
    await this.addRemoveButton.click();
  }

  async getAddRemoveButtonText() {
    return await this.addRemoveButton.getText();
  }

  async backToProducts() {
    await this.backButton.click();
  }
}

module.exports = new ItemPage();
