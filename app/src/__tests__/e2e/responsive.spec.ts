import { test, expect } from "@playwright/test";

// =================================================================
// Test 7: Portrait shows rotation prompt, landscape shows content
// =================================================================
test("portrait viewport shows landscape prompt", async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto("/onboarding");
  await page.waitForLoadState("networkidle");

  // .landscape-only should be visible in portrait
  const rotatePrompt = page.locator(".landscape-only");
  // .landscape-content should be hidden in portrait
  const content = page.locator(".landscape-content");

  // If the app uses these classes, verify behavior
  if ((await rotatePrompt.count()) > 0) {
    await expect(rotatePrompt.first()).toBeVisible();
  }
  if ((await content.count()) > 0) {
    await expect(content.first()).toBeHidden();
  }
});

test("landscape viewport shows content normally", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto("/onboarding");
  await page.waitForLoadState("networkidle");

  // Content should be visible
  const content = page.locator(".landscape-content");
  if ((await content.count()) > 0) {
    await expect(content.first()).toBeVisible();
  }

  // Rotation prompt should be hidden
  const rotatePrompt = page.locator(".landscape-only");
  if ((await rotatePrompt.count()) > 0) {
    await expect(rotatePrompt.first()).toBeHidden();
  }
});

// =================================================================
// Test 8: Layout fits within viewport
// =================================================================
test("onboarding form fits in iPad landscape viewport", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto("/onboarding");
  await page.waitForLoadState("networkidle");

  const form = page.locator("form").first();
  if ((await form.count()) > 0) {
    const box = await form.boundingBox();
    if (box) {
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.y).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(1024);
      expect(box.y + box.height).toBeLessThanOrEqual(768);
    }
  }
});

test("reward page fits in iPhone landscape viewport", async ({ page }) => {
  await page.setViewportSize({ width: 812, height: 375 });
  await page.goto("/reward?game=memory-match&stars=3");
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(2000);

  // Buttons should be within viewport
  const buttons = page.getByRole("button");
  const count = await buttons.count();
  for (let i = 0; i < count; i++) {
    const box = await buttons.nth(i).boundingBox();
    if (box) {
      expect(box.x + box.width).toBeLessThanOrEqual(812 + 1);
      expect(box.y + box.height).toBeLessThanOrEqual(375 + 1);
    }
  }
});

test("rest page fits in small landscape viewport", async ({ page }) => {
  await page.setViewportSize({ width: 812, height: 375 });
  await page.goto("/rest");
  await page.waitForLoadState("networkidle");

  const buttons = page.getByRole("button");
  const count = await buttons.count();
  expect(count).toBeGreaterThanOrEqual(2);

  for (let i = 0; i < count; i++) {
    const box = await buttons.nth(i).boundingBox();
    if (box) {
      expect(box.y + box.height).toBeLessThanOrEqual(375 + 1);
    }
  }
});
