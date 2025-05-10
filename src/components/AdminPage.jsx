import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Page, Box, Header, Text, Spinner } from "zmp-ui";

export default function AdminPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.role !== "admin") {
        navigate("/");
      } else {
        setUser(parsedUser);
        setLoading(false);
      }
    } else {
      navigate("/");
    }
  }, []);

  if (loading) {
    return (
      <Page className="bg-white text-black px-4">
        <Box className="pt-10 flex justify-center">
          <Spinner visible />
        </Box>
      </Page>
    );
  }

  return (
    <Page className="bg-white text-black px-4">
      <Header title="Quản lý sự kiện" />

      <Box className="flex flex-col items-center justify-center h-full w-full space-y-4">
        <button
          onClick={() => navigate("/add-event")}
          className="bg-green-500 text-white px-6 py-2 rounded-full shadow-md"
        >
          Tạo sự kiện
        </button>
        <button
          onClick={() => alert("Chức năng xóa sự kiện sẽ được thêm sau")}
          className="bg-red-500 text-white px-6 py-2 rounded-full shadow-md"
        >
          Xóa sự kiện
        </button>
      </Box>
    </Page>
  );
}
