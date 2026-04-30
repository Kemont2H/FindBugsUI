const { expect } = require('@playwright/test');
const { allure } = require('allure-playwright');

class InventoryPage {
    constructor(page) {
        this.page = page;
        this.itemImages = '.inventory_item_img img';
        this.itemNames = '.inventory_item_name';
        this.cartBadge = '.shopping_cart_badge';
        this.sortDropdown = '[data-test="product-sort-container"]';
    }

    async waitForInventoryLoaded() {
        await this.page.waitForSelector(this.itemNames);
    }

    async getAllImageUrls() {
        const images = this.page.locator(this.itemImages);
        const count = await images.count();
        const urls = [];
        for (let imgIndex = 0; imgIndex < count; imgIndex++) {
            const src = await images.nth(imgIndex).getAttribute('src');
            urls.push(src);
        }
        return urls;
    }

    async expectImagesAreUnique() {
        const urls = await this.getAllImageUrls();
        const uniqueUrls = new Set(urls);
        expect(uniqueUrls.size).toBe(urls.length);
    }

    async addItemToCart(itemName) {
        const slug = itemName.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');
        const addButton = `[data-test="add-to-cart-${slug}"]`;
        await this.page.click(addButton);
    }

    async getCartCount() {
        const badge = this.page.locator(this.cartBadge);
        if (await badge.isVisible()) {
            return parseInt(await badge.textContent());
        }
        return 0;
    }

    async removeItemFromCart(itemName) {
        const slug = itemName.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');
        const removeButton = `[data-test="remove-${slug}"]`;
        await this.page.click(removeButton);
    }

    async sortBy(value) {
        const sortMap = {
            'az': 'az',
            'za': 'za', 
            'lohi': 'lohi',
            'hilo': 'hilo'
        };
        await this.page.selectOption(this.sortDropdown, sortMap[value]);
        await this.page.waitForTimeout(500);
    }

    async getItemNames() {
        return await this.page.locator(this.itemNames).allTextContents();
    }
}

module.exports = { InventoryPage };