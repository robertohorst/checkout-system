import { render, cleanup } from "@testing-library/react";
import { Basket } from ".";

const myMockAddItem = jest.fn();

afterEach(cleanup);

describe("List items in the basket", () => {
  test("2 products with diferent promotions and final value is right", () => {
      const { getByText } = render(
        <Basket addedProductsToBasket = {
          ({
            "items":[
               {
                  "id":"PWWe3w1SDU",
                  "quantity":2,
                  "name":"Amazing Burger!",
                  "price":999,
                  "savings":9.99,
                  "promotion":{
                     "id":"ZRAwbsO2qM",
                     "type":"BUY_X_GET_Y_FREE",
                     "required_qty":2,
                     "free_qty":1
                  }
               },
               {
                  "id":"C8GDyLrHJb",
                  "quantity":1,
                  "name":"Amazing Salad!",
                  "price":499,
                  "savings":0.5,
                  "promotion":{
                     "id":"Gm1piPn7Fg",
                     "type":"FLAT_PERCENT",
                     "amount":10
                  }
               }
            ]
          })
        }
        setActionAddItem = {myMockAddItem}
        />
  );

    expect(getByText(/Total £/i).textContent).toBe("Total £ 24.97");

    expect(getByText(/Discount £/i).textContent).toBe("Discount £ 10.49");

    expect(getByText(/Payable £/i).textContent).toBe("Payable £ 14.48");
  });
});

describe("Test if sum of itens are wrong", () => {
  describe("discount is 0", () => {
    test("1 product with no promotions", () => {
          const { getByText } = render(
        <Basket addedProductsToBasket = 
          {
            (
              {
              "items":[
                {
                    "id":"PWWe3w1SDU",
                    "quantity": 2,
                    "name":"Amazing Burger!",
                    "price": 999,
                    "savings": 0,
                }
              ]
              }
            )
          }
          setActionAddItem = {myMockAddItem}
        />
      );

      expect(getByText(/Total £/i).textContent).toBe("Total £ 19.98");

      expect(getByText(/Discount £/i).textContent).not.toBe("Discount £ 1.00");

      expect(getByText(/Payable £/i).textContent).not.toBe("Payable £ 18.98");
    });
  });
});
