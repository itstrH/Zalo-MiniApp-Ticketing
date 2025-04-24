import { Page, Header, Box, Text, Button } from "zmp-ui";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthGuard from "../hooks/useAuthGuard";


const BuyTicketPage = () => {
  useAuthGuard(); // Kiểm tra xem người dùng đã đăng nhập chưa
  const location = useLocation();
  const navigate = useNavigate();
  const eventId = location?.state?.eventId;

  const [event, setEvent] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("zalopay");

  useEffect(() => {
    if (!eventId) {
      navigate("/");
      return;
    }

    const fetchData = async () => {
      try {
        const eventRes = await axios.get(`http://localhost:3001/api/events/${eventId}`);
        setEvent(eventRes.data);

        const ticketRes = await axios.get(`http://localhost:3001/api/tickets?eventId=${eventId}`);
        setTickets(ticketRes.data);
        setSelectedTicket(ticketRes.data[0] || null);
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu sự kiện:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [eventId]);

  const handleIncrease = () => {
    if (selectedTicket && quantity < selectedTicket.remaining_quantity && quantity < 8) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleSelectTicket = (ticket) => {
    if (ticket.remaining_quantity > 0) {
      setSelectedTicket(ticket);
      setQuantity(1);
    } else {
      alert("Loại vé này đã hết!");
    }
  };

  const handleBooking = async () => {
    if (!selectedTicket) {
      alert("Không tìm thấy thông tin vé");
      return;
    }

    if (quantity > selectedTicket.remaining_quantity) {
      alert("Số lượng vé đặt vượt quá số lượng còn lại");
      return;
    }

    const payload = {
      ticket_id: selectedTicket.ticket_id,
      quantity,
      booking_date: new Date().toISOString().split("T")[0],
    };

    try {
      await axios.post("http://localhost:3001/api/bookings", payload);
      alert("✅Đặt vé thành công!");
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

  if (!event || tickets.length === 0) {
    return <Box className="p-4">Không tìm thấy sự kiện hoặc vé</Box>;
  }

  return (
    <Page className="bg-white">
      <Header title="Mua vé" back={() => navigate("/")} />
      <Box className="p-4 pt-20">
        <Text.Title size="large" className="mb-2">{event.event_name}</Text.Title>
        <Text className="text-gray-500 mb-1"><strong>Ngày:</strong> {new Date(event.event_date).toLocaleDateString()}</Text>
        <Text className="text-gray-500 mb-1"><strong>Địa điểm:</strong> {event.event_location}</Text>

        {/* Danh sách loại vé */}
        <Box className="mb-4">
          <Text strong className="block mb-2">Chọn loại vé:</Text>
          <Box className="grid grid-cols-2 gap-3">
            {tickets.map((t) => (
              <Box
                key={t.ticket_id}
                onClick={() => handleSelectTicket(t)}
                className={`border rounded-xl p-3 text-center transition-all cursor-pointer ${
                  selectedTicket?.ticket_id === t.ticket_id
                    ? "border-blue-500 shadow-md"
                    : "border-gray-300"
                } ${t.remaining_quantity === 0 ? "opacity-50 pointer-events-none" : ""}`}
              >
                <Text className="block font-medium">{t.ticket_type}</Text>
                <Text className="text-sm text-gray-500">{t.price_vnd.toLocaleString()} VNĐ</Text>
                <Text className="text-xs text-red-500 mt-1">
                  {t.remaining_quantity > 0
                    ? `Còn lại: ${t.remaining_quantity}`
                    : "Hết vé"}
                </Text>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Số lượng */}
        <Box className="flex items-center gap-4 mb-4">
          <Text strong>Số lượng vé:</Text>
          <Button
            onClick={handleDecrease}
            disabled={quantity <= 1}
            size="small"
            className="rounded-full text-lg flex items-center justify-center"
          >−</Button>
          <Text>{quantity}</Text>
          <Button
            onClick={handleIncrease}
            disabled={!selectedTicket || quantity >= selectedTicket.remaining_quantity || quantity >= 8}
            size="small"
            className="rounded-full text-lg flex items-center justify-center"
          >+</Button>
        </Box>

        {/* Tổng tiền */}
        <Text className="text-base font-bold mb-4">
          Tổng tiền: {(selectedTicket.price_vnd * quantity).toLocaleString()} VNĐ
        </Text>

        {/* Phương thức thanh toán */}
        <Box className="mb-6">
          <Text strong className="mb-2 mt-6 block text-base text-red-600 font-semibold">Thanh toán:</Text>
          <Box className="grid grid-cols-2 gap-4 mt-2">
            {[
              {
                value: "zalopay",
                label: "ZaloPay",
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKI_9kyJ25O7eXCdYn9HwMWyEsW2KwAMF3BQ&s",
              },
              {
                value: "online-banking",
                label: "Ngân hàng",
                img: "https://news.mbbank.com.vn/file-service/uploads/v1/images/c21788de-1a22-48e0-a4ca-7bda44d5b2b4-logo-bidv-20220426071253.jpg?width=947&height=366",
              },
            ].map((method) => (
              <Box
                key={method.value}
                onClick={() => setPaymentMethod(method.value)}
                className={`border rounded-xl p-3 flex flex-col items-center justify-center transition-all ${
                  paymentMethod === method.value
                    ? "border-blue-500 shadow-lg"
                    : "border-gray-300"
                }`}
              >
                <img src={method.img} className="h-10 object-contain mb-2" />
                <Text className="text-sm font-medium">{method.label}</Text>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Nút đặt vé */}
        <Button
          className="w-full bg-blue-500 text-white mt-4 rounded-full py-3 text-base font-semibold"
          onClick={handleBooking}
        >
          Xác nhận mua vé
        </Button>
      </Box>
    </Page>
  );
};

export default BuyTicketPage;
