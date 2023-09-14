import { test, expect } from "@playwright/test";

test("user searches books for Harry Potter", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Search for books/);
  await expect(page.getByText("Search for books")).toBeVisible();

  await page.locator("css=#search-input").fill("Harry Potter phoenix");
  await page.locator("css=button[type=submit]").click();

  await expect(
    page.locator("text=Harry Potter and the Order of the Phoenix >> nth=0")
  ).toBeVisible();
});
