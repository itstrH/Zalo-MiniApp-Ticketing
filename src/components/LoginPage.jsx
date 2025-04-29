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
    <Page className="p-6 bg-black text-white">
      <Header title="Đăng nhập" className="bg-green-500" back={() => navigate("/")}/>
      <Box className="mt-16">
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
        <Button onClick={handleLogin} className="bg-green-500 w-full text-white rounded-full">
          {loading ? <Spinner color="white" size="sm" /> : "Đăng nhập"}
        </Button>
        <Button variant="secondary" onClick={() => navigate("/register")}>
          Chưa có tài khoản? Đăng ký
        </Button>

        <Button variant="tertiary" onClick={() => navigate("/")}>
          Quay lại trang chủ
        </Button>
      </div>
    </Page>
  );
}
