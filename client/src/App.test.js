import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import AddProject from "./components/AddProject";

test('renders App', () => {
  const { getByText } = render(<App />);

});

test('add project form renders', () => {
  const {getByTestId} = render(<AddProject />)
  getByTestId("add-project-form");
});