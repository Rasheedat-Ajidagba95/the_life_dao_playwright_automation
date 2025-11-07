import {test, expect} from '@playwright/test';
import {signupPage} from '../pages/signupPage';
 
const Mailosaur = require('mailosaur');

const apiKey ='0RLQglkErXZSE9WdSndtKFos74df1SZO'
const mailosaur = new Mailosaur(apiKey);
const serverId = 'smkmsvf2';
const testEmailDomain = '@smkmsvf2.mailosaur.net';

let emailAddress ;

test.describe('Signup Test Suite', () => {

   let Signup

test('signup and verify account', async ({page})=>{
    Signup = new signupPage(page);
    const randonString = new Date ().getTime();
    emailAddress = 'rashey' + randonString + testEmailDomain;

    await Signup.gotoSignupPage();
    await Signup.verifySignupPageVisible();
    await Signup.fillInviteCode('VzWMHn');
    await Signup.verifyPersonInvite();
    await Signup.fillSignupForm(emailAddress, 'more@444', 'more@444');
   

    const emailMessage = await mailosaur.messages.get(serverId, {
       sentTo: emailAddress})
    await expect (emailMessage.subject).toEqual('Verify Your Email');
    let verifyAccountLink = emailMessage.html.links[0].href;

    await page.goto(verifyAccountLink);
    
})

test('signup with invalid invite code', async ({page})=>{
    Signup = new signupPage(page);

    await Signup.gotoSignupPage();
    await Signup.verifySignupPageVisible();
    await Signup.fillInviteCode('INVALIDCODE');
    await Signup.verifyInvalidInviteCodeError();
})

test('signup with empty invite code', async ({page})=>{
    Signup = new signupPage(page);

    await Signup.gotoSignupPage();
    await Signup.verifySignupPageVisible();
    await Signup.fillInviteCode('');
    await Signup.verifyEmptyInviteCodeError();
})

test('signup with already used invite code', async ({page})=>{
    Signup = new signupPage(page);
    
    await Signup.gotoSignupPage();
    await Signup.verifySignupPageVisible();
    await Signup.fillInviteCode('rP4AUE');
    await Signup.verifyInvalidInviteCodeError();
})
})