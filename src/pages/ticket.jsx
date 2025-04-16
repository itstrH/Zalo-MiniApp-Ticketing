import { Box, Page, Text, Button, Icon, Modal, Header } from "zmp-ui";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Ticket() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showQR, setShowQR] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState(null);
  const navigate = useNavigate();



  useEffect(() => {
    axios.get("http://localhost:3001/api/bookings")
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
      <Button type="primary" onClick={() => navigate("/")}>Mua vé ngay</Button>
    </Box>
  );

  return (
    <Page className="bg-white dark:bg-black">
      <Header title="Vé của tôi" back={() => navigate("/")} />

      <Box className="pt-16">
        {loading ? (
          <Text>Đang tải...</Text>
        ) : bookings.length === 0 ? (
          <EmptyState />
        ) : (
          bookings.map((ticket) => (
            <Box key={ticket.booking_id} className="p-4 mb-4 border rounded-xl shadow-sm bg-white">
              <Text.Title>{ticket.event_name}</Text.Title>
              <Text>Ngày: {new Date(ticket.event_date).toLocaleDateString()}</Text>
              <Text>Địa điểm: {ticket.event_location}</Text>
              <Text>Số lượng: {ticket.quantity}</Text>
              <Text>Ngày đặt: {new Date(ticket.booking_date).toLocaleDateString()}</Text>
              <Button
                className="mt-2"
                onClick={() => {
                  setSelectedTicket(ticket); // Lưu vé được chọn
                  setShowQR(true); // Mở modal
                }}
              >
                Xem vé điện tử
              </Button>
              {/* <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${ticket.booking_id}&amp;size=100x100`}/> */}
            </Box>
          ))
        )}
      </Box>

      {/* Modal QR */}
      <Modal
        visible={showQR}
        onClose={() => {
          setShowQR(false);
          setSelectedTicket(null); // Xóa vé được chọn khi đóng modal
        }}
        title="Vé điện tử"
        description={selectedTicket ? selectedTicket.event_name :""}
      >
        <div className="flex justify-center py-6">
          {selectedTicket && (
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?data=${selectedTicket.booking_id, selectedTicket.event_name, selectedTicket.event_date, selectedTicket.event_location}&size=200x200`}

              // {"booking_id","booking_date","event_name","event_date","event_location"}
              alt="QR Code"
              className="rounded"
            />
          )}
        </div>
      </Modal>
    </Page>
  );
}

export default Ticket;
