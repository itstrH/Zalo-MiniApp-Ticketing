import { useState } from "react";
import { Page, Input, Button, Icon, Radio, Header} from "zmp-ui";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("Zalo-er");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("demo@ptithcm.edu.vn");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("male");
  const [countryCode, setCountryCode] = useState("+84");

  return (
    <Page className="bg-black min-h-screen text-white p-5">
    <Header title="Cá nhân" className="bg-green-400" back={() => navigate("/")} />
      <div className="flex flex-col items-center mb-8 mt-16">
        <img
          src="https://i.pinimg.com/736x/b4/bb/b2/b4bbb2198b036fe1024571ec6b60f8b8.jpg"
          alt="avatar"
          className="w-24 h-24 rounded-full border-4 border-green-400 shadow-lg"
        />
        <p className="text-sm text-center text-gray-300 mt-4 px-4">
          Cung cấp thông tin chính xác giúp bạn mua vé & xác minh dễ dàng hơn
        </p>
      </div>


      <div className="space-y-5">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="bg-white text-black rounded-lg"
        />


        <div className="flex items-center bg-white rounded-lg border border-gray-300 overflow-hidden">
          <select
            className="bg-gray-100 px-3 py-2 outline-none text-black text-sm border-r border-gray-300"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
          >
            <option value="+84">+84</option>
            <option value="+1">+1</option>
            <option value="+61">+61</option>
          </select>

          <input
            type="tel"
            label="Số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Số điện thoại"
            className="flex-1 px-3 py-2 outline-none text-black text-sm bg-white"
          />

          {phone && (
            <button
              onClick={() => setPhone("")}
              className="px-3 text-gray-500 hover:text-red-500"
            >
              <Icon icon="zi-close-circle" />
            </button>
          )}
        </div>


        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white text-black rounded-lg"
        />


        <Input
          label="Ngày sinh"
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="bg-white text-black rounded-lg"
        />

        <div className="flex flex-col mt-2">
          <label className="mb-1 font-medium text-gray-300">Giới tính</label>
          <Radio.Group value={gender} onChange={setGender} className="space-x-6">
            <Radio value="male" className="text-white">Nam</Radio>
            <Radio value="female" className="text-white">Nữ</Radio>
            <Radio value="other" className="text-white">Khác</Radio>
          </Radio.Group>
        </div>
      </div>


      <Button
        className="mt-10 w-full bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-full shadow-lg"
        onClick={() => navigate("/")}
      >
        Hoàn thành
      </Button>
    </Page>
  );
}

export default Profile;
