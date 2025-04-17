import { Box, Page, Text, Button, Modal, Header } from "zmp-ui";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Ticket() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showQR, setShowQR] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/bookings")
      .then((res) => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const EmptyState = () => (
    <Box className="flex flex-col items-center justify-center py-12 space-y-4">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2eFoeD1oksLrWk6ucGb6cOOUL1yfYqbhOhw&s"
        alt="empty"
        className="w-40 h-40 object-contain"
      />
      <Text size="large" className="text-center font-medium">
        Bạn chưa có vé nào
      </Text>
      <Button type="primary" className="rounded-full px-6" onClick={() => navigate("/")}>
        Mua vé ngay
      </Button>
    </Box>
  );

  return (
    <Page className="bg-[#f9f9f9]">
      <Header title="Vé của tôi" back={() => navigate("/")} className="bg-green-500 text-white" />

      <Box className="pt-16 px-4">
        {loading ? (
          <Text>Đang tải...</Text>
        ) : bookings.length === 0 ? (
          <EmptyState />
        ) : (
          bookings.map((ticket) => (
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

              <Button
                className="mt-4 w-full bg-green-500 text-white rounded-full"
                onClick={() => {
                  setSelectedTicket(ticket);
                  setShowQR(true);
                }}
              >
                Xem vé điện tử
              </Button>
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
    </Page>
  );
}

export default Ticket;
