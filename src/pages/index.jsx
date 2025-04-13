import {
  Box,
  Button,
  Icon,
  Page,
  Text,
  Swiper,
  Header,
  BottomNavigation,
} from "zmp-ui";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../static/bg.svg";

function HomePage() {
  const [activeTab, setActiveTab] = useState("chat");
  const navigate = useNavigate();

  const events = [
    {
      image:
        "https://cdnv2.tgdd.vn/mwg-static/common/News/1575648/hinh-nen-dien-thoai-cute-29-2-1.jpg",
      title: "Lễ hội Mùa Xuân",
      description: "Văn hóa & truyền thống",
    },
    {
      image:
        "https://cdn.tgdd.vn/Files/2022/06/27/1443330/hinh-nen-meo-cute-1.jpg",
      title: "Live Show",
      description: "Âm nhạc & ánh sáng",
    },
    {
      image:
        "https://cdn.tgdd.vn/Files/2021/12/10/1403861/hinh-nen-thien-nhien-27.jpg",
      title: "Triển lãm",
      description: "Nghệ thuật sáng tạo",
    },
    {
      image:
        "https://cdn.tgdd.vn/Files/2021/08/31/1379760/hinh-nen-may-tinh-13.jpg",
      title: "Chợ đêm",
      description: "Ẩm thực & quà tặng",
    },
    {
      image:
        "https://cdn.tgdd.vn/Files/2022/10/19/1479962/hinh-nen-thien-nhien-1.jpg",
      title: "Workshop Vẽ",
      description: "Thư giãn cuối tuần",
    },
  ];

  const handleEventClick = (event) => {
    navigate("/event-detail", { state: { event } });
  };

  return (
    <Page
      className="flex flex-col items-center justify-center bg-white dark:bg-black"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
      }}
    >
      <Header title="Za Ticketing" />

      {/* Swiper */}
      <Text.Title size="small" className="mt-4 px-4">
        Sự kiện sắp diễn ra
      </Text.Title>
      <Box className="w-full px-4 mt-2">
        <Swiper autoplay duration={6000} loop>
          {[
            "https://stc-zmp.zadn.vn/zmp-zaui/images/0e05d63a7a93a6cdff826.jpg",
            "https://stc-zmp.zadn.vn/zmp-zaui/images/0f7c061caab576eb2fa45.jpg",
            "https://stc-zmp.zadn.vn/zmp-zaui/images/321fb45f18f6c4a89de78.jpg",
            "https://stc-zmp.zadn.vn/zmp-zaui/images/4f417921d58809d650997.jpg",
            "https://stc-zmp.zadn.vn/zmp-zaui/images/677fad2e0187ddd984969.jpg",
          ].map((img, idx) => (
            <Swiper.Slide key={idx}>
              <img
                src={img}
                alt={`slide-${idx}`}
                className="w-full rounded-xl shadow-md object-cover"
              />
            </Swiper.Slide>
          ))}
        </Swiper>
      </Box>

      {/* Sự kiện đặc biệt */}
      <Text.Title size="small" className="mt-6 px-4">
        Sự kiện đặc biệt
      </Text.Title>
      <Box
        className="flex overflow-x-auto gap-4 px-4 py-4 w-full"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {events.map((event, idx) => (
          <Box
            key={idx}
            onClick={() => handleEventClick(event)}
            className="min-w-[140px] max-w-[160px] bg-white dark:bg-neutral-900 rounded-xl shadow-md overflow-hidden flex-shrink-0 transition-transform hover:scale-105 cursor-pointer"
          >
            <img
              src={event.image}
              alt={`event-${idx}`}
              className="w-full h-[200px] object-cover"
            />
            <Box className="p-2">
              <Text.Title size="xSmall" className="truncate">
                {event.title}
              </Text.Title>
              <Text className="text-xs text-gray-500">
                {event.description}
              </Text>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Bottom Navigation */}
      <BottomNavigation
        fixed
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
      >
        <BottomNavigation.Item
          key="chat"
          label="Trang chủ"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>

          }
          activeIcon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>

          }
        />
        <BottomNavigation.Item
          key="contact"
          label="Vé của tôi"
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
        </svg>}
        />
      </BottomNavigation>
    </Page>
  );
}

export default HomePage;
