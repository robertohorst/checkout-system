const BASE_URL = 'http://localhost:8081/products';

const fetchProducts = {
  async getProducts() {
    return fetch(BASE_URL)
      .then((response) => response.json());
  },
  async getProduct(productId){
    return fetch(`${BASE_URL}/${productId}`)
      .then((response) => response.json());
  }
}

export default fetchProducts;