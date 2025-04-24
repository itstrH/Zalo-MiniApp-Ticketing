import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuthGuard = () => {
  const [authStatus, setAuthStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra xem thông tin người dùng có trong localStorage không
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (user) {
      // Nếu đã có thông tin người dùng, không cần gọi API check-auth nữa
      setAuthStatus(user);
    } else {
      // Nếu không có thông tin người dùng, gọi API check-auth
      axios.get('http://localhost:3001/api/check-auth', { withCredentials: true })
        .then(response => {
          // Nếu đăng nhập thành công, lưu thông tin vào localStorage và cập nhật state
          localStorage.setItem('user', JSON.stringify(response.data.user));
          setAuthStatus(response.data.user);
        })
        .catch(error => {
          // Nếu không có cookie hoặc phiên hết hạn, chuyển hướng đến trang đăng nhập
          setAuthStatus(null);
          navigate('/login');
        });
    }
  }, [navigate]);

  return authStatus;
};

export default useAuthGuard;
