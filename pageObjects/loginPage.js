const BasePage = require("./basePage");

class LoginPage extends BasePage {
  get usernameInput() {
    return $("#user-name");
  }

  get passwordInput() {
    return $("#password");
  }

  get loginButton() {
    return $("#login-button");
  }

  get errorMessage() {
    return $('[data-test="error"]');
  }

  get lockedOutErrorMessage() {
    return $(
      "//h3[contains(text(),'Epic sadface: Sorry, this user has been locked out')]",
    );
  }

  async open() {
    await super.open("/");
  }

  async login(username, password) {
    await this.usernameInput.setValue(username);
    await this.passwordInput.setValue(password);
    await this.loginButton.click();
  }
}

module.exports = new LoginPage();
