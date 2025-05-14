import { useState, useEffect } from "react";
import { Page, Header, Box, Text, Button } from "zmp-ui";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

const EventDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const eventId = location?.state?.eventId;

    const [event, setEvent] = useState(null);
    const [ticketPrice, setTicketPrice] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!eventId) {
            setError("Không tìm thấy ID sự kiện.");
            setLoading(false);
            return;
        }

        const fetchEventDetails = async () => {
            try {
                setLoading(true);
                setError(null);

                const eventRes = await axios.get(`http://localhost:3001/api/events/${eventId}`);
                setEvent(eventRes.data);

                const ticketRes = await axios.get(`http://localhost:3001/api/tickets?eventId=${eventId}`);
                const price = ticketRes.data?.[0]?.price_vnd || 0;
                setTicketPrice(price);
            } catch (err) {
                setError("Lỗi khi tải chi tiết sự kiện.");
            } finally {
                setLoading(false);
            }
        };

        fetchEventDetails();
    }, [eventId]);


    if (loading) {
        return (
            <Box className="flex items-center justify-center h-screen">
                <Text className="text-base font-bold">Đang tải chi tiết sự kiện...</Text>
            </Box>
        );
    }

    if (error) {
        return (
            <Box className="flex items-center justify-center h-screen flex-col">
                <Text className="text-base font-bold text-red-500 mb-4">{error}</Text>
                <Button onClick={() => navigate("/")}>Quay lại</Button>
            </Box>
        );
    }

    if (!event) {
        return (
            <Box className="flex items-center justify-center h-screen flex-col">
                <Text className="text-base font-bold mb-4">Không tìm thấy sự kiện</Text>
                <Button onClick={() => navigate("/")}>Quay lại</Button>
            </Box>
        );
    }

    return (
        <Page className="bg-white">
            <Header title="Chi tiết sự kiện" back={() => navigate("/")} />
            <Box className="p-4 pt-20">
                <img
                    src={event.banner_url}
                    alt={event.event_name}
                    className="rounded-xl shadow-xl w-full h-[300px] object-cover mb-4"
                />

                <Text.Title size="large" className="text-center mb-4">
                    {event.event_name}
                </Text.Title>

                <Text className="text-base text-gray-500 mb-2">
                📅 <strong>Ngày:</strong> {new Date(event.event_date).toLocaleDateString()}
                </Text>

                {event.event_time && (
                    <Text className="text-base text-gray-500 mb-2">
                    🕓   <strong>Thời gian:</strong> {event.event_time}
                    </Text>
                )}

                <Text className="text-base text-gray-500 mb-2">
                📍 <strong>Địa điểm:</strong>  {event.event_location}
                </Text>

                <Text className="text-base text-gray-500 mb-4 mt-8">
                    {event.event_description}
                </Text>


  
                <Button
                    className="bg-green-500 w-full flex justify-center text-white rounded-full pt-4"
                    onClick={() => navigate("/buy-ticket", { state: { eventId: event.event_id } })}
                >
                    Mua vé ngay
                </Button>
            </Box>
        </Page>
    );
};

export default EventDetail;
