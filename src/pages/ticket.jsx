import { Box, Page, Text, Button, Modal, Header, Tabs } from "zmp-ui";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthGuard from "../hooks/useAuthGuard";

function Ticket() {
  useAuthGuard();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showQR, setShowQR] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [activeTab, setActiveTab] = useState("valid");
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3001/api/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await axios.put(`http://localhost:3001/api/bookings/cancel/${bookingId}`);
      await fetchBookings(); 
      setActiveTab("cancelled");
    } catch (err) {
      console.error("Lỗi khi hủy vé:", err);
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
        
        {/* modal vé QR code */}
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
    </Page>
  );
}

export default Ticket;
