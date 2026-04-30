// playwright.config.js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    // Где лежат тесты
    testDir: './tests',
    
    // Запускаем тесты параллельно (быстрее)
    fullyParallel: true,
    
    // Отключаем fail fast - хотим увидеть все баги
    forbidOnly: !!process.env.CI,
    
    // Количество попыток при падении
    retries: process.env.CI ? 2 : 0,
    
    // Количество параллельных воркеров
    workers: process.env.CI ? 1 : undefined,
    
    // Репортеры: line - для консоли, allure-playwright - для отчётов
    reporter: [
        ['line'],  // Простой вывод в консоль
        ['allure-playwright', { 
            outputFolder: 'allure-results'  // Папка с результатами для Allure
        }]
    ],
    
    use: {
        // Базовый URL сайта
        baseURL: 'https://www.saucedemo.com',
        
        // Делаем скриншот только при падении теста
        screenshot: 'only-on-failure',
        
        // Сохраняем trace только при первом ретрае
        trace: 'on-first-retry',
        
        // Видео только при падении (наглядно видеть баг)
        video: 'retain-on-failure',
        
        // Таймаут для каждого действия
        actionTimeout: 10000,
    },
    
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});