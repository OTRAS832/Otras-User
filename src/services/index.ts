// import axios from "axios";

// declare module "axios" {
//   export interface AxiosRequestConfig {
//     requiresAuth?: boolean;
//   }
// }

// const httpClient = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,

//   // baseURL: "https://otrasfinalbackend-31829298905.europe-west1.run.app/",
//   // baseURL: "http://localhost:8068/",
//   headers: {
//     deviceType: "Web",
//   },
//   // timeout: 30000,
// });

// httpClient.interceptors.request.use(
//   (config) => {
//     // ✅ Only proceed if requiresAuth is true
//     if (config.requiresAuth) {
//       const token = localStorage.getItem("token");

//       // ✅ Add Authorization header only if token exists
//       if (token) {
//         config.headers["Authorization"] = `Bearer ${token}`;
//       } else {
//         console.warn("⚠️ No token found in localStorage. Request may be unauthorized.");
//       }
//     }

//     // ✅ Handle FormData (if uploading files)
//     if (config.data instanceof FormData) {
//       config.headers["Content-Type"] = "multipart/form-data";
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default httpClient;


import axios from "axios";

// 🔹 Extend Axios config to include custom `requiresAuth`
declare module "axios" {
  export interface AxiosRequestConfig {
    requiresAuth?: boolean;
  }
}

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
 headers: {
    deviceType: "Web",
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ Allow sending cookies if backend supports it
});

// 🧩 Request Interceptor
httpClient.interceptors.request.use(
  (config) => {
    // ✅ Add Authorization header only when required
    if (config.requiresAuth) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      } else {
        console.warn("⚠️ No token found. Auth request may fail.");
      }
    }

    // ✅ Handle FormData (auto set content type)
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🧩 Response Interceptor
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // ✅ Backend responded with an error status
      const { status } = error.response;

      if (status === 401) {
        console.error("🚫 Unauthorized — redirecting to login...");
        // Optionally: redirect to login or refresh token
      } else if (status === 403) {
        console.error("⛔ Forbidden — insufficient permissions.");
      } else if (status === 500) {
        console.error("💥 Server error. Please try again later.");
      }
    } else if (error.request) {
      // 🧠 No response received — likely a CORS issue
      console.error(
        "🌐 Network or CORS error — check if backend allows your origin:",
        error.message
      );

      alert(
        "CORS or network error. Please ensure the backend allows your frontend URL."
      );
    } else {
      console.error("❌ Unexpected error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default httpClient;
