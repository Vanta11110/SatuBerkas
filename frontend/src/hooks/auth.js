import useSWR from "swr";
import axios from "@lib/axios";
import { useEffect } from "react";
import { useRouter } from "next/router";

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
  const router = useRouter();

  const {
    data: user,
    error,
    mutate,
  } = useSWR("/api/user", () =>
    axios
      .get("/api/user")
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.status !== 409) throw error;

        router.push("/verify-email");
      })
  );

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const register = async ({ setErrors, ...props }) => {
    await csrf();

    setErrors([]);

    axios
      .post("/api/register", props)
      .then(() => mutate())
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const getCookie = (name) => {
    const value = `;${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
  };
const login = async ({ setErrors, setStatus, ...props }) => {
  try {
    // Mendapatkan CSRF token
    await csrf();
    const csrfToken = getCookie("XSRF-TOKEN");

    // Menghapus error dan status sebelum request login
    setErrors([]);
    setStatus(null);

    // Melakukan request login menggunakan axios
    const response = await axios.post("/api/login", props, {
      headers: {
        "X-XSRF-TOKEN": decodeURIComponent(csrfToken),
      },
    });

    // Jika request berhasil, memanggil mutate dan mencetak pesan sukses
    mutate();
    console.log("Login Berhasil");

    // Menyimpan token ke penyimpanan lokal
    const apiToken = response.data.token;
    localStorage.setItem("api_token", apiToken);
  } catch (error) {
    // Menangani error dari request login
    if (error.response && error.response.status === 422) {
      // Menangani error validasi (status 422)
      setErrors(error.response.data.errors);
    } else {
      // Melempar error selain status 422
      throw error;
    }
  }
};


  const forgotPassword = async ({ setErrors, setStatus, email }) => {
    await csrf();

    setErrors([]);
    setStatus(null);

    axios
      .post("/forgot-password", { email })
      .then((response) => setStatus(response.data.status))
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const resetPassword = async ({ setErrors, setStatus, ...props }) => {
    await csrf();

    setErrors([]);
    setStatus(null);

    axios
      .post("/reset-password", { token: router.query.token, ...props })
      .then((response) =>
        router.push("/login?reset=" + btoa(response.data.status))
      )
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const resendEmailVerification = ({ setStatus }) => {
    axios
      .post("/email/verification-notification")
      .then((response) => setStatus(response.data.status));
  };

  const logout = async () => {
    try {
      // Mendapatkan token dari localStorage
      const apiToken = localStorage.getItem("api_token");

      // Memeriksa apakah token ada sebelum melakukan logout
      if (apiToken) {
        // Melakukan permintaan logout ke server
        await axios.post("/api/logout");

        // Jika permintaan logout berhasil, hapus token dari localStorage
        localStorage.removeItem("api_token");
      }

      // Mengarahkan pengguna ke halaman login
      window.location.pathname = "/login";
    } catch (error) {
      // Menangani error jika terjadi kesalahan pada permintaan logout
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    if (middleware === "guest" && redirectIfAuthenticated && user)
      router.push(redirectIfAuthenticated);
    if (window.location.pathname === "/verify-email" && user?.email_verified_at)
      router.push(redirectIfAuthenticated);
    if (middleware === "auth" && error) logout();
  }, [user, error]);

  return {
    user,
    register,
    login,
    csrf,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
  };
};
