const BasePage = require("./basePage");

class CheckoutPage extends BasePage {
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

  get finishButton() {
    return $("#finish");
  }

  get backHomeButton() {
    return $("#back-to-products");
  }

  get completeHeader() {
    return $(".complete-header");
  }

  get errorMessage() {
    return $('[data-test="error"]');
  }

  async startCheckout() {
    await this.checkoutButton.click();
  }

  async fillCheckoutInfo(firstName, lastName, postalCode) {
    await this.firstNameInput.setValue(firstName);
    await this.lastNameInput.setValue(lastName);
    await this.postalCodeInput.setValue(postalCode);
    await this.continueButton.click();
  }

  async finishCheckout() {
    await this.finishButton.click();
  }
}

module.exports = new CheckoutPage();
