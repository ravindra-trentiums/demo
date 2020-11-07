// import axios from "axios";
// // import { useUserContext } from "../context/UserContext";
// import React, { useEffect } from "react";
// // import { useToastContext } from "../context/ToastContext";
// import "react-toastify/dist/ReactToastify.css";
// import { toast } from "react-toastify";
// import { BASE_URL } from "./settings";  

// export const axiosInstance = axios.create({
//   baseURL: BASE_URL,
//   responseType: "json"
// });

// const useApi = () => {
//   // const { setToast } = useToastContext();
//   // const { token } = useUserContext();

//   // useEffect(() => {
//   //   let interceptor;
//   //   if (token) {
//   //     interceptor = axiosInstance.interceptors.request.use(config => {
//   //       return {
//   //         ...config,
//   //         headers: { Authorization: `Token ${token}`, ...config.headers }
//   //       };
//   //     });
//   //   }
//   //   return () => {
//   //     if (interceptor) {
//   //       axiosInstance.interceptors.request.eject(interceptor);
//   //     }
//   //   };
//   // }, [token]);

//   useEffect(() => {
//     const interceptor = axiosInstance.interceptors.response.use(
//       res => res,
//       err => {
//         switch (err.response.status) {
//           case 404:
//             toast(("notFoundError"));
//             break;

//           case 401:
//             toast(err.response.data.message);
//             break;

//           case 400:
//             toast((err.response.data.metadata.message));
//             break;

//           case 200:
//             toast((err.response.data.message));
//             break;

//           case 500:
//             toast(("serverError"));
//             break;

//           default:
//             if (err.response.data) {
//               const strings = Object.values(err.response.data).flat();
//               toast(
//                 strings.map(str => (
//                   <>
//                     {str}
//                     <br />
//                   </>
//                 ))
//               );
//               break;
//             }
//         }
//         throw err;
//       }
//     );

//     return () => {
//       if (interceptor) {
//         axiosInstance.interceptors.response.eject(interceptor);
//       }
//     };
//   }, [setToast]);

//   const API = React.useMemo(
//     () => ({
      
//       register: { post: data => axiosInstance.post("secure/register/", data) },
//       login: { post: data => axiosInstance.post("login/", data) },
//       submitForm: { post: data => axiosInstance.post("submitForm", data) },
     
//     }),
//     []
//   );

//   return { API, axiosInstance };
// };

// export default useApi;
