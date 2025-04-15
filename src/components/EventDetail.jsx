import { Page, Header, Box, Text, Button, Modal } from "zmp-ui";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BuyTicketModal from "./buyTicketModal";
import axios from 'axios';

const EventDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const eventId = location.state?.eventId;

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [tickets, setTickets] = useState([]); // State để lưu trữ giá vé

    useEffect(() => {
        if (!eventId) {
            setError("Không có eventId");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        // Lấy thông tin sự kiện
        axios
            .get(`http://localhost:3001/api/events/${eventId}`)
            .then((response) => {
                setEvent(response.data);
                // Lấy thông tin giá vé
                axios.get(`http://localhost:3001/api/tickets?eventId=${eventId}`)
                    .then(ticketResponse => {
                        setTickets(ticketResponse.data);
                    })
                setLoading(false);
            })
            .catch((err) => {
                setError("Lỗi khi tải chi tiết sự kiện");
                setLoading(false);
            });
    }, [eventId]);

    if (loading) {
        return (
            <Page className="bg-white dark:bg-black flex items-center justify-center">
                <Text>Đang tải chi tiết sự kiện...</Text>
            </Page>
        );
    }

    if (error) {
        return (
            <Page className="bg-white dark:bg-black flex items-center justify-center">
                <Text variant="error">Lỗi: {error}</Text>
            </Page>
        );
    }

    if (!event) {
        return (
            <Page className="bg-white dark:bg-black flex flex-col items-center justify-center">
                <Box className="p-4">
                    <Text size="large" className="text-center">
                        Không tìm thấy dữ liệu sự kiện.
                    </Text>
                </Box>
                <Button onClick={() => navigate("/")}>
                    Quay lại trang chủ
                </Button>
            </Page>
        );
    }

    return (
        <Page className="bg-white dark:bg-black">
            <Header title="Chi tiết sự kiện" back={() => navigate(-1)} />
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
                    <strong>Ngày: </strong>{new Date(event.event_date).toLocaleDateString()}
                </Text>
                {event.event_time && (
                    <Text className="text-base text-gray-500 mb-2">
                        <strong>Thời gian: </strong>{event.event_time}
                    </Text>
                )}
                <Text className="text-base text-gray-500 mb-2">
                    <strong>Địa điểm: </strong>{event.event_location}
                </Text>

                <Text className="text-base text-gray-500 mb-2">
                    <strong>Địa điểm: </strong>{tickets.price_vnd}
                </Text>

                {/* Hiển thị giá vé */}
                {tickets && tickets.length > 0 && (
                    <Box className="mt-4">
                        <Text strong className="text-base">Giá vé:</Text>
                        {tickets.map(ticket => (
                            <div key={ticket.ticket_id} className="flex justify-between items-center mt-1">
                                <Text>{ticket.ticket_type || "Vé"}:</Text>
                                <Text className="font-semibold">{ticket.price_vnd} VNĐ</Text>
                            </div>
                        ))}
                    </Box>
                )}

                <Button
                    className="w-full bg-green-500 text-white rounded-full mt-4"
                    onClick={() => setIsOpenModal(true)}
                >
                    Mua vé ngay
                </Button>
            </Box>



            {isOpenModal && <BuyTicketModal visible={isOpenModal} onClose={() => setIsOpenModal(false)} event={event} />}
        </Page>
    );
};

export default EventDetail;

