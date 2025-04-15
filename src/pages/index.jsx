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

  const featuredEvent = {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIua6n4qFRNvrX94_b3yyb04wROOxNdkeAkQ&s",
    title: "Sự kiện nổi bật",
    description: "Chương trình đặc biệt hàng tháng",
    date: "20/04/2025",
    location: "Sân vận động Quốc gia Mỹ Đình",
  };

  const events = [
    {
      image:
        "https://cdnv2.tgdd.vn/mwg-static/common/News/1575648/hinh-nen-dien-thoai-cute-29-2-1.jpg",
      title: "Lễ hội Mùa Xuân",
      description: "Văn hóa & truyền thống",
    },
    {
      image: "https://colormedia.vn/public/upload/900x603-01-01.jpg",
      title: "Live Show",
      description: "Âm nhạc & ánh sáng",
    },
    {
      image: "https://m.media-amazon.com/images/I/718uJjv4oCS._AC_SL1024_.jpg",
      title: "Triển lãm",
      description: "Nghệ thuật sáng tạo",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-ilDDWQQo4vvREneYYM7S3YRlEB7J-aP3wQ&s",
      title: "Chợ đêm",
      description: "Ẩm thực & quà tặng",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV-3ieshvT6Z91CfEJyojeLzwwHW5jYrR3j-I5FnSGgQQ29kcE21bBWU2SKkFkVEdM0VA&usqp=CAU",
      title: "Workshop Vẽ",
      description: "Thư giãn cuối tuần",
    },
  ];

  const trendingEvents = [
    {
      image:
        "https://media.vov.vn/sites/default/files/styles/large/public/2023-07/chuong-trinh-am-nhac-hoi-he-gioi-tre-1.jpg",
      title: "Summer Galaxy",
    },
    {
      image:
        "https://forestfestvn.com/wp-content/uploads/2023/11/Forest-Fest-2023.jpg",
      title: "Forest Fest",
    },
    {
      image: "https://toplist.vn/images/800px/ho-hoi-an-136229.jpg",
      title: "Đêm Hội An",
    },
  ];

  const handleEventClick = (event) => {
    navigate("/event-detail", { state: { event } });
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
    if (key === "chat") navigate("/");
    if (key === "contact") navigate("/ticket");
    if (key === "me") navigate("/profiles");
  };

  return (
    <Page
      className="pt-16 min-h-screen bg-white dark:bg-black"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Header title="Za Ticketing" back={false} />

      <Box className="flex flex-col gap-8 pt-2 pb-20">
        {/* Swiper - Sự kiện sắp diễn ra */}
        <Box>
          <Text.Title size="small" className="px-4">Sự kiện sắp diễn ra</Text.Title>
          <Box className="w-full px-4 mt-2">
            <Swiper autoplay duration={6000} loop>
              {[...Array(5)].map((_, i) => (
                <Swiper.Slide key={i} onClick={() => handleEventClick(featuredEvent)}>
                  <img
                    src={featuredEvent.image}
                    alt={`slide-${i}`}
                    className="w-full h-[200px] object-cover rounded-xl shadow-md"
                  />
                </Swiper.Slide>
              ))}
            </Swiper>
          </Box>
        </Box>

        {/* Sự kiện đặc biệt */}
        <Box>
          <Text.Title size="small" className="px-4">Sự kiện đặc biệt</Text.Title>
          <Box className="flex overflow-x-auto gap-6 px-4 py-4 w-full">
            {events.map((event, idx) => (
              <Box
                key={idx}
                onClick={() => handleEventClick(event)}
                className="min-w-[160px] max-w-[180px] bg-white dark:bg-neutral-900 rounded-xl shadow-md overflow-hidden flex-shrink-0 cursor-pointer transition-transform hover:scale-105"
              >
                <img
                  src={event.image}
                  alt={`event-${idx}`}
                  className="w-full h-[220px] object-cover"
                />
                <Box className="p-3">
                  <Text.Title size="xSmall" className="truncate">{event.title}</Text.Title>
                  <Text className="text-xs text-gray-500">{event.description}</Text>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Sự kiện xu hướng */}
        <Box>
          <Text.Title size="small" className="mb-2 px-4 flex items-center gap-1">
            <span role="img" aria-label="fire">🔥</span> Sự kiện xu hướng
          </Text.Title>
          <Box className="flex overflow-x-auto gap-6 px-4 py-4 w-full">
            {trendingEvents.map((event, index) => (
              <Box
                key={index}
                onClick={() => handleEventClick(event)}
                className="min-w-[270px] max-w-[300px] bg-neutral-100 dark:bg-neutral-800 rounded-xl overflow-hidden shadow relative flex-shrink-0 cursor-pointer transition-transform hover:scale-105"
              >
                <img
                  src={event.image}
                  alt={`trending-${index}`}
                  className="w-full h-[120px] object-cover"
                />
                <Box className="p-3">
                  <Text className="text-sm font-semibold truncate">{event.title}</Text>
                </Box>
                <Text
                  className="absolute top-2 left-2 text-green-500 font-bold text-4xl opacity-90"
                  style={{ WebkitTextStroke: "1px black" }}
                >
                  {index + 1}
                </Text>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Bottom Navigation */}
      <BottomNavigation fixed activeKey={activeTab} onChange={handleTabChange}>
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
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
            </svg>
          }
          activeIcon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
            </svg>
          }
        />
        <BottomNavigation.Item
          key="me"
          label="Cá nhân"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          }
          activeIcon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          }
        />
      </BottomNavigation>
    </Page>
  );
}

export default HomePage;