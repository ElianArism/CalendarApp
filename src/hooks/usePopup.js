import Swal from "sweetalert2";

export const usePopup = () => {
  const buildCustomPopup = (
    options = {
      icon: "",
      title: "",
      html: "",
    }
  ) => {
    Swal.fire({
      icon: options.icon,
      title: options.title,
      html: `<p>${options.html}</p>`,
    });
  };

  const buildErrorPopup = (
    errorMessage = "",
    onCloseAction = () => console.log("closed")
  ) => {
    Swal.fire({
      icon: "error",
      title: "Error",
      html: `<p>${errorMessage}</p>`,
      didClose: () => onCloseAction(),
    });
  };
  return { buildCustomPopup, buildErrorPopup };
};
