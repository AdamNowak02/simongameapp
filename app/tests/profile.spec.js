test('should redirect to login page if user is not logged in', async ({ page }) => {
    // Przejdź na stronę profilu użytkownika
    await page.goto('http://localhost:3000/user/profile');
  
    // Sprawdź, czy zostałeś przekierowany na stronę logowania
    await page.waitForURL('http://localhost:3000/user/signin');
    
    // Sprawdź, czy na stronie logowania znajduje się odpowiedni nagłówek
    await expect(page.locator('h1')).toContainText('Login to app');
  });
  