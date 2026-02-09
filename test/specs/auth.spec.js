const LoginPage = require('../../pageObjects/loginPage');
const { standardUser, lockedUser } = require('../data/users');

describe('Authentication', () => {

  beforeEach(async () => {
    await LoginPage.open();
  });

  it('Should login successfully with valid credentials', async () => {
    await LoginPage.login(standardUser.username, standardUser.password);
    const url = await browser.getUrl();
    expect(url).toContain('inventory');
  });

  it('Should show error for locked user', async () => {
    await LoginPage.login(lockedUser.username, lockedUser.password);
    await expect(LoginPage.lockedOutErrorMessage).toBeDisplayed();
  });

});
