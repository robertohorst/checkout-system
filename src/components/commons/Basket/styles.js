import styled from 'styled-components';

export const BasketItem = {
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

export const Total = styled.div`
  padding: 6px;
  font-weight: 600;
  text-align: right;
`;