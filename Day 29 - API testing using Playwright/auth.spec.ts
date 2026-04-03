import { test, expect, request } from "@playwright/test";
test("Login", async ({ request }) => {
  let res = await request.post(
    "https://www.shoppersstack.com/shopping/users/login",
    {
      data: {
         "email": "testinguser12@gmail.com",
         "password": "12345678",
         "role": "SHOPPER"
      },
      ignoreHTTPSErrors: true,
    },
  );
  let resData = await res.json();
  let token = resData.data.jwtToken;

   let res2= await request.get(
    "https://www.shoppersstack.com/shopping/products/alpha",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      ignoreHTTPSErrors:true
    },
  );
  let products=await res2.json()
  console.log(products);
});