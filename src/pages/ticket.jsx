import { Box, Page, Text, Button, Modal, Header, Tabs, BottomNavigation } from "zmp-ui";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthGuard from "../hooks/useAuthGuard";
axios.defaults.withCredentials = true; 

function Ticket() {
  useAuthGuard();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showQR, setShowQR] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [activeTab, setActiveTab] = useState("valid");
  const [errorMessage, setErrorMessage] = useState(""); 
  const [activeBottomTab, setActiveBottomTab] = useState("ticket"); 
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3001/api/bookings", { withCredentials: true });
      setBookings(res.data);
      setErrorMessage(""); 
    } catch (err) {
      console.error("Lỗi khi lấy danh sách bookings:", err);
      setErrorMessage("Không thể tải dữ liệu vé. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await axios.put(`http://localhost:3001/api/bookings/cancel/${bookingId}`, null, { withCredentials: true });
      await fetchBookings(); 
      setActiveTab("cancelled");
    } catch (err) {
      console.error("Lỗi khi hủy vé:", err);
      setErrorMessage("Lỗi khi hủy vé. Vui lòng thử lại.");
    }
  };

  const EmptyState = ({ message }) => (
    <Box className="flex flex-col items-center justify-center py-12 space-y-4">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2eFoeD1oksLrWk6ucGb6cOOUL1yfYqbhOhw&s"
        alt="empty"
        className="w-40 h-40 object-contain"
      />
      <Text size="large" className="text-center font-medium">{message}</Text>
      <Button type="primary" className="rounded-full px-6" onClick={() => navigate("/")}>
        Mua vé ngay
      </Button>
    </Box>
  );

  const filteredBookings = bookings.filter((ticket) =>
    activeTab === "valid"
      ? ticket.status !== "cancelled"
      : ticket.status === "cancelled"
  );

  return (
    <Page className="bg-[#f9f9f9]">
      <Header title="Vé của tôi" leftButton={() => navigate("/")} className="bg-green-400" />

      <Box className="pt-16 px-4">
        <Tabs value={activeTab} onChange={setActiveTab} className="mb-4 w-full">
          <Tabs.Tab key="valid" value="valid" label="Vé đã mua" />
          <Tabs.Tab key="cancelled" value="cancelled" label="Vé đã hủy" />
        </Tabs>

        {loading ? (
          <Text>Đang tải...</Text>
        ) : errorMessage ? (
          <Text className="text-red-500">{errorMessage}</Text>
        ) : filteredBookings.length === 0 ? (
          <EmptyState
            message={activeTab === "valid" ? "Bạn chưa có vé nào" : "Bạn chưa hủy vé nào"}
          />
        ) : (
          filteredBookings.map((ticket) => (
            <Box
              key={ticket.booking_id}
              className="bg-white p-5 mt-6 border rounded-2xl shadow-md"
            >
              <Text.Title className="font-bold text-xl text-green-600 pb-2">
                {ticket.event_name}
              </Text.Title>

              <Box className="space-y-2 text-gray-600 text-[15px]">
                <Text>
                  📅 <strong>Ngày:</strong>{" "}
                  {new Date(ticket.event_date).toLocaleDateString()}
                </Text>
                <Text>
                  📍 <strong>Địa điểm:</strong> {ticket.event_location}
                </Text>
                <Text>
                  🎫 <strong>Số lượng:</strong> {ticket.quantity}
                </Text>
                <Text>
                  🕒 <strong>Ngày đặt:</strong>{" "}
                  {new Date(ticket.booking_date).toLocaleDateString()}
                </Text>
              </Box>

              {activeTab === "valid" ? (
                <Box className="mt-4 grid grid-cols-2 gap-3">
                  <Button
                    className="bg-gray-200 text-black rounded-full flex justify-center"
                    onClick={() => handleCancelBooking(ticket.booking_id)}
                  >
                    Hủy vé
                  </Button>
                  <Button
                    className="bg-green-500 text-white rounded-full flex justify-center"
                    onClick={() => {
                      setSelectedTicket(ticket);
                      setShowQR(true);
                    }}
                  >
                    Xem vé điện tử
                  </Button>
                </Box>
              ) : (
                <Text className="mt-3 text-sm text-red-500 font-semibold">Đã hủy</Text>
              )}
            </Box>
          ))
        )}
      </Box>

      {/* Modal QR */}
      <Modal
        visible={showQR}
        onClose={() => {
          setShowQR(false);
          setSelectedTicket(null);
        }}
        title="Vé điện tử"
        description={selectedTicket?.event_name}
      >
        <Box className="flex flex-col items-center py-6">
          {selectedTicket && (
            <>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
                  JSON.stringify({
                    booking_id: selectedTicket.booking_id,
                    event_name: selectedTicket.event_name,
                    event_date: selectedTicket.event_date,
                    event_location: selectedTicket.event_location,
                  })
                )}&size=220x220`}
                alt="QR Code"
                className="rounded-xl border"
              />
              <Text className="mt-4 text-center text-sm text-gray-500">
                Quét mã để kiểm tra vé khi tham gia sự kiện
              </Text>
            </>
          )}
        </Box>
      </Modal>

      {/* Bottom Navigation */}
      <BottomNavigation
        fixed
        activeKey={activeBottomTab}
        onChange={(key) => {
          setActiveBottomTab(key);
          if (key === "home") navigate("/");
          if (key === "ticket") navigate("/ticket");
          if (key === "profile") navigate("/profiles");
        }}
      >
        <BottomNavigation.Item
          key="home"
          label="Trang chủ"
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>}
          activeIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>}
        />
        <BottomNavigation.Item
          key="ticket"
          label="Vé của tôi"
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" /></svg>}
          activeIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" /></svg>}
        />
        <BottomNavigation.Item
          key="profile"
          label="Cá nhân"
          icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>}
          activeIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>}
        />
      </BottomNavigation>
    </Page>
  );
}

export default Ticket;
