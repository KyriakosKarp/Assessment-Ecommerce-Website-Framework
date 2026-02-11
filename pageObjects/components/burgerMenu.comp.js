class BurgerMenu {
  get menuButton() {
    return $("#react-burger-menu-btn");
  }

  get closeButton() {
    return $("#react-burger-cross-btn");
  }

  get menuItems() {
    return $$(".bm-item");
  }

  get allItemsLink() {
    return $("#inventory_sidebar_link");
  }

  get aboutLink() {
    return $("#about_sidebar_link");
  }

  get logoutLink() {
    return $("#logout_sidebar_link");
  }

  get resetAppStateLink() {
    return $("#reset_sidebar_link");
  }

  async open() {
    await this.menuButton.click();

    // The burger menu is rendered off-canvas and uses a slide-in animation.
    // We explicitly wait for at least one menu item to be visible to avoid
    // reading empty text values before the animation completes.
    await browser.waitUntil(
      async () => {
        const items = await this.menuItems;
        if (items.length === 0) return false;

        const text = (await items[0].getText()).trim();
        return text.length > 0;
      },
      {
        timeout: 5000,
        timeoutMsg: "Burger menu did not open correctly",
      },
    );
  }

  async close() {
    await this.closeButton.click();
  }

  async getMenuItemsText() {
    const texts = [];

    for (const item of await this.menuItems) {
      texts.push((await item.getText()).trim());
    }
    return texts;
  }

  async clickAllItems() {
    await this.allItemsLink.click();
  }

  async clickAbout() {
    await this.aboutLink.click();
  }

  async logout() {
    await this.logoutLink.click();
  }

  async resetAppState() {
    await this.resetAppStateLink.click();
  }
}

module.exports = new BurgerMenu();
