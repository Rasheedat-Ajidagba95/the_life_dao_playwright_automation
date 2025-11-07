import {test, expect} from '@playwright/test';
import {loginPage} from '../../pages/loginPage';


test.describe('Login Test Suite', () => {

   let Login

test('login test with valid credentials', async ({page})=>{
    Login = new loginPage(page);

    await Login.gotoLoginPage();
    await Login.login('rashey@yopmail.com', 'more@444');
    await Login.verifyElementsInDashboard();
   
});
test('login test with invalid password', async ({page})=>{
    Login = new loginPage(page);

    await Login.gotoLoginPage();
    await Login.login('rashey@yopmail.com', 'more4me');
    await Login.verifyInvalidPasswordError();

});

test('login test with unregistered email', async ({page})=>{
    Login = new loginPage(page);

    await Login.gotoLoginPage();
    await Login.login('rashey22@yopmail.com', 'more444');
    await Login.verifyInvalidPasswordError();

});

test('login test with invalid email format', async ({page})=>{
    Login = new loginPage(page);

    await Login.gotoLoginPage();
    await Login.login('rashey@yopmailcom', 'more@444');
    await Login.verifyInvalidEmailFormatError();

}); 
test('login test with empty fields', async ({page})=>{
    Login = new loginPage(page);

    await Login.gotoLoginPage();
    await Login.login('', '');
    await Login.verifyEmptyFieldsError()
   });

test('login using unverified account', async ({page})=>{
    Login = new loginPage(page);

    await Login.gotoLoginPage();
    await Login.login('rashey2@yopmail.com', 'more@444');
    await Login.verifyUnverifiedAccount();
});
});
