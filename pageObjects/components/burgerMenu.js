class BurgerMenu {
  get menuButton() {
    return $("#react-burger-menu-btn");
  }

  get logoutLink() {
    return $("#logout_sidebar_link");
  }

  get resetAppStateLink() {
    return $("#reset_sidebar_link");
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }

  async resetAppState() {
    await this.menuButton.click();
    await this.resetAppStateLink.click();
  }
}

module.exports = new BurgerMenu();
