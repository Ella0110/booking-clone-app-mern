import { test, expect } from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:5173";
test.beforeEach(async ({ page }) => {
    await page.goto(UI_URL);
    // get the sign in button
    await page.getByRole("link", { name: "Sign In" }).click();

    await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
    // 输入 email
    await page.locator("[name=email]").fill("1@1.com");
    await page.locator("[name=password]").fill("11111111");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Sign In Success!")).toBeVisible();
});

test("should alow user to add a hotel", async ({ page }) => {
    await page.goto(`${UI_URL}/add-hotel`);

    // 验证确实是那个表单
    await expect(
        page.getByRole("heading", { name: "Add Hotel" })
    ).toBeVisible();

    // 输入表单内容
    await page.locator("[name=name]").fill("Test Hotel");
    await page.locator("[name=city]").fill("Test City");
    await page.locator("[name=country]").fill("Test Country");
    await page.locator("[name=description]").fill("Test Description");
    await page.locator("[name=pricePerNight]").fill("100");
    await page.selectOption("select[name=starRating]", "3"); // 下拉框
    await page.getByText("Budget").click(); // 单选按钮
    await page.getByLabel("Outdoor Pool").check(); // 多选框
    await page.getByLabel("Fitness Center").check(); // 多选框
    await page.locator("[name=adultCount]").fill("2");
    await page.locator("[name=childCount]").fill("192");

    // 上传图片
    await page.setInputFiles("[name=imageFiles]", [
        path.join(__dirname, "files", "1.png"),
        path.join(__dirname, "files", "2.png"),
    ]);

    await page.getByRole("button", { name: "Save" }).click(); // 点击 save
    await expect(page.getByText("Hotel Saved!")).toBeVisible(); // 验证写入数据库成功
});

test("should display hotels", async ({ page }) => {
    await page.goto(`${UI_URL}/my-hotels`);
    await expect(page.getByText("Galway Getaways").first()).toBeVisible();
    // await expect(page.getByText("Lorem ipsum dolor sit amet")).toBeVisible();
    await expect(page.getByText("Galway, Ireland").first()).toBeVisible();
    await expect(page.getByText("Hiking Resort").first()).toBeVisible();
    await expect(page.getByText("£85 per night").first()).toBeVisible();
    await expect(page.getByText("2 adults, 1 children").first()).toBeVisible();
    await expect(page.getByText("3 Star Rating").first()).toBeVisible();

    await expect(
        page.getByRole("link", { name: "View Details" }).first()
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
});

test("should edit hotel", async ({ page }) => {
    await page.goto(`${UI_URL}/my-hotels`);

    await page.getByRole("link", { name: "View Details" }).first().click();

    await page.waitForSelector('[name="name"]', { state: "attached" }); //为了让他加载页面，等待
    await expect(page.locator('[name="name"]')).toHaveValue("Galway Getaway");
    await page.locator('[name="name"]').fill("Galway Getaway UPDATED");
    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.getByText("Hotel Saved!")).toBeVisible();

    await page.reload();

    await page.getByRole("link", { name: "View Details" }).first().click();

    await page.waitForSelector('[name="name"]', { state: "attached" }); //为了让他加载页面，等待
    await expect(page.locator('[name="name"]')).toHaveValue(
        "Galway Getaway UPDATED"
    );
    await page.locator('[name="name"]').fill("Galway Getaway");
    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.getByText("Hotel Saved!")).toBeVisible();
});
