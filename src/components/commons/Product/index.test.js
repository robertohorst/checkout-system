import { render, cleanup } from '@testing-library/react';
import { Product } from '.';

afterEach(cleanup);

describe('Test if initial page is loaded correctly', () => {
  it('Product: Amazing Burger', () => {

   const { getByText } = render(<Product item = { 
        {
          id: "PWWe3w1SDU",
          name: "Amazing Burger!",
          price: 999
        } 
      } 
    />);

    expect(getByText(/Amazing/i).textContent).toBe('Amazing Burger!');

  })
});
