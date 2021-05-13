import styled from "styled-components";

export const ProductWrapper = {
  Container: styled.div`
    display: flex;
    padding: 8px;
    margin: 5px;
    font-size: 18x;
    border: 1px solid #2F7577;
    border-radius: 4px;
    background-color: #a8dadc;
    box-shadow: 0px 7px 13px 5px #CCC;
  `,
  Image: styled.div`
    display: flex;
    width: 80px;
    justify-content: flex-start;
    align-items: center;
  `,
  Title: styled.div`
    display: flex;
    width: 250px;
    justify-content: flex-start;
    align-items: center;
  `,
  Add: styled.div`
    display: flex;
    width: 50px;
    align-items: center;
  `,
  Price: styled.p`
    display: flex;
    font-size: 17px;
    justify-content: flex-end;
  `,
};

export const Image = styled.img`
  border-radius: 30px;
  box-shadow: 0px 0px 5px 2px #FFF;
`;