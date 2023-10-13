import { useEffect } from "react";

const useDebounce = (func: Function, dependency: any) => {
  useEffect(() => {
    const timerId = setTimeout(func, 500);
    return () => clearTimeout(timerId);
  }, [dependency]);
};

export default useDebounce;