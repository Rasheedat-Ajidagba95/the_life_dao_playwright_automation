const { expect } = require('@playwright/test');

exports.loginPage = class loginPage {
    constructor(page) {
    this.page = page;
    this.loginLink = page.getByRole('link', { name: 'Log In' });
    this.emailField = page.getByPlaceholder('Enter your email');
    this.passwordField = page.getByPlaceholder('Enter your password');
    this.loginButton = page.locator('form').getByRole('button', { name: 'Log In' });
    this.verifyAccountText = page.getByText('Verify your account', { exact: true });
    this.dashboardHeader = page.getByRole('heading', { name: 'Dashboard' }).nth(1);
    this.profileButton = page.getByRole('button', { name: 'Profile' });
    this.connectWalletButton = page.getByRole('button', { name: 'Connect Wallet' });
  }

  async gotoLoginPage() {
    await this.page.goto('https://uat.thelifedao.io/en');
    await this.loginLink.click();
    await this.emailField.waitFor({ state: 'visible' });
  }

  async login(email, password) {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }

  async verifyElementsInDashboard() {
    await expect(this.dashboardHeader).toBeVisible();
    await expect(this.profileButton).toBeVisible();
    await expect(this.connectWalletButton).toBeVisible();
  }

  async verifyInvalidPasswordError() {
    await expect(
      this.page.locator('div').filter({ hasText: 'Invalid email or password' }).nth(4)
    ).toBeVisible();
  }

  async verifyInvalidEmailFormatError() {
    await expect(this.page.getByText('Please enter valid email.')).toBeVisible();
  }

  async verifyEmptyFieldsError() {
    await expect(this.page.getByText('Please enter the email.')).toBeVisible();
    await expect(this.page.getByText('Please enter password.')).toBeVisible();
  }

  async verifyUnverifiedAccount() {    
    await expect(this.verifyAccountText).toBeVisible();
  }
}