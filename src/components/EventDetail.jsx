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
      <Header title="Chi tiết sự kiện" back={false} />

      <Box className="p-4 pt-20">
        <img
          src={event.image}
          alt={event.title}
          className="rounded-xl shadow-xl w-full h-[300px] object-cover mb-4"
        />
        
        {/* tieu de event */}
        <Text.Title size="large" className="text-center mb-4">
          {event.title}
        </Text.Title>

        {/* mo ta event */}
        <Text className="text-gray-500 text-base mb-6">{event.description}</Text>
        
        {/* thong tin them event */}
        <Text className="text-sm text-gray-400 mb-4">
          <strong>Thời gian: </strong>{event.date}
        </Text>
        <Text className="text-sm text-gray-400 mb-4">
          <strong>Địa điểm: </strong>{event.location}
        </Text>

        {/* button mua ve */}
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
