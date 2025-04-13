// src/pages/EventDetail.jsx
import { Page, Header, Box, Text } from "zmp-ui";
import { useNavigate, useLocation } from "react-router-dom";

const EventDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const event = location.state?.event;

  if (!event) return <Text>Không tìm thấy dữ liệu sự kiện.</Text>;

  return (
    <Page className="bg-white dark:bg-black">
      <Header title="Chi tiết sự kiện" onBackClick={() => navigate(-1)} />
      <Box className="p-4">
        <img src={event.image} className="rounded-xl shadow-xl w-full mb-4" alt={event.title} />
        <Text.Title size="large">{event.title}</Text.Title>
        <Text className="text-gray-500">{event.description}</Text>
      </Box>
    </Page>
  );
};

export default EventDetail;
