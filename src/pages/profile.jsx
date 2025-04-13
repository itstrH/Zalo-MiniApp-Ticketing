import { Box, Button, Icon, Page, Text, Swiper, Header, BottomNavigation } from "zmp-ui";
import React, { useState } from "react";
import bg from "../static/bg.svg";

function profiles() {
  const [activeTab, setActiveTab] = useState("chat");

  const events = [
    {
      image: "https://cdnv2.tgdd.vn/mwg-static/common/News/1575648/hinh-nen-dien-thoai-cute-29-2-1.jpg",
      title: "Lễ hội Mùa Xuân",
      description: "Văn hóa & truyền thống",
    },
    {
      image: "https://cdn.tgdd.vn/Files/2022/06/27/1443330/hinh-nen-meo-cute-1.jpg",
      title: "Live Show",
      description: "Âm nhạc & ánh sáng",
    },
    {
      image: "https://cdn.tgdd.vn/Files/2021/12/10/1403861/hinh-nen-thien-nhien-27.jpg",
      title: "Triển lãm",
      description: "Nghệ thuật sáng tạo",
    },
    {
      image: "https://cdn.tgdd.vn/Files/2021/08/31/1379760/hinh-nen-may-tinh-13.jpg",
      title: "Chợ đêm",
      description: "Ẩm thực & quà tặng",
    },
    {
      image: "https://cdn.tgdd.vn/Files/2022/10/19/1479962/hinh-nen-thien-nhien-1.jpg",
      title: "Workshop Vẽ",
      description: "Thư giãn cuối tuần",
    },
  ];

  return (
    <Page
      className="flex flex-col items-center justify-center bg-white dark:bg-black"
      style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}
    >
      {/* Header */}
      <Header title="Za Ticketing" />

      {/* Swiper */}
      <Text.Title size="small" className="mt-4 px-4">Sự kiện sắp diễn ra</Text.Title>
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
              <img src={img} alt={`slide-${idx}`} className="w-full rounded-xl shadow-md object-cover" />
            </Swiper.Slide>
          ))}
        </Swiper>
      </Box>

      {/* Sự kiện đặc biệt */}
      <Text.Title size="small" className="mt-6 px-4">Sự kiện đặc biệt</Text.Title>
      <Box
        className="flex overflow-x-auto gap-4 px-4 py-4 w-full"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {events.map((event, idx) => (
          <Box
            key={idx}
            className="min-w-[140px] max-w-[160px] bg-white dark:bg-neutral-900 rounded-xl shadow-md overflow-hidden flex-shrink-0"
          >
            <img src={event.image} alt={`event-${idx}`} className="w-full h-[200px] object-cover" />
            <Box className="p-2">
              <Text.Title size="xSmall" className="truncate">{event.title}</Text.Title>
              <Text className="text-xs text-gray-500">{event.description}</Text>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Bottom Navigation */}
      <BottomNavigation fixed activeKey={activeTab} onChange={(key) => setActiveTab(key)}>
        <BottomNavigation.Item
          key="chat"
          label="Trang chủ"
          icon={<Icon icon="zi-home" />}
          activeIcon={<Icon icon="zi-home" />}
        />
        <BottomNavigation.Item
          key="contact"
          label="Vé của tôi"
          icon={<Icon icon="zi-ticket" />}
          activeIcon={<Icon icon="zi-ticket" />}
        />
        <BottomNavigation.Item
          key="me"
          label="Cá nhân"
          icon={<Icon icon="zi-user" />}
          activeIcon={<Icon icon="zi-user" />}
        />
      </BottomNavigation>
    </Page>
  );
}

export default profiles;
