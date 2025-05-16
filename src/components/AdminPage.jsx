import useAdminGuard from "../hooks/useAdminGuard";
import { useState, useEffect } from "react";
import { Page, Box, Header, Spinner, Text, useSnackbar } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminPage() {
  const { loading } = useAdminGuard();
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const [hotEvents, setHotEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const [hotRes] = await Promise.all([
          axios.get("http://localhost:3001/api/hot-events"),
        ]);
        setHotEvents(hotRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <Page className="bg-white text-black px-4">
        <Box className="pt-10 flex justify-center">
          <Spinner visible />
        </Box>
      </Page>
    );
  }

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3001/api/logout",
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      snackbar.openSnackbar({
        text: "Đăng xuất thành công!",
        type: "success",
        duration: 2000,
      });
      navigate("/login");
    } catch (err) {
      snackbar.openSnackbar({
        text: "Lỗi khi đăng xuất!",
        type: "error",
        duration: 2000,
      });
    }
  };

  return (
    <Page className="bg-white text-black px-4">
      <Header title="Quản lý sự kiện" />
      <Box className="flex flex-col gap-8 pt-2 pb-20 mt-20">
        <Text.Title size="normal" className="mt-2 px-4">
          Danh sách sự kiện đang có
        </Text.Title>
        <Box className="flex overflow-x-auto gap-6 px-4 w-full">
          {hotEvents.map((event) => (
            <Box
              key={event.event_id}
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
                  📅 {new Date(event.event_date).toLocaleDateString()}
                </Text>
                <Text className="px-1 text-base text-gray-500 mb-2 truncate">
                  🕒 {event.event_time}
                </Text>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Box className="flex flex-col items-center justify-center w-full gap-3">
        <button
          onClick={() => navigate("/add-event")}
          className="bg-green-500 text-white px-6 py-2 rounded-full shadow-md w-[200px]"
        >
          Thêm sự kiện
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-2 rounded-full shadow-md w-[200px]"
        >
          Đăng xuất
        </button>
      </Box>
    </Page>
  );
}
