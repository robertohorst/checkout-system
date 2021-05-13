import { useEffect, useState } from "react";
import styled from "styled-components";
import { Basket } from "../src/components/commons/Basket";
import { Product } from "../src/components/commons/Product";

const Box = styled.div`
  background-color: #f1faee;
  height: 100vh;
`;

const Grid = {
  Container: styled.div`
    display: flex;
    justify-content: space-between;
    padding: 40px;
  `,
  Left: styled.div`
    display: flex;
    flex-direction: column;
    align-self: stretch;
  `,
  Right: styled.div`
    text-align: center;
    background-color: #d4e4ed;
    width: 30%;
    min-height: 340px;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 5px 5px 8px -3px #2E2E2E;
  `,
};

const Button = styled.button`
  cursor: pointer;
  background-color: #17393a;
  border: none;
  color: #fff;
  padding: 12px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  width: 60%;
  margin-top: 20px;

  &:hover {
    opacity: 0.85;
  }
`;

function clearBasket(){
  if(confirm('Do you really want to remove all items?')){
    window.localStorage.removeItem('__basketItems');
    window.location.reload(); 
  }
}

export default function Home() {
  const [actionAddedItem, setActionAddItem] = useState(false);
  const [products, setProducts] = useState([]);
  const [storedProductsToBasket, setStoredProductsToBasket] = useState();

  useEffect(() => {
    fetch('http://localhost:8081/products')
      .then((response) => response.json())
      .then((result) => {
        const orderedResult = result.sort((item1, item2) => item1.name.localeCompare(item2.name));
        setProducts(orderedResult);
      });
  }, []);

  // Loads the items stored in localStorage (executed everytime a new item is added)
  useEffect(() => {
    const storedData = localStorage.getItem('__basketItems');
    if (storedData) {
      setStoredProductsToBasket(JSON.parse(storedData).items);
    }
  }, [actionAddedItem]);

  return (
    <Box>
      <Grid.Container>
        <Grid.Left>
          {products.map((item) => (
            <Product
              item={item}
              setActionAddItem={setActionAddItem} 
            />
          ))}
        </Grid.Left>
        <Grid.Right>
          { storedProductsToBasket 
            ? <>
                <Basket 
                  addedProductsToBasket={storedProductsToBasket} 
                  setActionAddItem={setActionAddItem} 
                />
                <Button onClick={() => clearBasket()}>CLEAR BASKET</Button>
              </>
            : <h4>Your basket is empty :(</h4>
          }
        </Grid.Right>
      </Grid.Container>
    </Box>
  );
}
