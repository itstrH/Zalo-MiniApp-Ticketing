import useAdminGuard from "../hooks/useAdminGuard";
import { useState, useEffect } from "react";
import { Page, Box, Spinner, Text, useSnackbar } from "zmp-ui";
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
    <Page className="bg-white text-black px-4 pb-[100px]">
      <Box className="fixed top-0 left-0 right-0 z-50 px-4 pt-6 pb-3 bg-white flex justify-items-starts shadow-sm">
        <Text.Title className="text-2xl font-bold text-green-600">
          Quản lý sự kiện
        </Text.Title>
      </Box>

      <Box className="flex flex-col gap-4 mt-20">
        <Text.Title size="normal" className="mb-4 px-2">
          Danh sách sự kiện đang có
        </Text.Title>

        {hotEvents.length === 0 ? (
          <Text className="text-center text-gray-500 mt-10">
            Chưa có sự kiện nào
          </Text>
        ) : (
          hotEvents.map((event) => (
            <Box
              key={event.event_id}
              className="flex items-center gap-4 bg-white rounded-xl shadow-md overflow-hidden 
              cursor-pointer hover:shadow-lg transition-shadow p-3"
            >
              <img
                src={event.banner_url}
                alt={event.event_name}
                className="w-[100px] h-[80px] object-cover rounded-lg flex-shrink-0"
              />
              <Box className="flex flex-col flex-1 min-w-0">
                <Text.Title
                  size="small"
                  className="truncate font-semibold text-black"
                >
                  {event.event_name}
                </Text.Title>
                <Text className="text-gray-500 text-sm mt-1 truncate">
                  📅 {new Date(event.event_date).toLocaleDateString()}
                </Text>
                <Text className="text-gray-500 text-sm truncate">
                  🕒 {event.event_time}
                </Text>
              </Box>
            </Box>
          ))
        )}
      </Box>

      <Box className="fixed bottom-4 left-0 right-0 px-4 flex justify-center gap-4 z-50">
        <button
          onClick={() => navigate("/add-event")}
          className="w-[200px] bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition"
        >
          Thêm sự kiện
        </button>

        <button
          onClick={handleLogout}
          className="w-[200px] bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition"
        >
          Đăng xuất
        </button>
      </Box>
    </Page>
  );
}
