import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export function showNotification(message) {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "bottom",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
      color: "white",
    },
  }).showToast();
}

