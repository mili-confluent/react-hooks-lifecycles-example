import React, { useEffect, useState, useRef } from "react";

const getCurrentLocalTimeString = () => new Date().toLocaleTimeString();
const getWindowWidth = () => window.innerWidth;

// from formik
// that takes storing the callback in a mutable Hook
// and the callback's reference address will not be changed
function useEventCallback(fn) {
  const ref = useRef(fn);
  useEffect(() => {
    ref.current = fn;
  }, [fn]);
  return React.useCallback((...args) => ref.current.apply(void 0, args), []);
}

function useInterval(fn, delay) {
  const savedCallback = useEventCallback(fn);
  useEffect(() => {
    if (delay != null) {
      const tickId = setInterval(savedCallback, delay);
      return () => {
        clearInterval(tickId);
      };
    }
  }, [delay, savedCallback]);
}

function useEventListener(event, fn) {
  const savedCallback = useEventCallback(fn);
  useEffect(() => {
    window.addEventListener(event, savedCallback);
    return () => {
      window.removeEventListener(event, savedCallback);
    };
  }, [event, savedCallback]);
}

export default function Component(props) {
  const [time, setTime] = useState(getCurrentLocalTimeString);
  const [windowWidth, setWindowSize] = useState(getWindowWidth);

  useInterval(() => {
    setTime(getCurrentLocalTimeString());
  }, 1000);

  useEventListener("resize", () => {
    setWindowSize(getWindowWidth());
  });

  return (
    <div>
      <div>Time {time}</div>
      <div>The window width is {windowWidth}</div>
    </div>
  );
}
