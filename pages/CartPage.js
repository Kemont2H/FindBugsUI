const { expect } = require('@playwright/test');
const { allure } = require('allure-playwright');


class CartPage {
    constructor(page) {
        this.page = page;
        
        // Все элементы на странице корзины
        
        // Элементы корзины
        this.cartList = '.cart_list';                    // Контейнер корзины
        this.cartItems = '.cart_item';                   // Каждый товар в корзине
        this.cartBadge = '.shopping_cart_badge';         // Бейдж с количеством (в шапке)
        this.cartLink = '.shopping_cart_link';           // Ссылка/иконка корзины в шапке
        
        // Кнопки в корзине
        this.checkoutButton = '[data-test="checkout"]';   // Кнопка "Checkout"
        this.continueShoppingButton = '[data-test="continue-shopping"]'; // Продолжить покупки
        
        // Поля для checkout
        this.firstNameInput = '[data-test="firstName"]';
        this.lastNameInput = '[data-test="lastName"]';
        this.postalCodeInput = '[data-test="postalCode"]';
        this.continueButton = '[data-test="continue"]';
        this.finishButton = '[data-test="finish"]';
        this.cancelButton = '[data-test="cancel"]';
        
        // Подтверждение завершения
        this.completeHeader = '.complete-header';
        this.ponyExpressImage = '[data-test="pony-express"]';
        
        // Кнопки удаления товаров (динамические)
        // Формат: [data-test="remove-sauce-labs-backpack"]
        this.removeButtonPattern = '[data-test="remove-%s"]';
    }

    /**
     * Открывает страницу корзины (клик по иконке корзины)
     * Используется, когда нужно перейти в корзину с любой страницы
     */
    async openCart() {
        await allure.step('Open shopping cart page', async () => {
            await this.page.click(this.cartLink);
            await this.page.waitForSelector(this.cartList);
        });
    }

    /**
     * Получает количество товаров в корзине из бейджа
     * @returns {Promise<number>} - количество товаров (0 если бейдж не виден)
     */
    async getCartItemCount() {
        return await allure.step('Get cart badge count', async () => {
            const badge = this.page.locator(this.cartBadge);
            if (await badge.isVisible()) {
                return parseInt(await badge.textContent());
            }
            return 0;
        });
    }

    /**
     * Получает список всех товаров в корзине с их данными
     * @returns {Promise<Array>} - массив объектов с информацией о товарах
     */
    async getCartItems() {
        return await allure.step('Get all cart items details', async () => {
            const items = this.page.locator(this.cartItems);
            const count = await items.count();
            const cartItems = [];
            
            for (let i = 0; i < count; i++) {
                const item = items.nth(i);
                cartItems.push({
                    name: await item.locator('.inventory_item_name').textContent(),
                    price: await item.locator('.inventory_item_price').textContent(),
                    quantity: await item.locator('.cart_quantity').textContent()
                });
            }
            return cartItems;
        });
    }

    /**
     * Удаляет товар из корзины по названию
     * @param {string} itemName - название товара (например, "Sauce Labs Backpack")
     */
    async removeItem(itemName) {
        await allure.step(`Remove "${itemName}" from cart`, async () => {
            // Конвертируем название в slug для data-test атрибута
            const slug = this._itemNameToSlug(itemName);
            const removeButton = this.removeButtonPattern.replace('%s', slug);
            await this.page.click(removeButton);
            // Ждём обновления UI
            await this.page.waitForTimeout(500);
        });
    }

    /**
     * Удаляет первый товар в корзине (удобно когда название неизвестно)
     */
    async removeFirstItem() {
        await allure.step('Remove first item from cart', async () => {
            const firstItem = this.page.locator(this.cartItems).first();
            const removeButton = firstItem.locator('button');
            await removeButton.click();
            await this.page.waitForTimeout(500);
        });
    }

    /**
     * Проверяет, что корзина пуста
     */
    async expectCartIsEmpty() {
        await allure.step('Verify cart is empty', async () => {
            // Бейдж не должен отображаться
            await expect(this.page.locator(this.cartBadge)).not.toBeVisible();
            
            // Либо показывается сообщение "Cart is empty"
            const cartList = this.page.locator(this.cartList);
            const cartItemsCount = await this.page.locator(this.cartItems).count();
            expect(cartItemsCount).toBe(0);
        });
    }

    /**
     * Проверяет, что в корзине ожидаемое количество товаров
     * @param {number} expectedCount - ожидаемое количество
     */
    async expectCartCount(expectedCount) {
        await allure.step(`Verify cart contains ${expectedCount} item(s)`, async () => {
            const actualCount = await this.getCartItemCount();
            expect(actualCount).toBe(expectedCount);
        });
    }

    /**
     * Переходит к оформлению заказа (checkout)
     */
    async proceedToCheckout() {
        await allure.step('Proceed to checkout', async () => {
            await this.page.click(this.checkoutButton);
            await this.page.waitForSelector(this.firstNameInput);
        });
    }

    /**
     * Заполняет форму checkout информацией о доставке
     * @param {Object} userInfo - информация о пользователе
     * @param {string} userInfo.firstName - имя
     * @param {string} userInfo.lastName - фамилия  
     * @param {string} userInfo.postalCode - почтовый индекс
     */
    async fillCheckoutInfo(userInfo) {
        await allure.step(`Fill checkout info: ${userInfo.firstName} ${userInfo.lastName}`, async () => {
            await this.page.fill(this.firstNameInput, userInfo.firstName);
            await this.page.fill(this.lastNameInput, userInfo.lastName);
            await this.page.fill(this.postalCodeInput, userInfo.postalCode);
            await this.page.click(this.continueButton);
        });
    }

    /**
     * Завершает оформление заказа
     */
    async finishCheckout() {
        await allure.step('Finish checkout', async () => {
            await this.page.click(this.finishButton);
            await this.page.waitForSelector(this.completeHeader);
        });
    }

    /**
     * Проверяет успешное завершение заказа
     * @param {string} expectedMessage - ожидаемое сообщение (по умолчанию "Thank you for your order!")
     */
    async expectOrderComplete(expectedMessage = 'Thank you for your order!') {
        await allure.step('Verify order completion', async () => {
            await expect(this.page.locator(this.completeHeader)).toContainText(expectedMessage);
            await expect(this.page.locator(this.ponyExpressImage)).toBeVisible();
        });
    }

    /**
     * Отменяет оформление заказа и возвращается в корзину
     */
    async cancelCheckout() {
        await allure.step('Cancel checkout', async () => {
            await this.page.click(this.cancelButton);
            await this.page.waitForSelector(this.cartList);
        });
    }

    /**
     * Продолжает покупки (возврат на страницу каталога)
     */
    async continueShopping() {
        await allure.step('Continue shopping', async () => {
            await this.page.click(this.continueShoppingButton);
            await this.page.waitForSelector('.inventory_list');
        });
    }

    /**
     * Полный сценарий оформления заказа (комбо-метод)
     * @param {Object} userInfo - информация о пользователе
     */
    async completeOrder(userInfo) {
        await this.proceedToCheckout();
        await this.fillCheckoutInfo(userInfo);
        await this.finishCheckout();
    }

    /**
     * Конвертирует название товара в slug для data-test атрибута
     * @private
     */
    _itemNameToSlug(name) {
        return name.toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]/g, '');
    }
}

module.exports = { CartPage };