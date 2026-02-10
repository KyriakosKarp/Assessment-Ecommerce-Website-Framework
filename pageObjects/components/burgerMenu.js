class BurgerMenu {
  get menuButton() {
    return $("#react-burger-menu-btn");
  }

  get logoutLink() {
    return $("#logout_sidebar_link");
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}

module.exports = new BurgerMenu();
