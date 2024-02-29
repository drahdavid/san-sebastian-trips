import { useState, useEffect, useCallback } from "react";

const MOBILE_WIDTH = 900;

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= MOBILE_WIDTH);

  const handleWindowSizeChange = useCallback(() => {
    setIsMobile(window.innerWidth <= MOBILE_WIDTH);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, [handleWindowSizeChange]);

  return isMobile;
};
