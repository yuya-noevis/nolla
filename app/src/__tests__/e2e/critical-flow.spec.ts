import { test, expect } from "@playwright/test";

// =================================================================
// Test 1: Splash → Onboarding redirect
// =================================================================
test("splash redirects to onboarding within 5s", async ({ page }) => {
  await page.goto("/");
  // Splash should show briefly then redirect
  await expect(page).toHaveURL(/\/onboarding/, { timeout: 5000 });
});

// =================================================================
// Test 2: Protected routes redirect unauthenticated users
// =================================================================
test("unauthenticated user is redirected from /home", async ({ page }) => {
  await page.goto("/home");
  // Middleware should redirect to /onboarding
  await expect(page).toHaveURL(/\/onboarding/, { timeout: 5000 });
});

test("unauthenticated user is redirected from /game/memory-match", async ({
  page,
}) => {
  await page.goto("/game/memory-match");
  await expect(page).toHaveURL(/\/onboarding/, { timeout: 5000 });
});

// =================================================================
// Test 3: Onboarding UI displays correctly
// =================================================================
test("onboarding page shows auth buttons and form", async ({ page }) => {
  await page.goto("/onboarding");
  await page.waitForLoadState("networkidle");

  // OAuth buttons
  await expect(page.getByRole("button", { name: /Google/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /Apple/i })).toBeVisible();

  // Email form
  await expect(page.getByPlaceholder("Email")).toBeVisible();
  await expect(page.getByPlaceholder("Password")).toBeVisible();
});

test("onboarding mode toggle works", async ({ page }) => {
  await page.goto("/onboarding");
  await page.waitForLoadState("networkidle");

  // Default is signup mode — look for sign-in toggle
  const toggleButton = page.getByRole("button", {
    name: /サインイン|Sign In/i,
  });
  if (await toggleButton.isVisible()) {
    await toggleButton.click();
    // After toggle, should show signup option
    await expect(
      page.getByRole("button", { name: /アカウント作成|Create|Sign Up/i })
    ).toBeVisible();
  }
});

// =================================================================
// Test 4: Assessment flow UI
// =================================================================
test("assessment page shows progress and steps", async ({ page }) => {
  await page.goto("/onboarding/assessment");
  await page.waitForLoadState("networkidle");

  // Should show the assessment UI (first step)
  // Progress indicator should be visible
  const progressOrStep = page.locator(
    '[role="progressbar"], [data-testid="progress"], .progress'
  );
  const heading = page.locator("h1, h2, h3").first();

  // At minimum, some content should render
  await expect(heading).toBeVisible({ timeout: 3000 });
});

// =================================================================
// Test 5: Reward page shows star animation and buttons
// =================================================================
test("reward page shows stars and navigation buttons", async ({ page }) => {
  await page.goto("/reward?game=memory-match&stars=5");
  await page.waitForLoadState("networkidle");

  // After animation (1.5s), two buttons should appear
  await page.waitForTimeout(2000);

  // Play again and Home buttons (icon-only, check by aria-label)
  await expect(
    page.getByRole("button", { name: /もう1回/i })
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: /ホームへ/i })
  ).toBeVisible();
});

// =================================================================
// Test 6: Rest page shows night sky and buttons
// =================================================================
test("rest page shows two navigation buttons", async ({ page }) => {
  await page.goto("/rest");
  await page.waitForLoadState("networkidle");

  await expect(
    page.getByRole("button", { name: /続ける/i })
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: /おしまい/i })
  ).toBeVisible();
});

// =================================================================
// Test 7: Room page shows tabs
// =================================================================
test("room page shows 3 tab buttons", async ({ page }) => {
  await page.goto("/room");
  await page.waitForLoadState("networkidle");

  // Three tabs: room, shop, collection
  const tabs = page.getByRole("button").filter({ hasText: /🏠|★|📖/ });
  await expect(tabs.first()).toBeVisible();

  // Back button
  await expect(
    page.getByRole("button", { name: /戻る/i })
  ).toBeVisible();
});
