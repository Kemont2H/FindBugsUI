// Вариант 1: Без allure (простой)
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');

test.describe('Bug #5: Sorting malfunction', () => {
    
    test('Problem user should see correctly sorted items (Z to A)', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        
        await loginPage.goto();
        await loginPage.login('problem_user', 'secret_sauce');
        await inventoryPage.waitForInventoryLoaded();
        
        await inventoryPage.sortBy('za');
        
        const itemNames = await inventoryPage.getItemNames();
        const expectedSorted = [...itemNames].sort().reverse();
        
        console.log('Фактический порядок:', itemNames);
        console.log('Ожидаемый порядок:', expectedSorted);
        
        // Этот assert упадёт - БАГ НАЙДЕН!
        expect(itemNames).toEqual(expectedSorted);
        
        const screenshot = await page.screenshot();
        await test.info().attach('sorting-bug', {
            body: screenshot,
            contentType: 'image/png'
        });
        
        console.log(' БАГ НАЙДЕН: Сортировка работает некорректно');
    });
});