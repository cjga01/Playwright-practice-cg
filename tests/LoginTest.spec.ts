import {test, expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';


test.describe('Login tests', () => {

    // Paso previo que se ejecuta antes de cada test
    test.beforeEach(async ({ page }) => {
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    });

    test('Happy path - Login', async ({ page }) => {
        // 1. Ingresar datos
        const loginpage = new LoginPage(page);
        await loginpage.navigateToLogin();
        await loginpage.checkLoginPageElements();
        await loginpage.login('Admin','admin123');
        // 3. Afirmar (Expect) el resultado esperado
        await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    });
    test('Login w/ incorrect credentials', async ({ page }) => {
        // 1. Ingresar datos
        const loginpage = new LoginPage(page);
        await loginpage.checkLoginPageElements();
        await loginpage.login('PepeAdmin','admin321')
        
        // 3. Afirmar (Expect) el resultado esperado
        await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    });
    
});