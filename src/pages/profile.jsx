import React from 'react';
import { ZButton, ZCard, ZAvatar, ZText, ZRow, ZColumn } from 'zaui'; // Giả sử Zaui cung cấp những component này

const UserPage = () => {
  // Dữ liệu giả lập cho người dùng
  const user = {
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    avatar: 'https://www.example.com/avatar.jpg',
    bio: 'Web developer with a passion for creating amazing user experiences.'
  };

  return (
    <div style={{ padding: '20px' }}>
      <ZCard>
        <ZRow>
          {/* Avatar */}
          <ZColumn size={4}>
            <ZAvatar src={user.avatar} size={100} />
          </ZColumn>

          {/* Thông tin người dùng */}
          <ZColumn size={8}>
            <ZText variant="h3">{user.name}</ZText>
            <ZText>{user.email}</ZText>
            <ZText variant="body2">{user.bio}</ZText>
          </ZColumn>
        </ZRow>
        <div style={{ marginTop: '20px' }}>
          <ZButton onClick={() => alert('Chỉnh sửa thông tin')}>Chỉnh sửa</ZButton>
        </div>
      </ZCard>
    </div>
  );
};

export default UserPage;
