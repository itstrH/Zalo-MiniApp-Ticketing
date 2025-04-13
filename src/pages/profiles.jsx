import { useState } from "react";
import { Page, Input, Button, Icon, Radio } from "zmp-ui";

const Profile = () => {
  const [fullName, setFullName] = useState("Khoa Nguyen");
  const [phone, setPhone] = useState("364923127");
  const [email] = useState("khoa95905@gmail.com");
  const [dob, setDob] = useState("2004-09-19");
  const [gender, setGender] = useState("male");

  return (
    <Page className="bg-black text-white p-4">
      {/* Header */}
      <div className="flex items-center mb-4">
        <Icon icon="zi-arrow-left" className="text-white mr-2" />
        <h1 className="text-lg font-semibold">Trang chủ</h1>
      </div>

      {/* Avatar */}
      <div className="flex flex-col items-center mb-6 mt-4">
        <img
          src="https://stickerly.pstatic.net/sticker_pack/U3aXydx2H5IoEo8tNI2KZg/M1FGFV/6/3b48c3cc-69d1-4c28-81ec-2a99b86769de.png"
          alt="avatar"
          className="w-24 h-24 rounded-full mb-2"
        />
        <div className="bg-green-500 p-1 rounded-full -mt-6 ml-16">
          <Icon icon="zi-camera" className="text-white text-xs" />
        </div>
        <p className="text-center mt-2 text-sm text-white px-4">
          Cung cấp thông tin chính xác sẽ hỗ trợ bạn trong quá trình mua vé, hoặc khi cần xác thực vé
        </p>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <Input
          label="Họ và tên"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="bg-white text-black rounded-lg"
        />

        <Input
          label="Số điện thoại"
          value={phone}
          type="tel"
          onChange={(e) => setPhone(e.target.value)}
          prefix="+84"
          className="bg-white text-black rounded-lg"
        />

        <Input
          label="Email"
          type="email"
          value={email}
          disabled
          suffix={<Icon icon="zi-check-circle-solid" className="text-green-500" />}
          className="bg-white text-black rounded-lg disabled:bg-white disabled:text-black"
        />

        <Input
          label="Ngày tháng năm sinh"
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="bg-white text-black rounded-lg"
        />

        {/* Gender Selection */}
        <div className="">
        <Radio.Group value={gender} onChange={setGender} className="text-white space-x-4">
          <Radio value="male">Nam</Radio>
          <Radio value="female">Nữ</Radio>
          <Radio value="other">Khác</Radio>
        </Radio.Group>
      </div>
      </div>

      {/* Submit Button */}
      <Button className="mt-8 w-full bg-green-500 text-white font-semibold rounded-full">
        Hoàn thành
      </Button>
    </Page>
  );
};

export default Profile;
