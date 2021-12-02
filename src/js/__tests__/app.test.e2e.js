import puppetteer from 'puppeteer';

jest.setTimeout(30000); // default puppeteer timeout
describe('test buttons', () => {
  let browser = null;
  // eslint-disable-next-line no-unused-vars
  let page = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    browser = await puppetteer.launch(
      {
        headless: true, // show gui
        slowMo: 300,
        devtools: true, // show devTools
      },
    );
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('should click on button with left tooltip and get it', async () => {
    await page.goto(baseUrl);
    const buttons = await page.$('button[data-position=left]');
    await buttons.click();
    const popover = await page.$('.popover[data-position=left]');
    expect(popover)
      .toBeDefined();
  });

  test('should click on button with right tooltip and get it', async () => {
    await page.goto(baseUrl);
    const buttons = await page.$('button[data-position=right]');
    await buttons.click();
    const popover = await page.$('.popover[data-position=right]');
    expect(popover)
      .toBeDefined();
  });

  test('should click on button with top tooltip and get it', async () => {
    await page.goto(baseUrl);
    const buttons = await page.$('button[data-position=top]');
    await buttons.click();
    const popover = await page.$('.popover[data-position=top]');
    expect(popover)
      .toBeDefined();
  });

  test('should click on button with bottom tooltip and get it', async () => {
    await page.goto(baseUrl);
    const buttons = await page.$('button[data-position=bottom]');
    await buttons.click();
    const popover = await page.$('.popover[data-position=bottom]');
    expect(popover)
      .toBeDefined();
  });
});
