import throttle from 'lodash/throttle';
import React, {
    ElementType,
    ReactNode,
    useEffect,
    useRef,
    useState,
} from 'react';

export interface ScrollTriggerEventArgs {
  progress: number;
  velocity: number;
}

// Use ElementType instead of explicit any
type ComponentProp = ElementType;

export interface ScrollTriggerProps {
  children?: ReactNode;
  component?: ComponentProp;
  containerRef?: HTMLElement | string;
  throttleResize?: number;
  throttleScroll?: number;
  triggerOnLoad?: boolean;
  onEnter?: (args?: ScrollTriggerEventArgs) => void;
  onExit?: (args?: ScrollTriggerEventArgs) => void;
  onProgress?: (args?: ScrollTriggerEventArgs) => void;
}

type ElementProps<T extends ElementType> = React.ComponentPropsWithRef<T>;

const ScrollTrigger = ({
  children,
  component = 'div' as const,
  containerRef = typeof document !== 'undefined'
    ? document.documentElement
    : 'html',
  throttleResize = 100,
  throttleScroll = 100,
  triggerOnLoad = true,
  onEnter = () => {},
  onExit = () => {},
  onProgress = () => {},
  ...props
}: ScrollTriggerProps) => {
  const elementRef = useRef<HTMLElement>(null);
  const [inViewport, setInViewport] = useState(false);
  const [scrollData, setScrollData] = useState({
    lastScrollPosition: null as number | null,
    lastScrollTime: null as number | null,
  });

  const getScrollingElement = (): HTMLElement | null => {
    if (typeof containerRef === 'string') {
      return document.querySelector(containerRef);
    }
    return containerRef || null;
  };

  const checkStatus = () => {
    if (!elementRef.current) return;

    const elementRect = elementRef.current.getBoundingClientRect();
    const viewportStart = 0;
    const scrollingElement = getScrollingElement();

    if (!scrollingElement) return;

    const viewportEnd =
      scrollingElement === document.documentElement
        ? Math.max(scrollingElement.clientHeight, window.innerHeight || 0)
        : scrollingElement.clientHeight;

    const isInViewport =
      elementRect.top <= viewportEnd && elementRect.bottom >= viewportStart;

    const position = window.scrollY;
    const velocity =
      scrollData.lastScrollPosition && scrollData.lastScrollTime
        ? Math.abs(
            (scrollData.lastScrollPosition - position) /
              (scrollData.lastScrollTime - Date.now())
          )
        : 0;

    if (isInViewport) {
      const progress = Math.max(
        0,
        Math.min(1, 1 - elementRect.bottom / (viewportEnd + elementRect.height))
      );

      if (!inViewport) {
        setInViewport(true);
        onEnter?.({ progress, velocity });
      }

      onProgress?.({ progress, velocity });

      setScrollData({
        lastScrollPosition: position,
        lastScrollTime: Date.now(),
      });
      return;
    }

    if (inViewport) {
      const progress = elementRect.top <= viewportEnd ? 1 : 0;

      setInViewport(false);
      setScrollData({
        lastScrollPosition: position,
        lastScrollTime: Date.now(),
      });

      onProgress?.({ progress, velocity });
      onExit?.({ progress, velocity });
    }
  };

  useEffect(() => {
    const handleScroll = throttle(checkStatus, throttleScroll, {
      trailing: false,
    });
    const handleResize = throttle(checkStatus, throttleResize, {
      trailing: false,
    });

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    if (triggerOnLoad) {
      checkStatus();
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      handleScroll.cancel();
      handleResize.cancel();
    };
  }, [throttleScroll, throttleResize, inViewport]);

  const Component = component;
  const elementProps: ElementProps<typeof Component> = {
    ...props,
    ref: elementRef,
    children,
  };

  return <Component {...elementProps} />;
};

export default ScrollTrigger;
