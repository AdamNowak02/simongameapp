const { test, expect } = require('@playwright/test');

test('should redirect to profile page after login', async ({ page }) => {
  // Przejdź na stronę logowania
  await page.goto('http://localhost:3000/user/signin');

  // Wypełnij formularz logowania
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', 'password123');
  
  // Kliknij przycisk logowania
  await page.click('button[type="submit"]');
  
  // Poczekaj na przekierowanie do strony profilu
  await page.waitForURL('http://localhost:3000/user/profile');
  
  // Sprawdź, czy na stronie profilu znajduje się odpowiedni nagłówek
  await expect(page.locator('h1')).toContainText('Profile');
});
