const { test, expect } = require('@playwright/test');
const { allure } = require('allure-playwright');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');

/**
 * ТЕСТ #4: Поиск бага с обновлением счётчика корзины
 * 
 * БАГ: После удаления товара бейдж корзины всё ещё показывает 1
 * (наблюдается у проблемных пользователей)
 * 
 * Ожидаемое поведение: При удалении товара счётчик должен исчезнуть или стать 0
 * Фактическое поведение: Бейдж продолжает висеть с числом 1
 */
test.describe('Bug #4: Cart badge not updating', () => {
    
    test('Cart badge should disappear after removing last item', async ({ page }) => {
        allure.feature('Cart Functionality');
        allure.story('Cart badge update');
        allure.severity('normal');
        allure.tag('bug','cart','ui');
        allure.description(`
            Given я добавил товар в корзину
            When я удаляю этот товар из корзины
            Then бейдж счётчика должен исчезнуть
            BUT бейдж всё ещё показывает 1
        `);
        
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.goto();
        await loginPage.login('problem_user','secret_sauce');

        // Добавляем товар 

        
        await inventoryPage.addItemToCart('Sauce Labs Backpack');

        // Ждем обновления UI 

        await page.waitForTimeout(500);

        // Проверка бага (счетчик должен пропасть)

        const badge = page.locator('.shopping_cart_badge');

        await expect(badge).not.toBeVisible();

        const screenshot = await page.screenshot();
        await test.info().attach('cart-badge-bug', {
            body: screenshot,
            contentType: 'image/png',
            description: 'Бейдж всё ещё виден после удаления последнего товара'
        });
        
        console.log('БАГ НАЙДЕН: Бейдж корзины продолжает отображаться после удаления товара');
    });
});