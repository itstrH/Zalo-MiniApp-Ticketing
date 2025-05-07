import { useState } from "react";
import { Page, Input, Button, Header, Text, Spinner, Box } from "zmp-ui";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../static/ZaTicLogo.jpg";

// Đảm bảo axios luôn gửi cookie auth
axios.defaults.withCredentials = true;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true); 
    try {
      const res = await axios.post(
        'http://localhost:3001/api/login',
        { email, password }
      );

      // Kiểm tra xem dữ liệu trả về có chứa thông tin người dùng và cookie auth không
      if (res.data && res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user)); // Lưu thông tin người dùng vào localStorage
        navigate("/");  // Chuyển hướng về trang chính sau khi đăng nhập thành công
      } else {
        setErrMsg("Thông tin đăng nhập không đúng!");
      }
    } catch (err) {
      // Xử lý lỗi nếu có
      setErrMsg(err.response?.data?.error || "Đăng nhập thất bại");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Page className="bg-black text-white px-0">
      <div className="w-full bg-green-500 text-black h-16 flex items-end px-4 pb-2">
        <span className="text-base font-bold">Đăng nhập</span>
      </div>
      <div className="max-w-sm mx-auto px-6 pt-10">
        <Box className="mb-8 text-center">
          <img
            src={logo}
            alt="Logo"
            className="w-32 h-auto mx-auto my-4 rounded-xl shadow-lg"
          />
        </Box>
        <div className="space-y-4">
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

          <Button
            onClick={handleLogin}
            className="bg-green-500 w-full text-white rounded-full"
          >
            {loading ? <Spinner color="white" size="sm" /> : "Đăng nhập"}
          </Button>

          <Button
            variant="secondary"
            onClick={() => navigate("/register")}
            className="w-full rounded-full"
          >
            Chưa có tài khoản? Đăng ký
          </Button>

          <Button
            variant="tertiary"
            onClick={() => navigate("/")}
            className="w-full"
          >
            Quay lại trang chủ
          </Button>
        </div>
      </div>
    </Page>

  );
}
