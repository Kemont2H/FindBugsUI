# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: bug4-cart-badge.spec.js >> Bug #4: Cart badge not updating >> Cart badge should disappear after removing last item
- Location: tests\bug4-cart-badge.spec.js:17:5

# Error details

```
Error: expect(locator).not.toBeVisible() failed

Locator:  locator('.shopping_cart_badge')
Expected: not visible
Received: visible
Timeout:  5000ms

Call log:
  - Expect "not toBeVisible" with timeout 5000ms
  - waiting for locator('.shopping_cart_badge')
    9 × locator resolved to <span class="shopping_cart_badge" data-test="shopping-cart-badge">1</span>
      - unexpected value "visible"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - generic [ref=e7]:
          - button "Open Menu" [ref=e8] [cursor=pointer]
          - img "Open Menu" [ref=e9]
        - generic [ref=e11]: Swag Labs
        - generic [ref=e14]: "1"
      - generic [ref=e15]:
        - generic [ref=e16]: Products
        - generic [ref=e18] [cursor=pointer]:
          - generic [ref=e19]: Name (A to Z)
          - combobox [ref=e20]:
            - option "Name (A to Z)" [selected]
            - option "Name (Z to A)"
            - option "Price (low to high)"
            - option "Price (high to low)"
    - generic [ref=e24]:
      - generic [ref=e25]:
        - link "Sauce Labs Backpack" [ref=e27] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Backpack" [ref=e28]
        - generic [ref=e29]:
          - generic [ref=e30]:
            - link "Sauce Labs Backpack" [ref=e31] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e32]: Sauce Labs Backpack
            - generic [ref=e33]: carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.
          - generic [ref=e34]:
            - generic [ref=e35]: $29.99
            - button "Remove" [ref=e36] [cursor=pointer]
      - generic [ref=e37]:
        - link "Sauce Labs Bike Light" [ref=e39] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Bike Light" [ref=e40]
        - generic [ref=e41]:
          - generic [ref=e42]:
            - link "Sauce Labs Bike Light" [ref=e43] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e44]: Sauce Labs Bike Light
            - generic [ref=e45]: A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.
          - generic [ref=e46]:
            - generic [ref=e47]: $9.99
            - button "Add to cart" [ref=e48] [cursor=pointer]
      - generic [ref=e49]:
        - link "Sauce Labs Bolt T-Shirt" [ref=e51] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Bolt T-Shirt" [ref=e52]
        - generic [ref=e53]:
          - generic [ref=e54]:
            - link "Sauce Labs Bolt T-Shirt" [ref=e55] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e56]: Sauce Labs Bolt T-Shirt
            - generic [ref=e57]: Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.
          - generic [ref=e58]:
            - generic [ref=e59]: $15.99
            - button "Add to cart" [ref=e60] [cursor=pointer]
      - generic [ref=e61]:
        - link "Sauce Labs Fleece Jacket" [ref=e63] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Fleece Jacket" [ref=e64]
        - generic [ref=e65]:
          - generic [ref=e66]:
            - link "Sauce Labs Fleece Jacket" [ref=e67] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e68]: Sauce Labs Fleece Jacket
            - generic [ref=e69]: It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.
          - generic [ref=e70]:
            - generic [ref=e71]: $49.99
            - button "Add to cart" [ref=e72] [cursor=pointer]
      - generic [ref=e73]:
        - link "Sauce Labs Onesie" [ref=e75] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Onesie" [ref=e76]
        - generic [ref=e77]:
          - generic [ref=e78]:
            - link "Sauce Labs Onesie" [ref=e79] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e80]: Sauce Labs Onesie
            - generic [ref=e81]: Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.
          - generic [ref=e82]:
            - generic [ref=e83]: $7.99
            - button "Add to cart" [ref=e84] [cursor=pointer]
      - generic [ref=e85]:
        - link "Test.allTheThings() T-Shirt (Red)" [ref=e87] [cursor=pointer]:
          - /url: "#"
          - img "Test.allTheThings() T-Shirt (Red)" [ref=e88]
        - generic [ref=e89]:
          - generic [ref=e90]:
            - link "Test.allTheThings() T-Shirt (Red)" [ref=e91] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e92]: Test.allTheThings() T-Shirt (Red)
            - generic [ref=e93]: This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.
          - generic [ref=e94]:
            - generic [ref=e95]: $15.99
            - button "Add to cart" [ref=e96] [cursor=pointer]
  - contentinfo [ref=e97]:
    - list [ref=e98]:
      - listitem [ref=e99]:
        - link "Twitter" [ref=e100] [cursor=pointer]:
          - /url: https://twitter.com/saucelabs
      - listitem [ref=e101]:
        - link "Facebook" [ref=e102] [cursor=pointer]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e103]:
        - link "LinkedIn" [ref=e104] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e105]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | const { allure } = require('allure-playwright');
  3  | const { LoginPage } = require('../pages/LoginPage');
  4  | const { InventoryPage } = require('../pages/InventoryPage');
  5  | 
  6  | /**
  7  |  * ТЕСТ #4: Поиск бага с обновлением счётчика корзины
  8  |  * 
  9  |  * БАГ: После удаления товара бейдж корзины всё ещё показывает 1
  10 |  * (наблюдается у проблемных пользователей)
  11 |  * 
  12 |  * Ожидаемое поведение: При удалении товара счётчик должен исчезнуть или стать 0
  13 |  * Фактическое поведение: Бейдж продолжает висеть с числом 1
  14 |  */
  15 | test.describe('Bug #4: Cart badge not updating', () => {
  16 |     
  17 |     test('Cart badge should disappear after removing last item', async ({ page }) => {
  18 |         allure.feature('Cart Functionality');
  19 |         allure.story('Cart badge update');
  20 |         allure.severity('normal');
  21 |         allure.tag('bug','cart','ui');
  22 |         allure.description(`
  23 |             Given я добавил товар в корзину
  24 |             When я удаляю этот товар из корзины
  25 |             Then бейдж счётчика должен исчезнуть
  26 |             BUT бейдж всё ещё показывает 1
  27 |         `);
  28 |         
  29 |         const loginPage = new LoginPage(page);
  30 |         const inventoryPage = new InventoryPage(page);
  31 | 
  32 |         await loginPage.goto();
  33 |         await loginPage.login('problem_user','secret_sauce');
  34 | 
  35 |         // Добавляем товар 
  36 | 
  37 |         
  38 |         await inventoryPage.addItemToCart('Sauce Labs Backpack');
  39 | 
  40 |         // Ждем обновления UI 
  41 | 
  42 |         await page.waitForTimeout(500);
  43 | 
  44 |         // Проверка бага (счетчик должен пропасть)
  45 | 
  46 |         const badge = page.locator('.shopping_cart_badge');
  47 | 
> 48 |         await expect(badge).not.toBeVisible();
     |                                 ^ Error: expect(locator).not.toBeVisible() failed
  49 | 
  50 |         const screenshot = await page.screenshot();
  51 |         await test.info().attach('cart-badge-bug', {
  52 |             body: screenshot,
  53 |             contentType: 'image/png',
  54 |             description: 'Бейдж всё ещё виден после удаления последнего товара'
  55 |         });
  56 |         
  57 |         console.log('БАГ НАЙДЕН: Бейдж корзины продолжает отображаться после удаления товара');
  58 |     });
  59 | });
```