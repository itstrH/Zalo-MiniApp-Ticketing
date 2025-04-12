import { openMiniApp } from "zmp-sdk";
import { Box, Button, Icon, Page, Text } from "zmp-ui";

import Clock from "../components/clock";
import Logo from "../components/logo";
import bg from "../static/bg.svg";

function HomePage() {
  return (
    <Page
      className="flex flex-col items-center justify-center space-y-6 bg-cover bg-center bg-no-repeat bg-white dark:bg-black"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      
    </Page>
  );
}

export default HomePage;
