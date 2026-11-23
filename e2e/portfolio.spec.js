const { test, expect } = require('@playwright/test');

async function openPortfolio(page, path = '/') {
  await page.goto(path);

  const declineButton = page.getByRole('button', { name: 'Decline' });
  if (await declineButton.isVisible()) {
    await declineButton.click();
  }
}

test.describe('Portfolio application', () => {
  test('loads profile content and sidebar interactions', async ({ page }) => {
    await openPortfolio(page);

    await expect(page.getByRole('heading', { name: 'Who am I?' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Madhukar Ganga' })).toBeVisible();
    await expect(page.getByRole('img', { name: 'cover' })).toBeVisible();

    await page.getByText('About Me', { exact: true }).click();
    await expect(page.getByText(/I specialize in React and modern frontend architecture/)).toBeVisible();

    await expect(page.getByRole('link', { name: 'Download resume as DOCX' })).toBeVisible();
  });

  test('navigates all primary routes', async ({ page }) => {
    await openPortfolio(page);

    await page.getByRole('link', { name: 'Services', exact: true }).click();
    await expect(page).toHaveURL(/\/services$/);
    await expect(page.getByRole('heading', { name: 'Services' })).toBeVisible();

    await page.getByRole('link', { name: 'Portfolio', exact: true }).click();
    await expect(page).toHaveURL(/\/portfolio$/);
    await expect(page.getByRole('heading', { name: 'Featured work' })).toBeVisible();

    await page.getByRole('link', { name: 'Education', exact: true }).click();
    await expect(page).toHaveURL(/\/qualification$/);
    await expect(page.getByRole('img', { name: 'Bachelors. institution' })).toBeVisible();
    await expect(page.getByRole('img', { name: 'Masters. institution' })).toBeVisible();

    await page.getByRole('link', { name: 'Contact', exact: true }).click();
    await expect(page).toHaveURL(/\/contact$/);
    await expect(page.getByRole('heading', { name: 'Get in Touch' })).toBeVisible();

    await page.getByRole('link', { name: 'Info', exact: true }).click();
    await expect(page).toHaveURL(/\/group$/);
    await expect(page.getByText('984-377-1236', { exact: true }).first()).toBeVisible();
  });

  test('filters services and opens portfolio experience details', async ({ page }) => {
    await openPortfolio(page, '/services');

    await page.getByRole('button', { name: 'React', exact: true }).click();
    await expect(page.getByText('Showing 2 services')).toBeAttached();
    await expect(page.getByRole('heading', { name: 'React Template' })).toBeVisible();

    await openPortfolio(page, '/portfolio');
    await page.getByText('Senior UI Developer, Pearson, Hybrid, Durham, NC (Oct 2024 – Present)').click();
    await expect(page.getByText(/Built secure auth flows with React\.js and TypeScript/)).toBeVisible();

    await page.getByRole('button', { name: 'Authentication', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Enterprise Authentication Platform' })).toBeVisible();
  });

  test('validates contact form fields without submitting to EmailJS', async ({ page }) => {
    await openPortfolio(page, '/contact');

    await page.getByLabel('Name').fill('Playwright Visitor');
    await page.getByLabel('Email').fill('visitor@example.com');
    await page.getByLabel('Subject').fill('E2E test');
    await page.getByLabel('Message').fill('Testing the contact form.');

    await page.getByRole('button', { name: /Send message/ }).click();

    await expect(page.getByText(/Please enter a phone number with a valid length/)).toBeVisible();
  });

  test('switches between light and dark themes and persists the choice', async ({
    page,
  }) => {
    await openPortfolio(page);

    await page.getByRole('button', { name: /Switch to (dark|light) theme/ }).click();

    const selectedTheme = await page
      .locator('html')
      .getAttribute('data-theme');
    expect(['light', 'dark']).toContain(selectedTheme);
    await expect(page.locator('html')).toHaveAttribute('data-theme', selectedTheme);

    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', selectedTheme);
  });

  test('opens and uses the portfolio chatbot', async ({ page }) => {
    await openPortfolio(page);

    await page.getByRole('button', { name: 'Open chat' }).click();
    await expect(page.getByRole('dialog', { name: 'Portfolio chatbot' })).toBeVisible();

    await page.getByPlaceholder('Ask anything like ChatGPT…').fill('hello');
    await page.getByRole('button', { name: 'Send' }).click();

    await expect(page.getByText(/Hi! I'm Madhukar's assistant/)).toBeVisible();
  });

  test('shows a not-found page for unknown routes', async ({ page }) => {
    await openPortfolio(page, '/unknown-e2e-route');

    await expect(page).toHaveTitle('Page not found | Madhukar Ganga');
    await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Return to About' })).toBeVisible();
  });
});
