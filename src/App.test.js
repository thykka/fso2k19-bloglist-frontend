import React from 'react';
import { render, waitForElement } from '@testing-library/react';
jest.mock('./services/blogs');
import App from './App';

describe('<App />', () => {
  test('If user is not logged in, blogs are not rendered', async () => {
    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() => component.container.querySelector('.login'));

    const blogs = component.container.querySelector('.bloglist');
    expect(blogs).toBeNull();
  });

  test('When the user has logged in, blogs are rendered', async() => {
    const user = {
      username: 'test',
      token: '0123456789',
      name: 'Test User'
    };
    localStorage.setItem('bloglist-user', JSON.stringify(user));
    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() => component.container.querySelector('.bloglist'));

    const blogEntries = component.container.querySelectorAll('.blog');
    expect(blogEntries.length).toBeGreaterThan(0);
  });
});
