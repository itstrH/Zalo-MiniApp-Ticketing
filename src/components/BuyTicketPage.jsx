import { Page, Header, Box, Text, Button } from "zmp-ui";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const BuyTicketPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const eventId = location?.state?.eventId;

  const [event, setEvent] = useState(null);
  const [ticket, setTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!eventId) {
      navigate("/");
      return;
    }

    axios
      .get(`http://localhost:3001/api/events/${eventId}`)
      .then((res) => {
        setEvent(res.data);
        return axios.get(`http://localhost:3001/api/tickets?eventId=${eventId}`);
      })
      .then((ticketRes) => {
        const selectedTicket = ticketRes.data?.[0];
        const price = selectedTicket?.price_vnd || 0;
        setTicket(selectedTicket);  // 👈 Set ticket
        setTicketPrice(price);
        setLoading(false);
    })
      .catch((err) => {
        console.error("Lỗi khi tải dữ liệu sự kiện:", err);
        setLoading(false);
      });
  }, [eventId]);

  const handleIncrease = () => {
    if (quantity < 8) setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

// Hàm handleBooking
const handleBooking = async () => {
    if (!ticket) {
        alert("Không tìm thấy thông tin vé");
        return;
    }
    const payload = {
        ticket_id: ticket.ticket_id,
        quantity: quantity,
        booking_date: new Date().toISOString().split("T")[0],
    };

    try {
        const res = await axios.post("http://localhost:3001/api/bookings", payload);
        alert("Đặt vé thành công!");
        navigate("/ticket");
    } catch (err) {
        console.error(err);
        alert("Lỗi khi đặt vé");
    }
};

  if (loading) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <Text>Đang tải...</Text>
      </Box>
    );
  }

  if (!event || !ticket) {
    return <Box className="p-4">Không tìm thấy sự kiện</Box>;
  }

  return (
    <Page className="bg-white">
      <Header title="Mua vé" back={() => navigate(-1)} />
      <Box className="p-4 pt-20">
        <Text.Title size="large" className="mb-2">{event.event_name}</Text.Title>
        <Text className="text-gray-500 mb-1"><strong>Ngày:</strong> {new Date(event.event_date).toLocaleDateString()}</Text>
        <Text className="text-gray-500 mb-1"><strong>Địa điểm:</strong> {event.event_location}</Text>
        <Text className="text-gray-500 mb-4"><strong>Giá vé:</strong> {ticket.price_vnd.toLocaleString()} VNĐ</Text>

        <Box className="flex items-center gap-4 mb-4">
          <Text strong>Số lượng vé:</Text>
          <Button onClick={handleDecrease} disabled={quantity <= 1} size="small" variant="outline">-</Button>
          <Text>{quantity}</Text>
          <Button onClick={handleIncrease} disabled={quantity >= 8} size="small" variant="outline">+</Button>
        </Box>

        <Text className="text-base font-bold mb-2">
          Tổng tiền: {(ticket.price_vnd * quantity).toLocaleString()} VNĐ
        </Text>

        <Button className="w-full bg-blue-500 text-white mt-4 rounded-full" onClick={handleBooking}>
          Xác nhận mua vé
        </Button>
      </Box>
    </Page>
  );
};

export default BuyTicketPage;
