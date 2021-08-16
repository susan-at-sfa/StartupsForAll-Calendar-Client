import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from './store/store';
import App from './App';

const initialState = {};
const store = configureStore(initialState);

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );

  expect(getByText(/Loading/i)).toBeInTheDocument();
});
