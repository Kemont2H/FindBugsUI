const { test } = require('@playwright/test');
const { allure } = require('allure-playwright');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');

/**
 * ТЕСТ #2: Поиск бага с дублирующимися картинками
 * 
 * БАГ: У problem_user все картинки товаров одинаковые
 * (все показывают Sauce Labs Backpack)
 * 
 * Ожидаемое поведение: У каждого товара своя уникальная картинка
 * Фактическое поведение: Все картинки ведут на один URL
 */

test.describe('Bug #2: Duplicate product images', () => {

    test('Problem user should see unique product images', async ({ page }) => {
        allure.feature('Inventory Display');
        allure.story('Product images');
        allure.severity('high');
        allure.tag('bug','ui','images');
        allure.description(`
            Given я захожу как problem_user
            When открывается страница с товарами
            Then каждый товар должен иметь свою уникальную картинку
            BUT все картинки одинаковые
        `);

        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        // Логинимся как problem_user

        await loginPage.goto();
        await loginPage.login('problem_user','secret_sauce');
        await inventoryPage.waitForInventoryLoaded();

        // Проверяем уникальность изображений
        // Этот тест упадёт, так как problem_user имеет баг с дубликатами
        await inventoryPage.expectImagesAreUnique();
        
        const screenshot = await page.screenshot();
        await test.info().attach('bug-duplicate-images', {
            body: screenshot,
            contentType: 'image/png',
            description: 'Все картинки показывают один и тот же товар'
        });
        
        console.log('БАГ НАЙДЕН: Все картинки товаров одинаковые для problem_user');
    });
});