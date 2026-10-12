const { test, expect } = require('@playwright/test');

test('visitor can open the portfolio and navigate to experience', async ({
  page,
}) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Who am I?' })).toBeVisible();

  await page.getByRole('link', { name: 'Experience' }).click();

  await expect(page.getByRole('heading', { name: 'Experience' })).toBeVisible();
  await expect(page.getByText(/Senior UI Developer, Pearson/)).toBeVisible();
});
