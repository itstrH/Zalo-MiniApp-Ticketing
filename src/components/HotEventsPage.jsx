import { useState, useEffect } from "react";
import { Page, Header, Box, Text } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HotEventsPage = () => {
    const [hotEvents, setHotEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHotEvents = async () => {
            try {
                setLoading(true);
                const res = await axios.get("http://localhost:3001/api/hot-events");
                setHotEvents(res.data);
            } catch (err) {
                setError("Lỗi khi tải sự kiện xu hướng");
            } finally {
                setLoading(false);
            }
        };

        fetchHotEvents();
    }, []);

    const handleClickEvent = (event) => {
        navigate("/event-detail", { state: { eventId: event.event_id } });
    };


    if (loading) {
        return (
            <Box className="flex items-center justify-center h-screen">
                <Text className="text-base font-bold">Đang tải dữ liệu...</Text>
            </Box>
        );
    }

    if (error) {
        return (
            <Box className="flex items-center justify-center h-screen flex-col">
                <Text className="text-base font-bold text-red-500 mb-4">{error}</Text>
                <Text onClick={() => window.location.reload()} className="text-blue-500 underline cursor-pointer">
                    Tải lại
                </Text>
            </Box>
        );
    }

    return (
        <Page className="bg-white">
            <Header title="🔥 Sự kiện xu hướng" back={() => navigate("/")} />
            <Box className="p-4 pt-20 space-y-4">
                {hotEvents.length === 0 ? (
                    <Text className="text-center text-gray-500">Không có sự kiện nào.</Text>
                ) : (
                    hotEvents.map((event) => (
                        <Box
                            key={event.event_id}
                            onClick={() => handleClickEvent(event)} 
                            className="flex bg-white dark:bg-neutral-900 rounded-xl shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-[1.01] p-3 gap-3"
                        >
                            <img
                                src={event.banner_url}
                                alt={event.event_name}
                                className="w-[100px] h-[100px] object-cover rounded-md flex-shrink-0"
                            />
                            <Box className="flex flex-col justify-between overflow-hidden w-full">
                                <Text.Title
                                    size="small"
                                    className="font-bold line-clamp-2 text-base mb-1 leading-tight"
                                >
                                    {event.event_name}
                                </Text.Title>
                                <Text className="text-sm text-gray-600 line-clamp-1">
                                    📅 {new Date(event.event_date).toLocaleDateString()}
                                </Text>
                                {event.event_time && (
                                    <Text className="text-sm text-gray-600 line-clamp-1">
                                        🕒 {event.event_time}
                                    </Text>
                                )}
                                <Text className="text-sm text-gray-600 line-clamp-1">
                                    📍 {event.event_location}
                                </Text>
                            </Box>
                        </Box>
                    ))
                )}
            </Box>
        </Page>
    );
};

export default HotEventsPage;
