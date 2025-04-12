// import { openMiniApp } from "zmp-sdk";
import { Box, Button, Icon, Page, Text } from "zmp-ui";
import React, { useState }  from "react";
import bg from "../static/bg.svg";
import { Header } from "zmp-ui";
import { BottomNavigation } from "zmp-ui";
import { Swiper } from "zmp-ui";


function HomePage() {
  const [activeTab, setActiveTab] = useState("chat");
  return (
    <Page
      className="flex flex-col items-center justify-center space-y-6 bg-cover bg-center bg-no-repeat bg-white dark:bg-black"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >

      {/* HEADER */}
    <Header title="Za Ticketing" />

    {/* SWIPER */}
    <Text.Title size="small">Sự kiện sắp diễn ra</Text.Title>
      <Box
        mt={6}
        // flex
        // flexDirection="column"
        // justifyContent="center"
        // alignItems="center"
      >
        <Swiper autoplay duration={2000} loop>
          <Swiper.Slide>
            <img
              className="slide-img"
              src="https://stc-zmp.zadn.vn/zmp-zaui/images/0e05d63a7a93a6cdff826.jpg"
              alt="slide-1"
            />
          </Swiper.Slide>
          <Swiper.Slide>
            <img
              className="slide-img"
              src="https://stc-zmp.zadn.vn/zmp-zaui/images/0f7c061caab576eb2fa45.jpg"
              alt="slide-2"
            />
          </Swiper.Slide>
          <Swiper.Slide>
            <img
              className="slide-img"
              src="https://stc-zmp.zadn.vn/zmp-zaui/images/321fb45f18f6c4a89de78.jpg"
              alt="slide-3"
            />
          </Swiper.Slide>
          <Swiper.Slide>
            <img
              className="slide-img"
              src="https://stc-zmp.zadn.vn/zmp-zaui/images/4f417921d58809d650997.jpg"
              alt="slide-4"
            />
          </Swiper.Slide>
          <Swiper.Slide>
            <img
              className="slide-img"
              src="https://stc-zmp.zadn.vn/zmp-zaui/images/677fad2e0187ddd984969.jpg"
              alt="slide-5"
            />
          </Swiper.Slide>
        </Swiper>
      </Box>

    {/* FOOTER */}
    <BottomNavigation
        fixed
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
      >
        <BottomNavigation.Item
          key="chat"
          label="Trang chủ"
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
        }
          activeIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
        }
        />
        <BottomNavigation.Item
          label="Vé của tôi"
          key="contact"
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
        </svg>
        }
          activeIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
        </svg>
        }
        />
        <BottomNavigation.Item
          key="me"
          label="Cá nhân"
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
        }
          activeIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
        }
        />
      </BottomNavigation>
    </Page>
  );
}

export default HomePage;


