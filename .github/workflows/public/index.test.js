import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('UI Tests for Product Showcase', () => {
  let browser;
  let page;

  beforeAll(async () => {
    // Launch a headless browser
    browser = await puppeteer.launch();
    page = await browser.newPage();

    // Construct the file path to the HTML file
    const filePath = path.join(__dirname, '/index.html');

    await page.goto(`file://${filePath}`, {
      waitUntil: 'networkidle0',
    });
  });

  afterAll(async () => {
    // Close the browser after tests
    await browser.close();
  });

  // Test 1: Check if the header title is correct
  test('Header title should be "Product Showcase"', async () => {
    const title = await page.$eval('header h1', (el) => el.textContent);
    expect(title).toBe('Product Showcase');
  });

  // Test 2: Check if the navigation menu has 3 links
  test('Navigation menu should have 3 links', async () => {
    const links = await page.$$eval('header nav a', (elements) =>
      elements.map((el) => el.textContent)
    );
    expect(links.length).toBe(3);
    expect(links).toEqual(['Home', 'About', 'Contact']);
  });

  // Test 3: Check if the correct number of products are rendered
  test('Should render 30 products', async () => {
    await page.waitForSelector('.product-card'); // Wait for products to load
    const products = await page.$$('.product-card');
    expect(products.length).toBe(30); // Assuming the API returns 30 products
  });

  // Test 4: Check if the footer content is correct
  test('Footer should contain copyright text', async () => {
    const footerText = await page.$eval('footer p', (el) => el.textContent);
    expect(footerText).toContain('© 2025 Product Showcase. All rights reserved.');
  });
});