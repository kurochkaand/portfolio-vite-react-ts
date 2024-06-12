import { useState, useEffect, RefObject } from "react";

// Define the type for the dimensions
interface Dimensions {
  width: number;
  height: number;
}

// Define the type for the ref parameter
type MyRef = RefObject<HTMLElement>;

export const useContainerDimensions = (myRef: MyRef): Dimensions => {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const getDimensions = (): Dimensions => ({
      width: myRef.current ? myRef.current.offsetWidth : 0,
      height: myRef.current ? myRef.current.offsetHeight : 0,
    });

    const handleResize = () => {
      setDimensions(getDimensions());
    };

    if (myRef.current) {
      setDimensions(getDimensions());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [myRef]);

  return dimensions;
};
