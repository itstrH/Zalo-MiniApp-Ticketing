import { getSystemInfo } from "zmp-sdk";
import {
  AnimationRoutes,
  App,
  Route,
  SnackbarProvider,
  ZMPRouter,
} from "zmp-ui";
import { useEffect, useState } from "react";

import HomePage from "../pages/index";
import Profile from "../pages/profiles";
import Ticket from "../pages/ticket";

const Layout = () => {
  const [theme, setTheme] = useState("light"); // fallback default

  useEffect(() => {
    try {
      const info = getSystemInfo();
      if (info?.zaloTheme) {
        setTheme(info.zaloTheme);
      }
    } catch (error) {
      console.error("Error getting system info:", error);
    }
  }, []);

  return (
    <App theme={theme}>
      <SnackbarProvider>
        <ZMPRouter>
          <AnimationRoutes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profiles" element={<Profile />} />
            <Route path="/ticket" element={<Ticket />} />
          </AnimationRoutes>
        </ZMPRouter>
      </SnackbarProvider>
    </App>
  );
};

export default Layout;
