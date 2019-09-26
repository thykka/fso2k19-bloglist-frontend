import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SimpleBlog from './SimpleBlog';


test('Renders content', () => {
  const blog = {
    title: 'Unit testing with Jest',
    author: 'J. Luukkainen',
    likes: 1337
  };

  const component = render(
    <SimpleBlog blog={blog} />
  );

  expect(
    component.container.querySelector('.simpleblog-title')
  ).toHaveTextContent(
    'J. Luukkainen: Unit testing with Jest'
  );

  expect(
    component.container.querySelector('.simpleblog-likes')
  ).toHaveTextContent(
    'has 1337 likes'
  );
});

test('Clicking the button twice calls the event handler twice', async () => {
  const blog = {
    title: 'Open offices are a capitalist dead end',
    author: 'Farhad Manjoo',
    likes: 5
  };
  const mockHandler = jest.fn();

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  );

  const button = getByText('like');
  fireEvent.click(button);
  fireEvent.click(button);

  expect(mockHandler.mock.calls.length).toBe(2);
});
