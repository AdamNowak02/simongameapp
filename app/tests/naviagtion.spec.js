const { test, expect } = require('@playwright/test');

test('has link to login page', async ({ page }) => {
  await page.goto('http://localhost:3000/'); // Wejdź na stronę główną aplikacji
  // Symulacja kliknięcia na link z tekstem 'login', przejście do strony logowania
  await page.click("text=login");
  // Sprawdzenie, czy została otwarta strona ze ścieżką do formularza logowania
  expect(page).toHaveURL('http://localhost:3000/users/login'); 
  // Sprawdzenie, czy na stronie logowania jest nagłówek z tekstem 'Login to app'
  await expect(page.locator('h1')).toContainText('Login to app');
});
