import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useAdminGuard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/");
      return;
    }

    try {
      const user = JSON.parse(storedUser);
      if (user.role !== "admin") {
        navigate("/");
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Lỗi", error);
      navigate("/");
    }
  }, [navigate]);

  return { loading };
}
