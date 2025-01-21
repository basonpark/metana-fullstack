import { By, until } from 'selenium-webdriver';
import '../../jest.setup.selenium.js';

describe('Login Process', () => {
    it('should open the portfolio and login', async () => {
        //define email to use in test
        const email = 'test@test.com';
        const password = 'password';

        //navigate to the portfolio
        await global.driver.get('http://localhost:3000');

        //click on login button
        console.log('Clicking on login button');
        const loginButton = await global.driver.findElement(
            By.xpath('//*[@id="navigation"]/a[7]')
        );
        await loginButton.click();

        //enter username
        console.log('Entering username');
        const usernameInput = await global.driver.findElement(
            By.xpath('//*[@id="username"]')
        );
        await usernameInput.sendKeys(email);

        //enter password
        console.log('Entering password');
        const passwordInput = await global.driver.findElement(
            By.xpath('//*[@id="password"]')
        );
        await passwordInput.sendKeys(password);

        // Click the sign-in button
        console.log('--- Clicking sign-in button ---');
        const signInButton = await global.driver.findElement(
        By.xpath('//*[@id="login"]/div[3]/button')
        );
        await signInButton.click();

        // Wait for the 'Logged in' message to appear
        console.log('--- Verifying logged-in message ---');
        const statusText = await global.driver.wait(
        until.elementLocated(By.xpath('//*[@id="wrapper"]/div[2]/h1')),
        10000 // Wait up to 10 seconds
        );

        // Verify the 'Logged in' message contains the correct email
        console.log('--- Verifying logged-in message contains the correct email ---');
        const text = await statusText.getText();
        expect(text).toBe(`You are logged in as ${email}.`);
    });
});