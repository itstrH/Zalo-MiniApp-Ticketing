import {
  Box,
  Page,
  Text,
  Swiper,
  Header,
  BottomNavigation,
} from "zmp-ui";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../static/solid_white.jpg";
import axios from "axios";

function HomePage() {
  const [activeTab, setActiveTab] = useState("home");
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [hotEvents, setHotEvents] = useState([]);
  const navigate = useNavigate();

  
   useEffect(() => {
    const fetchEvents = async () => {
      try {
        const [upcomingRes, hotRes] = await Promise.all([
          axios.get("http://localhost:3001/api/events"),
          axios.get("http://localhost:3001/api/hot-events"),
        ]);
  
        setUpcomingEvents(upcomingRes.data);
        setHotEvents(hotRes.data);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách sự kiện:", err);
      }
    };
  
    fetchEvents();
  }, []);
  

  const handleEventClick = (event) => {
    navigate("/event-detail", { state: { eventId: event.event_id } });
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
    if (key === "home") navigate("/");
    if (key === "ticket") navigate("/ticket");
    if (key === "profile") navigate("/profiles");
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
      <Header title="Za Ticketing" className="bg-green-400"/>

      <Box className="flex pt-2">
      <button
        onClick={() => navigate("/add-event")}
        className="fixed bottom-20 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg"
      >
        Tạo sự kiện
      </button>

      </Box>

      <Box className="flex flex-col gap-8 pt-2 pb-20">
        {/* swiper */}
        <Text.Title size="normal" className="mt-4 px-4">
          Sự kiện sắp diễn ra
        </Text.Title>
        <Box className="w-full px-2">
          <Swiper autoplay duration={5000} loop className="!rounded-none">
            {upcomingEvents.slice(0, 5).map((event) => (
              <Swiper.Slide key = {event.event_id} onClick={() => handleEventClick(event)}>
                <img
                src={event.banner_url}
                className="w-full shadow-md object-cover h-[200px]"
                />
              </Swiper.Slide>
            ))}
          </Swiper>
        </Box>


      {/* sự kiện xu hướng */}
      <Text.Title size="normal" className="mt-2 px-4">
          <span role="img" aria-label="fire">🔥</span> Sự kiện xu hướng
      </Text.Title>
      <Box className="flex overflow-x-auto gap-6 px-4 w-full">
        {hotEvents.slice(0, 5).map((event) => (
          <Box
            key={event.event_id}
            onClick={() => handleEventClick(event)}
            className="min-w-[140px] w-[260px] bg-white dark:bg-neutral-900 rounded-xl shadow-md overflow-hidden flex-shrink-0 transition-transform hover:scale-105 cursor-pointer"
          >
            <img
              src={event.banner_url}
              className="w-full h-[150px] object-cover"
            />
            <Box className="p-2">
              <Text.Title size="xSmall" className="px-1 truncate">
                  {event.event_name}
              </Text.Title>
              <Text className="px-1 text-base text-gray-500 truncate font-bold">
                📅  {new Date(event.event_date).toLocaleDateString()}
                </Text>
                <Text className="px-1 text-base text-gray-500 mb-2 truncate">
                🕒 {event.event_time}
                </Text>
            </Box>
          </Box>
          ))}
        </Box>


        {/* sự kiện đặc biệt */}
        <Text.Title size="normal" className="mt-2 px-4">
          Dành cho bạn
        </Text.Title>
        <Box
          className="flex overflow-x-auto gap-6 px-4 w-full"   
        >
          {upcomingEvents.slice(2, 10).map((event) => (
            <Box
              key = {event.event_id}
              onClick={() => handleEventClick(event)}
              className="min-w-[140px] w-[260px] bg-white dark:bg-neutral-900 rounded-xl shadow-md overflow-hidden flex-shrink-0 transition-transform hover:scale-105 cursor-pointer"
            >
              <img
              src={event.banner_url}
              className="w-full h-[150px] object-cover"
              />
              <Box className="p-2">
                <Text.Title size="xSmall" className="px-1 truncate">
                  {event.event_name}
                </Text.Title>
                <Text className="px-1 text-base text-gray-500 truncate font-bold">
                📅  {new Date(event.event_date).toLocaleDateString()}
                </Text>
                <Text className="px-1 text-base text-gray-500 mb-2 truncate">
                🕒 {event.event_time}
                </Text>
              </Box>
          </Box>
          ))}
        </Box>
      </Box>

      
      {/* <button
        onClick={() => navigate("/add-event")}
        className="fixed bottom-20 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-white hover:text-black transition-all duration-300"
      >
        Tạo sự kiện
      </button> */}

      <BottomNavigation fixed activeKey={activeTab} onChange={handleTabChange}>
        <BottomNavigation.Item
          key="home"
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
          key="ticket"
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
          key="profile"
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