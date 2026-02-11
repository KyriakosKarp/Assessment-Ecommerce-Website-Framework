const BasePage = require("./basePage");

class CheckoutPage extends BasePage {
  // ---------- STEP ONE ----------
  get checkoutButton() {
    return $("#checkout");
  }

  get firstNameInput() {
    return $("#first-name");
  }

  get lastNameInput() {
    return $("#last-name");
  }

  get postalCodeInput() {
    return $("#postal-code");
  }

  get continueButton() {
    return $("#continue");
  }

  get cancelButton() {
    return $("#cancel");
  }

  get errorMessage() {
    return $('[data-test="error"]');
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async fillCheckoutInfo(firstName, lastName, postalCode) {
    await this.firstNameInput.setValue(firstName);
    await this.lastNameInput.setValue(lastName);
    await this.postalCodeInput.setValue(postalCode);
    await this.continueButton.click();
  }

  // ---------- OVERVIEW (STEP TWO) ----------

  get finishButton() {
    return $("#finish");
  }

  get summaryItemPrices() {
    return $$(".inventory_item_price");
  }

  get summarySubtotal() {
    return $(".summary_subtotal_label");
  }

  get summaryTax() {
    return $(".summary_tax_label");
  }

  get summaryTotal() {
    return $(".summary_total_label");
  }

  async finishCheckout() {
    await this.finishButton.click();
  }

  async getItemPrices() {
    const elements = await this.summaryItemPrices;

    const prices = [];

    for (const el of elements) {
      const text = await el.getText(); // "$29.99"
      prices.push(parseFloat(text.replace("$", "")));
    }

    return prices;
  }

  async getTax() {
    const text = await this.summaryTax.getText(); // "Tax: $2.40"
    return parseFloat(text.replace("Tax: $", ""));
  }

  async getTotal() {
    const text = await this.summaryTotal.getText(); // "Total: $32.39"
    return parseFloat(text.replace("Total: $", ""));
  }

  // ---------- COMPLETE PAGE ----------

  get completeHeader() {
    return $(".complete-header");
  }

  get backHomeButton() {
    return $("#back-to-products");
  }
}

module.exports = new CheckoutPage();
