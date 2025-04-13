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
        "https://colormedia.vn/public/upload/900x603-01-01.jpg",
      title: "Live Show",
      description: "Âm nhạc & ánh sáng",
    },
    {
      image:
        "https://m.media-amazon.com/images/I/718uJjv4oCS._AC_SL1024_.jpg",
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
      className="flex flex-col items-center justify-center bg-white dark:bg-black"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
      }}
    >
      <Header title="Za Ticketing" back={false} /> {/* Triệt tiêu nút back */}

      {/* Swiper */}
      <Text.Title size="small" className="mt-4 px-4">
        Sự kiện sắp diễn ra
      </Text.Title>
      <Box className="w-full px-4 mt-2">
        <Swiper autoplay duration={6000} loop>
          <Swiper.Slide>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIua6n4qFRNvrX94_b3yyb04wROOxNdkeAkQ&s"
              alt="slide-1"
              className="w-full rounded-xl shadow-md object-cover"
            />
          </Swiper.Slide>
          <Swiper.Slide>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIua6n4qFRNvrX94_b3yyb04wROOxNdkeAkQ&s"
              alt="slide-2"
              className="w-full rounded-xl shadow-md object-cover"
            />
          </Swiper.Slide>
          <Swiper.Slide>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIua6n4qFRNvrX94_b3yyb04wROOxNdkeAkQ&s"
              alt="slide-3"
              className="w-full rounded-xl shadow-md object-cover"
            />
          </Swiper.Slide>
          <Swiper.Slide>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIua6n4qFRNvrX94_b3yyb04wROOxNdkeAkQ&s"
              alt="slide-4"
              className="w-full rounded-xl shadow-md object-cover"
            />
          </Swiper.Slide>
          <Swiper.Slide>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIua6n4qFRNvrX94_b3yyb04wROOxNdkeAkQ&s"
              alt="slide-5"
              className="w-full rounded-xl shadow-md object-cover"
            />
          </Swiper.Slide>
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
              <Text className="text-xs text-gray-500">{event.description}</Text>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Bottom Navigation */}
      <BottomNavigation
        fixed
        activeKey={activeTab}
        onChange={handleTabChange}
      >
        <BottomNavigation.Item
          key="chat"
          label="Trang chủ"
          icon={<Icon name="home" />}
          activeIcon={<Icon name="home" />}
        />
        <BottomNavigation.Item
          key="contact"
          label="Vé của tôi"
          icon={<Icon name="ticket" />}
          activeIcon={<Icon name="ticket" />}
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
