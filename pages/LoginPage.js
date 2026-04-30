const { expect } = require('@playwright/test');
const { allure } = require('allure-playwright');

/**
 * Page Object для страницы логина
 * Инкапсулирует все элементы и действия на странице входа
 */

class LoginPage {
    constructor (page) {
        this.page = page;

        // Локаторы - сохраняем все селекторы в свойствах класса
        // Используем data-test атрибуты, они наиболее стабильны

        this.usernameInput = '[data-test="username"]';
        this.passwordInput = '[data-test="password"]';
        this.loginButton = '[data-test="login-button"]';
        this.errorMessage = '[data-test="error"]';

        // Локаторы для кнопки меню (будет виден после входа)

        this.burgerMenu = '#react-burger-menu-btn';
    }

    
    /**
     * Открывает страницу логина
     * Используем allure.step для красивого отображения в отчёте
     */


    async goto() {
        await allure.step('Open SauceDemo login page', async() => {
            await this.page.goto('/');
        });
    }
    /**
     * Выполняет вход с указанными credentials
     * @param {string} username - имя пользователя
     * @param {string} password - пароль
     */

    async login(username, password) {
        await allure.step(`Login as user: ${username}`, async () => {
            await this.page.fill(this.usernameInput, username);
            await this.page.fill(this.passwordInput, password);
            await this.page.click(this.loginButton);
    });
}
   /**
     * Проверяет, что заблокированный пользователь получил ошибку
     * Это и есть проверка на баг
     */

    async expectSuccessfulLogin() {
        await allure.step('Verify locked out user sees error message', async () => {
            const errorText = await this.page.locator(this.errorMessage).textContent();
            // Ожидаем конкретное сообщение об ошибке
            expect(errorText).toContain('Epic sadface: Sorry, this user has been locked out.');
        });
    }
    /**
     * Проверяет успешный вход (наличие бургер-меню)
     */

    async expectSuccessfulLogin() {
        await allure.step('Verify successful login - burger menu is visible', async () => {
            await expect(this.page.locator(this.burgerMenu)).toBeVisible();
    });
}
}

module.exports = {LoginPage};

