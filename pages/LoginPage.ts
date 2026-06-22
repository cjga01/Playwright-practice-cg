// pages/LoginPage.ts
import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

const fakeEmail = 'asd@gamil.com';
const fakePassword = 'pass123';

export class LoginPage extends BasePage {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly usernameHeader: Locator;
    readonly invalidCredAlert: Locator;
    readonly usernameRequiredMessage: Locator;
    readonly passwordRequiredMessage: Locator;
    

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.getByRole('textbox', { name: 'Username'});
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.usernameHeader = page.getByRole('heading',{name: 'Login'});
        this.invalidCredAlert = page.getByRole('alert');
        this.usernameRequiredMessage = page.locator('.oxd-input-group').filter({hasText: 'Username'}).getByText('Required');
        this.passwordRequiredMessage = page.locator('.oxd-input-group').filter({ hasText: 'Password' }).getByText('Required');
        
    }

    // Método específico de esta página
    async navigateToLogin() {
        await this.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }

    async login(user: string, pass: string) {
        await this.usernameInput.fill(user);
        await this.passwordInput.fill(pass);
        await this.loginButton.click();
    }

    async checkLoginPageElements(){
        await expect(this.usernameHeader).toBeVisible();
        await expect(this.usernameInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.loginButton).toBeVisible();
    }

    async invalidFields(){
        await this.usernameInput.fill(fakeEmail);
        await this.passwordInput.fill(fakePassword);
        await this.loginButton.click();
        await expect(this.invalidCredAlert).toBeVisible();
        await expect(this.invalidCredAlert).toHaveText('Invalid credentials');
    }
}