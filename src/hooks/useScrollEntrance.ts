import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollEntranceOptions {
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  start?: string;
  childSelector?: string;
  scale?: number;
}

export function useScrollEntrance<T extends HTMLElement>(
  options: ScrollEntranceOptions = {}
) {
  const ref = useRef<T>(null);

  const {
    direction = 'up',
    distance = 40,
    duration = 0.8,
    delay = 0,
    stagger = 0,
    ease = 'power3.out',
    start = 'top 80%',
    childSelector,
    scale,
  } = options;

  useGSAP(() => {
    if (!ref.current) return;

    const targets = childSelector
      ? ref.current.querySelectorAll(childSelector)
      : ref.current;

    const fromVars: gsap.TweenVars = {
      opacity: 0,
    };

    switch (direction) {
      case 'up':
        fromVars.y = distance;
        break;
      case 'down':
        fromVars.y = -distance;
        break;
      case 'left':
        fromVars.x = distance;
        break;
      case 'right':
        fromVars.x = -distance;
        break;
    }

    if (scale !== undefined) {
      fromVars.scale = scale;
    }

    gsap.from(targets, {
      ...fromVars,
      duration,
      delay,
      stagger: stagger || undefined,
      ease,
      scrollTrigger: {
        trigger: ref.current,
        start,
        toggleActions: 'play none none none',
      },
    });
  }, { scope: ref });

  return ref;
}
