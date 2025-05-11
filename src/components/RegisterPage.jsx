import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Page, Input, Button, Radio, Header, Box, useSnackbar } from "zmp-ui";
import axios from "axios";
import logo from "../static/ZaTicLogo.jpg";

export default function RegisterPage() {
  const snackbar = useSnackbar();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("male");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:3001/api/register", {
        full_name: fullName,
        phone,
        email,
        password,
        gender,
        dob,
      });

      snackbar.openSnackbar({
        text: "Đăng ký thành công!",
        type: "success",
        duration: 2000,
      });

      navigate("/login"); 
    } catch (err) {
      snackbar.openSnackbar({
        text: "Đăng ký không thành công!",
        type: "error",
        duration: 2000,
      });
    }
  };

  return (
    <Page className="p-6 bg-black text-white">
      <Header title="Đăng ký" className="bg-green-500" />
      <Box className="mt-16">
        <img
          src={logo}
          alt="Logo"
          className="w-32 h-auto mx-auto my-4 rounded-xl shadow-lg"
        />
      </Box>
      <div className="space-y-4">
        <Input
          label=" "
          placeholder="Nhập họ tên đầy đủ"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <Input
          label=" "
          placeholder="Nhập số điện thoại"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Input
          label=" "
          type="email"
          placeholder="Nhập địa chỉ email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label=" "
          type="password"
          placeholder="Tạo mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          label=" "
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <Radio.Group value={gender} onChange={setGender}>
          <Radio value="male">Nam</Radio>
          <Radio value="female">Nữ</Radio>
          <Radio value="other">Khác</Radio>
        </Radio.Group>
        <Button
          onClick={handleRegister}
          className="bg-green-500 w-full text-white rounded-full"
        >
          Đăng ký
        </Button>
      </div>
    </Page>
  );
}
