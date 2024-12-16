# @ppasmik/react-scroll-trigger

[![npm version](https://img.shields.io/npm/v/@ppasmik/react-scroll-trigger?style=flat-square)](https://www.npmjs.com/package/@ppasmik/react-scroll-trigger)
[![NPM license](https://img.shields.io/npm/l/@ppasmik/react-scroll-trigger?style=flat-square)](https://www.npmjs.com/package/@ppasmik/react-scroll-trigger)
[![npm downloads](https://img.shields.io/npm/dm/@ppasmik/react-scroll-trigger?style=flat-square)](https://www.npmjs.com/package/@ppasmik/react-scroll-trigger)
[![Coverage Status](https://img.shields.io/coveralls/github/p333ter/react-scroll-trigger?style=flat-square)](https://coveralls.io/github/p333ter/react-scroll-trigger)
[![Build Status](https://img.shields.io/github/actions/workflow/status/p333ter/react-scroll-trigger/publish.yml?style=flat-square)](https://github.com/p333ter/react-scroll-trigger/actions)

A modern, TypeScript-based React component for monitoring scroll events and triggering callbacks when elements enter, exit, or progress through the viewport. This is a rewritten and modernized version of the original react-scroll-trigger package.

Each callback includes `progress` and `velocity` parameters, enabling precise control over animations and transitions based on scroll position and speed.

## Installation

```sh
npm install @ppasmik/react-scroll-trigger
```

or via Yarn:

```sh
yarn add @ppasmik/react-scroll-trigger
```

## Usage

```tsx
import ScrollTrigger from '@ppasmik/react-scroll-trigger';

const MyComponent = () => {
  const [visible, setVisible] = useState(false);

  const onEnterViewport = () => {
    setVisible(true);
  };

  const onExitViewport = () => {
    setVisible(false);
  };

  return (
    <ScrollTrigger onEnter={onEnterViewport} onExit={onExitViewport}>
      <div className={`container ${visible ? 'container-animate' : ''}`} />
    </ScrollTrigger>
  );
};
```

The `ScrollTrigger` component is designed to be highly flexible. You can use it:

- As a standalone element without children

```tsx
<ScrollTrigger onEnter={handleEnter} onExit={handleExit} />
```

- With children to receive events based on their dimensions

```tsx
<ScrollTrigger onEnter={handleEnter} onProgress={handleProgress}>
  <section>
    <h1>Your content here</h1>
  </section>
</ScrollTrigger>
```

Common use cases include:

- Triggering animations when elements become visible
- Loading content dynamically based on scroll position
- Creating scroll-based transitions and effects
- Implementing infinite scroll functionality

## Props

| Prop             | Type                 | Default                  | Description                                                          |
| ---------------- | -------------------- | ------------------------ | -------------------------------------------------------------------- |
| `component`      | ElementType          | 'div'                    | React component or HTML element to render as wrapper                 |
| `containerRef`   | HTMLElement ⎮ string | document.documentElement | Scrolling container reference                                        |
| `throttleResize` | number               | 100                      | Resize event throttle in ms                                          |
| `throttleScroll` | number               | 100                      | Scroll event throttle in ms                                          |
| `triggerOnLoad`  | boolean              | true                     | Whether to trigger onEnter on mount                                  |
| `onEnter`        | function             | -                        | Called when element enters viewport `({progress, velocity}) => void` |
| `onExit`         | function             | -                        | Called when element exits viewport `({progress, velocity}) => void`  |
| `onProgress`     | function             | -                        | Called during scroll `({progress, velocity}) => void`                |

Standard React props (className, style, etc.) are also supported and will be passed to the wrapper element.

## Technical Details

The component uses React hooks for efficient state management:

- `useRef` to track the DOM element position
- `useState` for viewport visibility and scroll tracking
- `useEffect` for handling scroll and resize events with proper cleanup

Visibility detection:

- Uses `getBoundingClientRect()` for accurate element position calculation
- Progress is calculated based on element's position relative to viewport:
  ```ts
  progress = 1 - elementRect.bottom / (viewportEnd + elementRect.height);
  ```
- Velocity is derived from scroll position changes over time
- All calculations are throttled (default 100ms) to optimize performance

The component is designed to work with both window-level scrolling and custom scroll containers (via `containerRef` prop), making it suitable for various layout scenarios.

## License

[MIT](https://choosealicense.com/licenses/mit/) © [Peter Pasmik]

## Acknowledgments

This package is a TypeScript rewrite of the original [react-scroll-trigger](https://www.npmjs.com/package/react-scroll-trigger) package, modernized with current React practices and enhanced type safety.
