import { test, expect } from "@playwright/test";

test.describe("api tests", () => {
  test.describe.configure({ mode: "serial" });
  test.use({ ignoreHTTPSErrors: true });

  const BASE_URL = "https://www.shoppersstack.com/shopping";

  let token: string;
  let shopperId: number;
  let product1: number;
  let product2: number;
  let addressId: number;
  let itemId: number;
  let orderId: number;
  let reviewId: number;

  const authHeaders = () => ({
    Authorization: `Bearer ${token}`,
  });

  test.skip("create account", async ({ request }) => {
    const response = await request.post(`${BASE_URL}/shoppers`, {
      headers: { "Content-Type": "application/json" },
      data: {
        city: "Jaipur",
        country: "India",
        email: "keshav123@gmail.com",
        firstName: "Keshav",
        gender: "MALE",
        lastName: "Khandelwal",
        password: "Keshav",
        phone: 7999809462,
        state: "Rajasthan",
      },
    });

    expect([200, 201]).toContain(response.status());
  });

  test("login", async ({ request }) => {
    const response = await request.post(`${BASE_URL}/users/login`, {
      headers: { "Content-Type": "application/json" },
      data: {
        email: "keshav123@gmail.com",
        password: "Keshav",
        role: "SHOPPER",
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    token = body.data.jwtToken;
    shopperId = body.data.userId;
    console.log(shopperId);

  });

  test("get products", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/products/alpha`, {
      headers: authHeaders(),
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    product1 = body.data[0].productId;
    product2 = body.data[2].productId;
    console.log("Got Product IDs");
    console.log(product1);
    console.log(product2);


  });

  test("add to cart", async ({ request }) => {
    const response = await request.post(
      `${BASE_URL}/shoppers/${shopperId}/carts`,
      {
        headers: authHeaders(),
        data: { productId: product1, quantity: 5 },
      }
    );

    expect([200, 201, 409]).toContain(response.status());
  });

  test("get cart", async ({ request }) => {
    const response = await request.get(
      `${BASE_URL}/shoppers/${shopperId}/carts`,
      { headers: authHeaders() }
    );

    expect(response.status()).toBe(200);
  });

  test("add to wishlist", async ({ request }) => {
    const response = await request.post(
      `${BASE_URL}/shoppers/${shopperId}/wishlist`,
      {
        headers: authHeaders(),
        data: { productId: product1, quantity: 2 },
      }
    );

    expect([200, 201, 409]).toContain(response.status());
  });

  test("add address", async ({ request }) => {
    const response = await request.post(
      `${BASE_URL}/shoppers/${shopperId}/address`,
      {
        headers: authHeaders(),
        data: {
          buildingInfo: "Flat 302",
          city: "Thane",
          country: "India",
          landmark: "Near Metro",
          name: "Keshav Khandelwal",
          phone: "7999809462",
          pincode: "432101",
          state: "Maharashtra",
          streetInfo: "Amrapali Marg",
          type: "Home",
        },
      }
    );

    expect([200, 201]).toContain(response.status());

    const body = await response.json();
    addressId = body.data.addressId;
    console.log(addressId);

  });

  test("place order", async ({ request }) => {
    const response = await request.post(
      `${BASE_URL}/shoppers/${shopperId}/orders`,
      {
        headers: authHeaders(),
        data: {
          address: {
            addressId,
            buildingInfo: "Flat 302",
            city: "Thane",
            country: "India",
            landmark: "Near Metro",
            name: "Keshav Khandelwal",
            phone: "7999809462",
            pincode: "432101",
            state: "Maharashtra",
            streetInfo: "Amrapali Marg",
            type: "Home",
          },
          paymentMode: "COD",
        },
      }
    );

    expect([200, 201]).toContain(response.status());

    const body = await response.json();
    orderId = body.data.orderId;
    console.log("Order Placed Scucessfully with orderID :");
    console.log(orderId);


  });

  test("re add cart", async ({ request }) => {
    const response = await request.post(
      `${BASE_URL}/shoppers/${shopperId}/carts`,
      {
        headers: authHeaders(),
        data: { productId: product1, quantity: 3 },
      }
    );

    expect([200, 201, 409]).toContain(response.status());
  });

  test("get cart item", async ({ request }) => {
    const response = await request.get(
      `${BASE_URL}/shoppers/${shopperId}/carts`,
      { headers: authHeaders() }
    );

    expect(response.status()).toBe(200);

    const body = await response.json();
    itemId = body.data[0].itemId;
  });

  test("add second product", async ({ request }) => {
    const response = await request.post(
      `${BASE_URL}/shoppers/${shopperId}/carts`,
      {
        headers: authHeaders(),
        data: { productId: product2, quantity: 5 },
      }
    );

    expect([200, 201, 409]).toContain(response.status());
  });

  test("update cart", async ({ request }) => {
    const response = await request.put(
      `${BASE_URL}/shoppers/${shopperId}/carts/${itemId}`,
      {
        headers: authHeaders(),
        data: { productId: product1, quantity: 2 },
      }
    );

    expect([200, 201]).toContain(response.status());
  });

  test.skip("delete cart item", async ({ request }) => {
    const response = await request.delete(
      `${BASE_URL}/shoppers/${shopperId}/carts/${product1}`,
      { headers: authHeaders() }
    );

    expect([200, 201]).toContain(response.status());
  });

  test("deliver order", async ({ request }) => {
    const response = await request.patch(
      `${BASE_URL}/shoppers/${shopperId}/orders/${orderId}?status=DELIVERED`,
      { headers: authHeaders() }
    );

    expect([200, 201]).toContain(response.status());
  });

  test("add review", async ({ request }) => {
    const response = await request.post(
      `${BASE_URL}/reviews?productId=${product2}`,
      {
        headers: authHeaders(),
        data: {
          dateTime: "2026-03-28T12:15:00",
          description: "good product",
          heading: "nice",
          rating: 5,
          shopperId,
          shopperName: "Keshav Khandelwal",
        },
      }
    );

    expect([200, 201]).toContain(response.status());

    const body = await response.json();
    reviewId = body.data.reviewId;
    console.log("Review Added with ID :");
    console.log(reviewId);


  });

  test("get reviews", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/reviews/${product2}`, {
      headers: authHeaders(),
    });

    expect(response.status()).toBe(200);
  });

  test("update review", async ({ request }) => {
    const response = await request.put(
      `${BASE_URL}/reviews/${reviewId}?productId=${product2}`,
      {
        headers: authHeaders(),
        data: {
          dateTime: "2026-03-28T13:30:00Z",
          description: "updated review",
          heading: "ok",
          rating: 4,
          shopperId,
          shopperName: "Keshav Khandelwal",
        },
      }
    );

    expect([200, 201]).toContain(response.status());
  });
});