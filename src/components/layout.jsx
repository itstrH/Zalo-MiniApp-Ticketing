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
import EventDetail from "../components/EventDetail"; 
import BuyTicketPage from "./BuyTicketPage";

const Layout = () => {
  const [theme, setTheme] = useState("light"); // fallback default theme

  useEffect(() => {
    const fetchSystemInfo = async () => {
      try {
        const info = await getSystemInfo();
        if (info?.zaloTheme) {
          setTheme(info.zaloTheme);
        }
      } catch (error) {
        console.error("Error getting system info:", error);
      }
    };

    fetchSystemInfo();
  }, []);

  return (
    <App theme={theme}>
      <SnackbarProvider>
        <ZMPRouter>
          <AnimationRoutes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profiles" element={<Profile />} />
            <Route path="/ticket" element={<Ticket />} />
            <Route path="/event-detail" element={<EventDetail />} />
            
            <Route path="/buy-ticket" element={<BuyTicketPage />} />

          </AnimationRoutes>
        </ZMPRouter>
      </SnackbarProvider>
    </App>
  );
};

export default Layout;
