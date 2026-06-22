import {test, expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';


test.describe('Login tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    });

    test('Happy path - Login', async ({ page }) => {
        const loginpage = new LoginPage(page);
        await loginpage.navigateToLogin();
        await loginpage.checkLoginPageElements();
        const username = process.env.USER_NAME || '';
        const password = process.env.USER_PASSWORD || '';
        await loginpage.login(username,password);
        await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    });
    test('Login w/ incorrect credentials', async ({ page }) => {
        
        const loginpage = new LoginPage(page);
        await loginpage.checkLoginPageElements();
        await loginpage.invalidFields();
        await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    });
    test('Login w/ empty Username field', async ({ page }) => {

        const loginpage = new LoginPage(page);
        await loginpage.checkLoginPageElements();
        await loginpage.login('', 'admin321')
        await expect(loginpage.usernameRequiredMessage).toBeVisible();
        await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    });
    test('Login w/ empty Password field', async ({ page }) => {

        const loginpage = new LoginPage(page);
        await loginpage.checkLoginPageElements();
        await loginpage.login('PepeAdmin', '')
        await expect(loginpage.passwordRequiredMessage).toBeVisible();
        await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    });
    test('Login w/ empty fields', async ({ page }) => {

        const loginpage = new LoginPage(page);
        await loginpage.checkLoginPageElements();
        await loginpage.login('', '');
        await loginpage.invalidFields();
        await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    });
});