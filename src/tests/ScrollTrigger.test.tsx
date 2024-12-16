import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';
import ScrollTrigger from '../index';

describe('ScrollTrigger', () => {
  const mockIntersectionObserver = () => {
    const mock = jest.fn();
    mock.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mock;
  };

  beforeEach(() => {
    mockIntersectionObserver();
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <ScrollTrigger>
        <div>Test content</div>
      </ScrollTrigger>
    );

    expect(getByText('Test content')).toBeInTheDocument();
  });

  it('calls onEnter when element enters viewport', () => {
    const onEnter = jest.fn();
    render(
      <ScrollTrigger onEnter={onEnter}>
        <div>Test content</div>
      </ScrollTrigger>
    );

    // Simulate scroll
    act(() => {
      fireEvent.scroll(window);
    });

    expect(onEnter).toHaveBeenCalled();
  });
});

describe('ScrollTrigger', () => {
  const mockIntersectionObserver = () => {
    const mock = jest.fn();
    mock.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mock;
  };

  beforeEach(() => {
    mockIntersectionObserver();
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <ScrollTrigger>
        <div>Test content</div>
      </ScrollTrigger>
    );

    expect(getByText('Test content')).toBeInTheDocument();
  });

  it('calls onEnter when element enters viewport', () => {
    const onEnter = jest.fn();
    render(
      <ScrollTrigger onEnter={onEnter}>
        <div>Test content</div>
      </ScrollTrigger>
    );

    // Simulate scroll
    act(() => {
      fireEvent.scroll(window);
    });

    expect(onEnter).toHaveBeenCalled();
  });

  it('respects custom component prop', () => {
    const { container } = render(
      <ScrollTrigger component="section">
        <div>Test content</div>
      </ScrollTrigger>
    );

    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
    expect(section?.textContent).toBe('Test content');
  });

  it('calls onProgress while scrolling', () => {
    const onProgress = jest.fn();
    render(
      <ScrollTrigger onProgress={onProgress}>
        <div>Test content</div>
      </ScrollTrigger>
    );

    act(() => {
      fireEvent.scroll(window);
    });

    expect(onProgress).toHaveBeenCalled();
  });
});