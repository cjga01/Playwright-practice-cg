// pages/BasePage.ts
import { Page } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Method for  URL navigation
    async goto(url: string): Promise<void> {
        await this.page.goto(url);
    }

    // 💡 Tip: Here you can add other useful methods for ALL pages
    async waitForPageToLoad(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
    }
}