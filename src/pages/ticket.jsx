import { Box, Page, Text, Button, Modal, Header, Icon } from "zmp-ui";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Ticket() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showQR, setShowQR] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState(null);
  const navigate = useNavigate();



  useEffect(() => {
    axios.get("http://localhost:3001/api/bookings")
      .then((res) => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const EmptyState = () => (
    <Box className="flex flex-col items-center justify-center py-12 space-y-4">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2eFoeD1oksLrWk6ucGb6cOOUL1yfYqbhOhw&s"
        alt="empty"
        className="w-40 h-40 object-contain"
      />
      <Text size="large" className="text-center font-medium">
        Bạn chưa có vé nào
      </Text>
      <Button type="primary" onClick={() => navigate("/")}>Mua vé ngay</Button>
    </Box>
  );

  return (
    <Page className="bg-white dark:bg-black">
      <Header title="Vé của tôi" back={() => navigate("/")} className="bg-green-400"/>

      <Box className="pt-16">
        {loading ? (
          <Text>Đang tải...</Text>
        ) : bookings.length === 0 ? (
          <EmptyState />
        ) : (
          bookings.map((ticket) => (
            <Box key={ticket.booking_id} className="p-4 mt-6 border border-x border-dashed border-black rounded-xl shadow-xl bg-white">
              <Text.Title className="font-bold pb-3">{ticket.event_name}</Text.Title>
              <Text className="inline-flex items-center gap-2 text-base text-gray-600 font-semibold pb-2">
                <span ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                      </svg>
                </span>{new Date(ticket.event_date).toLocaleDateString()}</Text>
              <Text className="flex items-center gap-2 text-base text-gray-600 font-semibold pb-2">
                <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                </span> {ticket.event_location}
              </Text>
              <Text className="flex items-center gap-2 text-base text-gray-600 font-semibold pb-2">
                <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                      </svg>
                </span> {ticket.quantity}
                </Text>
              <Text className="flex items-center gap-2 text-base text-gray-600 font-semibold">Ngày đặt: {new Date(ticket.booking_date).toLocaleDateString()}</Text>
              <Button
                className="mt-2"
                onClick={() => {
                  setSelectedTicket(ticket); // Lưu vé được chọn
                  setShowQR(true); // Mở modal
                }}
              >
                Xem vé điện tử
              </Button>
              {/* <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${ticket.booking_id}&amp;size=100x100`}/> */}
            </Box>
          ))
        )}
      </Box>

      {/* Modal QR */}
      <Modal
        visible={showQR}
        onClose={() => {
          setShowQR(false);
          setSelectedTicket(null); 
        }}
        title="Vé điện tử"
        description={selectedTicket ? selectedTicket.event_name :""}
      >
        <div className="flex justify-center py-6">
          {selectedTicket && (
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?data=${selectedTicket.booking_id, selectedTicket.event_name, selectedTicket.event_date, selectedTicket.event_location}&size=200x200`}

              // {"booking_id","booking_date","event_name","event_date","event_location"}
              alt="QR Code"
              className="rounded"
            />
          )}
        </div>
      </Modal>
    </Page>
  );
}

export default Ticket;
