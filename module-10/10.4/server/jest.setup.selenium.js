// setup file initializes the Selenium WebDriver and other necessary configurations before running the tests

import { Builder } from 'selenium-webdriver';
import 'chromedriver';

global.driver = new Builder().forBrowser('chrome').build();

afterAll(async () => {
  await global.driver.quit();
});