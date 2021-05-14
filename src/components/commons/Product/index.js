import React from "react";
import { ProductWrapper, Image } from "./styles"
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import fetchProducts from "../../../services/fetchProducts";

// Calculates the discount value per item
function applyPromotion(item, type) {
  let total = 0;
  if(type==='QTY_BASED_PRICE_OVERRIDE'){
    let numberOfCombos = Math.trunc(item.quantity / item.promotion.required_qty);
    total = ((item.price * item.promotion.required_qty) - item.promotion.price) * numberOfCombos;
   } else if(type==='FLAT_PERCENT'){
    total = (item.price * item.quantity * (item.promotion.amount)/100);
  } else if(type==='BUY_X_GET_Y_FREE'){
    total = (item.price * Math.trunc(item.quantity / item.promotion.required_qty));
  }
  return (total/100).toFixed(2);
}

const Product = ({ item, setActionAddItem }) => {
// Functions adds an item to the localStorage of the browser
  async function handleAddItem(item) {
    let jsonArray = {
      items: [],
    };
    let containsValue = false;

    const storedData = localStorage.getItem('__basketItems');

    // If already stored, the values are incremented
    if (storedData) {
      jsonArray = JSON.parse(storedData);

      jsonArray.items.map((jsonItem) => {
        if (jsonItem.name === item.name) {
          containsValue = true;
          jsonItem.quantity = Number(jsonItem.quantity + 1);
          if(jsonItem.promotion)
            jsonItem.savings = Number(applyPromotion(jsonItem, jsonItem.promotion.type));
        }
      });
    }

    // If its the first item, the localStorage is initialized
    if (!containsValue) {

      let newItem = {
        id: item.id,
        quantity: 1,
        name: item.name,
        price: Number(item.price),
        savings: 0,
        promotion: { },
      };

      // Check for promotions
      await fetchProducts.getProduct(item.id)
        .then(result => newItem.promotion = result.promotions[0]);

      if(newItem.promotion)
        newItem.savings = Number(applyPromotion(newItem, newItem.promotion.type));
      jsonArray.items.push(newItem);
    }

    localStorage.setItem(`__basketItems`, JSON.stringify(jsonArray));
    setActionAddItem(true);
  }

  return (
    <ProductWrapper.Container
      key={item.id}
      data-testid="productsList"
    >
      <ProductWrapper.Image>
        <Image src="https://via.placeholder.com/55.png/fff?text=Photo" />
      </ProductWrapper.Image>
      <ProductWrapper.Title>
        {item.name}
      </ProductWrapper.Title>
      <ProductWrapper.Add>
        <Link  href="">
          <a onClick={() => handleAddItem(item)} title="Add item">
            <FeatherIcon icon="plus-circle" size="20" color="#222" />
          </a>
        </Link>
      </ProductWrapper.Add>
      <ProductWrapper.Price>
        £ {item.price / 100}
      </ProductWrapper.Price>
    </ProductWrapper.Container>
  );
};

export { Product };
