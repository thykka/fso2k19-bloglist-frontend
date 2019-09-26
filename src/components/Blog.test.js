import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';


test('Displays only the title by default', () => {
  const blog = {
    title: 'Unit testing with Jest',
    author: 'J. Luukkainen',
    likes: 1337,
    user: {
      name: 'A. Nony Mous'
    }
  };

  const component = render(
    <Blog blog={blog} />
  );

  expect(
    component.container.querySelector('.blog a')
  ).toHaveTextContent(
    blog.title
  );
});

test('Clicking the expand button makes the initially hidden details visible', async () => {
  const blog = {
    title: 'Open offices are a capitalist dead end',
    author: 'Farhad Manjoo',
    likes: 5,
    user: {
      name: 'A. Nony Mous'
    }
  };
  const mockHandler = jest.fn();

  const component = render(
    <Blog blog={blog} onClick={mockHandler} />
  );

  const detailsElement = component.container.querySelector('.blog-details');
  expect(detailsElement.style.display).toBe('none');

  const button = component.container.querySelector('.button--expand');
  fireEvent.click(button);

  expect(detailsElement.style.display).toBe('');
});
