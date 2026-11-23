const { test, expect } = require('@playwright/test');

test('visitor can open the portfolio and navigate to experience', async ({
  page,
}) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Decline' }).click();
  await expect(page.getByRole('heading', { name: 'Who am I?' })).toBeVisible();

  await page.getByRole('link', { name: 'Portfolio' }).click();

  await expect(page.getByRole('heading', { name: 'Experience' })).toBeVisible();
  await page
    .getByText(/Senior UI Developer, Pearson/)
    .click();
  await expect(page.getByText(/Senior UI Developer, Pearson/)).toBeVisible();
});
