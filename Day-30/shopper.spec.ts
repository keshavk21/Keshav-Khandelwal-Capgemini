import { test, expect } from '@playwright/test';

let token: string;

test.beforeAll(async ({ request }) => {
    const res = await request.post(
        "https://www.shoppersstack.com/shopping/users/login",
        {
            data: {
                email: "keshav123@gmail.com",
                password: "Keshav",
                role: "SHOPPER" 
            }, ignoreHTTPSErrors: true
        }
    );

    console.log("Login Status:", res.status());

    const body = await res.json();
    console.log("Login Response:", JSON.stringify(body, null, 2));

    // 🔍 Flexible token extraction (handles different API structures)
    token =
        body?.data?.token ||
        body?.data?.user?.token ||
        body?.token;

    if (!token) {
        throw new Error("❌ Token not found. Check login response above.");
    }

    console.log("✅ Token:", token);
});

test('Get products using token', async ({ request }) => {
    console.log("Using Token:", token);

    const res = await request.get(
        "https://www.shoppersstack.com/shopping/products/alpha",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    console.log("Products Status:", res.status());

    const body = await res.json();
    console.log("Products Response:", JSON.stringify(body, null, 2));

    expect(res.status()).toBe(200);
});