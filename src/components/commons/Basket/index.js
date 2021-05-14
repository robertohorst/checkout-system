import React, { useEffect } from 'react';
import { BasketItem, Total } from './styles';

const Basket = ({ addedProductsToBasket, setActionAddItem }) => {
  let totalValueAdded = addedProductsToBasket 
    ? addedProductsToBasket.items.reduce( (totalBasketValue, item) => 
        totalBasketValue + (item.quantity * item.price)/100, 0)
    : 0;
  let totalSavingsValue = addedProductsToBasket 
    ? addedProductsToBasket.items.reduce( (totalSavings, item) => 
        totalSavings + item.savings, 0)
    : 0;
  
  setActionAddItem(false); 
  
  return (
    <>
      { addedProductsToBasket && addedProductsToBasket.items.map( item => 
        <BasketItem.Container
          key = { item.id }
        >
          <BasketItem.Title>
            <strong>{ item.quantity } x</strong> { item.name }
          </BasketItem.Title>
          <BasketItem.Price>
            { `£ ${(item.price*item.quantity/100).toFixed(2)}` }
          </BasketItem.Price>
          { item.savings>0 &&
            <BasketItem.Promo>
              { `Promo £ ${ item.savings.toFixed(2) }` }
            </BasketItem.Promo>
          }
        </BasketItem.Container>
      )}
      <Total>
        <p style={{ color: '#333' }}>Total £ { totalValueAdded.toFixed(2)}</p>
        <p style={{ color: '#F00' }}>Discount £ { totalSavingsValue.toFixed(2) }</p> 
        <p style={{ color: '#228B22' }}>Payable £ { (totalValueAdded - totalSavingsValue).toFixed(2) }</p>        
     </Total>
    </>
  );
}

export { Basket };