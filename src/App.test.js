import { render, screen } from '@testing-library/react';
import App from './App';

test('Title is Photo search by default', () => {
  render(<App />);
  const titleElement = screen.getByTestId("app-header-title");
  expect(titleElement).toBeInTheDocument();
  expect(titleElement).toHaveTextContent('Photo Search');
});
