import { useState } from "react";
import { Page, Input, Button, Header, Text, Spinner } from "zmp-ui";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true); // Show loading spinner
    try {
      const res = await axios.post(
        'http://localhost:3001/api/login',
        { email, password },
        { credentials: 'include' } // Đảm bảo cookie được gửi kèm
      );

      // Lưu dữ liệu người dùng và điều hướng đến trang chủ
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/"); // Điều hướng đến trang chủ
    } catch (err) {
      setErrMsg(err.response?.data?.error || "Đăng nhập thất bại");
    } finally {
      setLoading(false); // Ẩn loading spinner
    }
  };

  return (
    <Page className="p-6 bg-black text-white">
      <Header title="Đăng nhập" className="bg-green-500" />
      <div className="space-y-4 mt-8">
        <Input
          type="email"
          label="Email"
          placeholder="Nhập email của bạn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errMsg && <Text className="text-red-500">{errMsg}</Text>}
        <Button onClick={handleLogin} className="bg-green-500 w-full text-white rounded-full">
          {loading ? <Spinner color="white" size="sm" /> : "Đăng nhập"}
        </Button>
        <Button variant="secondary" onClick={() => navigate("/register")}>
          Chưa có tài khoản? Đăng ký
        </Button>
        {/* Nút quay lại trang chủ */}
        <Button variant="tertiary" onClick={() => {
          console.log("Navigating back to home");
          navigate("/"); 
        }}>
          Quay lại trang chủ
        </Button>
      </div>
    </Page>
  );
}
