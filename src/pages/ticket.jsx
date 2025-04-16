import { Box, Page, Text, Button, Icon } from "zmp-ui";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Ticket() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
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
      <Box className="px-4 pt-4 flex items-center">
        <Icon icon="zi-arrow-left" className="mr-2" onClick={() => navigate("/")} />
        <Text.Title className="text-lg">Vé của tôi</Text.Title>
      </Box>

      <Box className="p-4">
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
              <Text>Đặt ngày: {new Date(ticket.booking_date).toLocaleDateString()}</Text>
            </Box>
          ))
        )}
      </Box>
    </Page>
  );
}

export default Ticket;
