import { Page, Header, Box, Text, Button } from "zmp-ui";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BuyTicketModal from "./buyTicketModal";
import axios from 'axios';

const EventDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const eventId = location.state.eventId;

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [ticketPrice, setTicketPrice] = useState(0);

    useEffect(() => {
        // if (!eventId) {
        //     setError("Không có eventId");
        //     setLoading(false);
        //     return;
        // }
        setLoading(true);
        setError(null);

        axios
            .get(`http://localhost:3001/api/events/${eventId}`)
            .then((response) => {
                setEvent(response.data);
                return axios.get(`http://localhost:3001/api/tickets?eventId=${eventId}`);
            })
            .then((ticketResponse) => {
                const price = ticketResponse.data?.[0]?.price_vnd || 0;
                setTicketPrice(price);
                setLoading(false);
            })
            .catch((err) => {
                setError("Lỗi khi tải chi tiết sự kiện");
                setLoading(false);
            });
    }, [eventId]);

    if (loading) {
        return (<Text>Đang tải chi tiết sự kiện...</Text>);
    }

    if (!event) {
        return (<Text>Không tìm thấy sự kiện</Text>);
    }

    return (
        <Page className="bg-white">
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
                    <strong>Ngày:</strong> {new Date(event.event_date).toLocaleDateString()}
                </Text>

                {event.event_time && (
                    <Text className="text-base text-gray-500 mb-2">
                        <strong>Thời gian:</strong> {event.event_time}
                    </Text>
                )}

                <Text className="text-base text-gray-500 mb-2">
                    <strong>Địa điểm:</strong> {event.event_location}
                </Text>

                <Text className="text-base text-gray-500 mb-2">
                    <strong>Giá vé:</strong> {ticketPrice.toLocaleString()} VNĐ
                </Text>

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
