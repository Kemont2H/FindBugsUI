const { test, expect } = require('@playwright/test');
const { allure } = require('allure-playwright');
const { LoginPage } = require('../pages/LoginPage');

/**
 * ТЕСТ #3: Поиск бага с производительностью
 * 
 * БАГ: performance_glitch_user значительно медленнее загружает страницы
 * 
 * Ожидаемое поведение: Все пользователи загружают страницы за < 3 секунд
 * Фактическое поведение: У performance_glitch_user загрузка > 5 секунд
 */
test.describe('Bug #3: Performance glitch user', () => {

    test('Performance glitch user should load pages within acceptable time', 
        async ({ page }) => {
            allure.feature('Performance');
            allure.story('Page load time');
            allure.severity('medium');
            allure.tag('bug', 'performance', 'slow')
            allure.description(`
                Given я пытаюсь войти как performance_glitch_user
                When нажимаю кнопку Login
                Then страница должна загрузиться за приемлемое время (< 3 сек)
                BUT загрузка происходит очень медленно (> 5 сек)
            `);

            const loginPage = new LoginPage(page);

            // Засекаем время

            const startTime = Date.now();

            await loginPage.goto();
            await loginPage.login('performance_glitch_user', 'secret_sauce');

            // Ждем появления меню (признак успешного входа)

            await page.waitForSelector('#react-burger-menu-btn', {timeout: 10000});

            const loadTime = Date.now() - startTime;

            // Прикрепляем время к отчету allure 

            await test.info().attach('page-load-time', {
                body: `Загрузка заняла ${loadTime} мс`,
                contentType: 'text/plain'
            });

            // Ожидаем, что загрузка быстрее 5 секунд
            // ТЕСТ УПАДЁТ, ТАК КАК ЭТОТ ПОЛЬЗОВАТЕЛЬ МЕДЛЕННЫЙ - ЭТО И ЕСТЬ БАГ
            expect(loadTime).toBeLessThan(5000);

            const screenshot = await page.screenshot();
            await test.info().attach('slow-page-screenshot', {
                body: screenshot,
                contentType: 'image/png'
            });

            console.log(`БАГ НАЙДЕН: Загрузка страницы заняла ${loadTime}мс, что превышает ожидаемые 5000мс`);
            });
        });