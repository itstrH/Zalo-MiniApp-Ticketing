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
  const [paymentMethod, setPaymentMethod] = useState("zalopay");

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
        setTicket(selectedTicket);
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

  const handleBooking = async () => {
    if (!ticket) {
      alert("Không tìm thấy thông tin vé");
      return;
    }
    const payload = {
      ticket_id: ticket.ticket_id,
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

  if (!event || !ticket) {
    return <Box className="p-4">Không tìm thấy sự kiện</Box>;
  }

  return (
    <Page className="bg-white">
      <Header title="Mua vé" back={() => navigate("/")} />
      <Box className="p-4 pt-20">
        <Text.Title size="large" className="mb-2">{event.event_name}</Text.Title>
        <Text className="text-gray-500 mb-1"><strong>Ngày:</strong> {new Date(event.event_date).toLocaleDateString()}</Text>
        <Text className="text-gray-500 mb-1"><strong>Địa điểm:</strong> {event.event_location}</Text>
        <Text className="text-gray-500 mb-4"><strong>Giá vé:</strong> {ticket.price_vnd.toLocaleString()} VNĐ</Text>

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
            disabled={quantity >= 8}
            size="small"
            className="rounded-full text-lg flex items-center justify-center"
          >+</Button>
        </Box>

        <Text className="text-base font-bold mb-4">
          Tổng tiền: {(ticket.price_vnd * quantity).toLocaleString()} VNĐ
        </Text>


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
                className={` border rounded-xl p-3 flex flex-col items-center justify-center transition-all ${
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
