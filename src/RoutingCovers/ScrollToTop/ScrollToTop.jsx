import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const excludedRoutes = ["/order"]; // 1. Define
    const shouldScroll = !excludedRoutes.some((route) => pathname.startsWith(route)); // ✅ 2. USE it
    if (shouldScroll) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
