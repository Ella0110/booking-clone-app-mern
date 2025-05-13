import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173";
test("should allow the user to sign in", async ({ page }) => {
    await page.goto(UI_URL);
    // get the sign in button
    await page.getByRole("link", { name: "Sign In" }).click();

    await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
    // 输入 email
    await page.locator("[name=email]").fill("1@1.com");
    await page.locator("[name=password]").fill("11111111");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Sign In Success!")).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
    await expect(page.getByRole("link", { name: "My Booking" })).toBeVisible();
});

test("should allow the user to register", async ({ page }) => {
    const testEmail = `test_register_${
        Math.floor(Math.random() * 9000) + 1000
    }@test.com`;
    await page.goto(UI_URL);
    // get the sign in button
    await page.getByRole("link", { name: "Register" }).click();

    await expect(
        page.getByRole("heading", { name: "Create an Account" })
    ).toBeVisible();
    // 输入 email
    await page.locator("[name=firstname]").fill("1");
    await page.locator("[name=lastname]").fill("1");
    await page.locator("[name=email]").fill(testEmail);
    await page.locator("[name=password]").fill("11111111");
    await page.locator("[name=confirmPassword]").fill("11111111");
    await page.getByRole("button", { name: "Register" }).click();

    await expect(page.getByText("Registration Success!")).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
    await expect(page.getByRole("link", { name: "My Booking" })).toBeVisible();
});
