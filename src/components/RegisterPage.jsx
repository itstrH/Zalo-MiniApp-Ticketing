import { useState } from "react";
import { Page, Input, Button, Radio, Header } from "zmp-ui";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
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
        dob
      });
      alert("Đăng ký thành công!");
      navigate("/login");
    } catch (err) {
      alert("Lỗi đăng ký: " + (err.response?.data?.error || "Không xác định"));
    }
  };

  return (
    <Page className="p-6 bg-black text-white">
      <Header title="Đăng ký" className="bg-green-500" />
      <div className="space-y-4 mt-8">
        <Input
          label="Họ tên"
          placeholder="Nhập họ tên đầy đủ"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <Input
          label="Số điện thoại"
          placeholder="Nhập số điện thoại"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Input
          label="Email"
          type="email"
          placeholder="Nhập địa chỉ email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Mật khẩu"
          type="password"
          placeholder="Tạo mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          label="Ngày sinh"
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <Radio.Group value={gender} onChange={setGender}>
          <Radio value="male">Nam</Radio>
          <Radio value="female">Nữ</Radio>
          <Radio value="other">Khác</Radio>
        </Radio.Group>
        <Button onClick={handleRegister} className="bg-green-500 w-full text-white rounded-full">
          Đăng ký
        </Button>
      </div>
    </Page>
  );
}
