const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.describe('Bug #1: Locked user authentication', () => {
    
    test('Locked out user should see error message', async ({ page }) => {
        const loginPage = new LoginPage(page);
        
        await loginPage.goto();
        await loginPage.login('locked_out_user', 'secret_sauce');
        
        // Исправлено: проверяем ошибку напрямую
        const errorMessage = page.locator('[data-test="error"]');
        await expect(errorMessage).toContainText('Epic sadface: Sorry, this user has been locked out.');
        
        const screenshot = await page.screenshot();
        await test.info().attach('bug-screenshot', {
            body: screenshot,
            contentType: 'image/png'
        });
        
        console.log(' БАГ НАЙДЕН: locked_out_user не может войти');
    });
});