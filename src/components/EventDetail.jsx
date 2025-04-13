import { Page, Header, Box, Text, Button } from "zmp-ui";
import { useNavigate, useLocation } from "react-router-dom";

const EventDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const event = location.state?.event;

  if (!event) {
    return (
      <Page className="bg-white dark:bg-black">
        <Box className="p-4">
          <Text size="large" className="text-center">
            Không tìm thấy dữ liệu sự kiện.
          </Text>
        </Box>
      </Page>
    );
  }

  return (
    <Page className="bg-white dark:bg-black">
      {/* Header without back button */}
      <Header title="Chi tiết sự kiện" back={false} />

      <Box className="p-4 pt-20">
        {/* Event Image - Set fixed height */}
        <img
          src={event.image}
          alt={event.title}
          className="rounded-xl shadow-xl w-full h-[300px] object-cover mb-4"
        />
        
        {/* Event Title */}
        <Text.Title size="large" className="text-center mb-4">
          {event.title}
        </Text.Title>

        {/* Event Description */}
        <Text className="text-gray-500 text-base mb-6">{event.description}</Text>
        
        {/* Additional Event Information */}
        <Text className="text-sm text-gray-400 mb-4">
          <strong>Thời gian: </strong>{event.date}
        </Text>
        <Text className="text-sm text-gray-400 mb-4">
          <strong>Địa điểm: </strong>{event.location}
        </Text>

        {/* Button to buy tickets */}
        <Button
          className="w-full bg-green-500 text-white rounded-full mt-4"
          onClick={() => alert("Đi đến trang mua vé")}
        >
          Mua vé ngay
        </Button>
      </Box>
    </Page>
  );
};

export default EventDetail;
