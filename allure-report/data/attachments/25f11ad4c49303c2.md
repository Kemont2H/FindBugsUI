# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: bug5-sorting.spec.js >> Bug #5: Sorting malfunction >> Problem user should see correctly sorted items (Z to A)
- Location: tests\bug5-sorting.spec.js:14:5

# Error details

```
ReferenceError: allure is not defined
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');  // ← добавили expect
  2  | const { LoginPage } = require('../pages/LoginPage');
  3  | const { InventoryPage } = require('../pages/InventoryPage');
  4  | 
  5  | /**
  6  |  * ТЕСТ #5: Поиск бага с сортировкой
  7  |  * 
  8  |  * БАГ: Сортировка "Name (Z to A)" работает некорректно для problem_user
  9  |  * 
  10 |  * Ожидаемое поведение: Товары сортируются в обратном алфавитном порядке
  11 |  * Фактическое поведение: Порядок товаров не меняется или меняется неправильно
  12 |  */
  13 | test.describe('Bug #5: Sorting malfunction', () => {
  14 |     test('Problem user should see correctly sorted items (Z to A)', async ({ page }) => {
> 15 |         allure.feature('Sorting');
     |         ^ ReferenceError: allure is not defined
  16 |         allure.story('Product sorting');
  17 |         allure.severity('normal');
  18 |         allure.tag('bug','sorting','ui');
  19 |         allure.description(`
  20 |             Given я на странице каталога как problem_user
  21 |             When выбираю сортировку "Name (Z to A)"
  22 |             Then товары должны отобразиться в обратном алфавитном порядке
  23 |             BUT порядок товаров остаётся как при сортировке A to Z
  24 |         `);
  25 | 
  26 |         const loginPage = new LoginPage(page);
  27 |         const inventoryPage = new InventoryPage(page);
  28 | 
  29 |         await loginPage.goto();
  30 |         await loginPage.login('problem_user', 'secret_sauce');
  31 |         await inventoryPage.waitForInventoryLoaded();
  32 | 
  33 | 
  34 |         // Сортируем от а до я
  35 | 
  36 |         await inventoryPage.sortBy('za');
  37 | 
  38 |         // Получаем список названий
  39 | 
  40 |         const itemNames = await inventoryPage.getItemNames();
  41 | 
  42 |         // Создаем ожидаемый отсортированный список
  43 | 
  44 |         const expectedSorted = [...itemNames].sort().reverse();
  45 | 
  46 |         // Прикрепляем оба списка к отчету
  47 | 
  48 |         await test.info().attach('actual-order', {
  49 |             body: `Фактический порядок ${itemNames}.join(', ')}`,
  50 |             contentType: 'text/plain'
  51 |         });
  52 | 
  53 |         await test.info().attach('expected-order', {
  54 |             body: `Ожидаемый порядок ${expectedSorted}.join(', ')}`,
  55 |             contentType: 'text/plain'
  56 |         });
  57 | 
  58 |         // Ожидаем, что порядок соответствует обратному алфавитному
  59 |         // ТЕСТ УПАДЁТ для problem_user
  60 |         expect(itemNames).toEqual(expectedSorted);
  61 | 
  62 |         const screenshot = await page.screenshot();
  63 |         await test.info().attach('sorting-bug', {
  64 |             body: screenshot,
  65 |             contentType: 'image/png',
  66 |             description:'Сортировка Z→A не изменила порядок товаров'
  67 |         });
  68 | 
  69 |         console.log('БАГ НАЙДЕН: Сортировка работает некорректно для problem_user');
  70 |     });
  71 | });
```