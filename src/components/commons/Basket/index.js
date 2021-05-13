import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const BasketItem = {
  Container: styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-basis: 50%;
    justify-content: space-between;
    padding: 6px;
    border-bottom: 1px solid #17393a;
  `,
  Title: styled.div`
  text-align: left;
    flex-basis: 50%;
    color: #333;
  `,
  Price: styled.div`
    text-align: right;
    flex-basis: 50%;
  `,
  Promo: styled.div`
    flex-basis: 100%;
    text-align: right;
    color: #F00;
  `,
};

const Total = styled.div`
  padding: 6px;
  font-weight: bold;
  text-align: right;
`;

const Basket = ({ addedProductsToBasket, setActionAddItem }) => {
  let totalValueAdded = addedProductsToBasket 
    ? addedProductsToBasket.reduce( (totalBasketValue, item) => 
        totalBasketValue + (item.quantity * item.price)/100, 0)
    : 0;
  let totalSavingsValue = addedProductsToBasket 
    ? addedProductsToBasket.reduce( (totalSavings, item) => 
        totalSavings + item.savings, 0)
    : 0;

  useEffect(() => {
      setActionAddItem(false);
  }, [addedProductsToBasket]);
  
  return (
    <>
      { addedProductsToBasket && addedProductsToBasket.map( item => 
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
              { `Discount £ ${ item.savings.toFixed(2) }` }
            </BasketItem.Promo>
          }
        </BasketItem.Container>
      )}
      <Total>
        <p>Total £ { totalValueAdded.toFixed(2)}</p>
        <p>Discount £ { totalSavingsValue.toFixed(2) }</p> 
        <p>Payable £ { (totalValueAdded - totalSavingsValue).toFixed(2) }</p>        
     </Total>
    </>
  );
}

export { Basket };