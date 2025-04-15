import { Modal, Text, Box, Button, Radio } from "zmp-ui";
import React, { useState } from "react";

const BuyTicketModal = ({ visible, onClose, event }) => {
    const [selectedPayment, setSelectedPayment] = useState('zalopay'); 
    const [ticketQuantity, setTicketQuantity] = useState(1); 

    const handlePaymentChange = (value) => {
        setSelectedPayment(value);
    };

    const handleBuyTicket = () => {
        // Xử lý logic mua vé ở đây, bao gồm cả phương thức thanh toán và số lượng vé
        console.log(
            "Mua vé sự kiện:",
            event.event_name,
            "với phương thức:",
            selectedPayment,
            "và số lượng vé:",
            ticketQuantity
        );
        // Sau khi xử lý xong (ví dụ: gọi API thanh toán), bạn có thể đóng modal
        onClose();
    };

    const increaseQuantity = () => {
        setTicketQuantity(preQuantity => preQuantity + 1);
    };

    const decreaseQuantity = () => {
        if (ticketQuantity > 1) {
            setTicketQuantity(preQuantity => preQuantity - 1);
        }
    };

    return (
        <Modal
            visible={visible}
            onClose={onClose}
            title={`Mua vé: ${event?.event_name}`}
            actions={[
                {
                    text: "Đóng",
                    close: true,
                },
                {
                    text: "Thanh toán",
                    highLight: true,
                    onClick: handleBuyTicket,
                },
            ]}
        >
            <Box className="p-4">
                <Text strong className="w-full text-base font-bold">Thông tin sự kiện:</Text>
                <Text className="text-black-500 text-base ">{event.event_name}</Text>
                <Text className="text-gray-500 text-base">{new Date(event.event_date).toLocaleDateString()}</Text>
                <Text className="text-gray-500 text-base">{event.event_time}</Text>
                <Text className="text-gray-500 text-base w-full">{event.event_location}</Text>
                <Box className="mt-4">
                    <Text strong className="w-full text-base font-bold">Chọn phương thức thanh toán:</Text>
                    <Radio
                        label="ZaloPay"
                        value="zalopay"
                        checked={selectedPayment === 'zalopay'}
                        onChange={handlePaymentChange}
                        className="w-full"
                    />
                    <Radio
                        label="Thẻ ngân hàng"
                        value="bank_card"
                        checked={selectedPayment === 'bank_card'}
                        onChange={handlePaymentChange}
                        className="w-full"
                    />
                    <Radio
                        label="Ví điện tử khác"
                        value="other_wallet"
                        checked={selectedPayment === 'other_wallet'}
                        onChange={handlePaymentChange}
                        className="w-full"
                    />
                </Box>

                {/* Chọn số lượng vé */}
                <Box className="mt-4 flex items-center gap-4">
                    <Text strong>Số lượng:</Text>
                    <Button
                        variant="outline"
                        size="small"
                        onClick={decreaseQuantity}
                        disabled={ticketQuantity <= 1}
                    >
                        -
                    </Button>
                    <Text>{ticketQuantity}</Text>
                    <Button
                        variant="outline"
                        size="small"
                        onClick={increaseQuantity}
                    >
                        +
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default BuyTicketModal;
