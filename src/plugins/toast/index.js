import Vue3Toastify, { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import "../../styles/toast.css";

export default function (app) {
  // Register Vue3Toastify
  app.use(Vue3Toastify, {
    autoClose: 3000,
    theme: "light",
    pauseOnHover: true,
    closeOnClick: false,
    position: "top-right",
    transition: "slide",
    hideProgressBar: false,
    newestOnTop: true,
    rtl: false,
    style: {
      opacity: 0.97,
      userSelect: "initial",
    },
    toastClassName: "oasis-toast",
    bodyClassName: "oasis-toast-body",
    progressClassName: "oasis-toast-progress",
    closeButtonClassName: "oasis-toast-close",
  });
}
