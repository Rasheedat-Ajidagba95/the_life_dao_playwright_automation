const { expect } = require('@playwright/test');

exports.signupPage = class signupPage {
    constructor(page) {
    this.page = page;
    this.loginLink = page.getByRole('link', { name: 'Log In' });
    this.signupLink = page.getByRole('link', { name: 'Sign Up' });
    this.emailField = page.getByPlaceholder('Enter your email');
    this.passwordField = page.getByPlaceholder('Enter your password');
    this.inviteCodeField = page.getByPlaceholder('Invite code/link');
    this.submitInviteCodeButton = page.getByRole('button', { name: 'Submit' })
    this.invalidInviteCodeError = page.getByText('Invite code is invalid');
    this.emptyInviteCodeError = page.getByText('Please enter invite code/link.');
    this.personInvitedByText = page.getByText('Invited by:');
    this.repeatPasswordField = page.getByPlaceholder('Repeat Password');
    this.signupButton = page.locator('form').getByRole('button', { name: 'Sign Up' });
  }

  async gotoSignupPage() {
    await this.page.goto('https://uat.thelifedao.io/en');
    await this.loginLink.click();
    await this.signupLink.click();
  }

  async verifySignupPageVisible() {
    await expect(this.page.getByText('Join The LifeDAO')).toBeVisible();
  }

  async fillInviteCode(inviteCode) {
    await this.inviteCodeField.fill(inviteCode);
    await this.submitInviteCodeButton.click();
  }

   async verifyPersonInvite(){
    await expect(this.personInvitedByText).toBeVisible();
  }

  async fillSignupForm(email, password, repeatPassword) {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.repeatPasswordField.fill(repeatPassword);
    await this.signupButton.click();
  }

   async verifyInvalidInviteCodeError() {
    await expect(this.invalidInviteCodeError).toBeVisible();
  }

    async verifyEmptyInviteCodeError() {
    await expect(this.emptyInviteCodeError).toBeVisible();
  }
}
