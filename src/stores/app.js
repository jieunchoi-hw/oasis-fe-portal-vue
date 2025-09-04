import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore("app", () => {
  // State
  const theme = ref(localStorage.getItem("theme") || "light");
  const sidebar = ref({
    isOpen: true,
    isMobile: false,
  });
  const loading = ref(false);
  const snackbar = ref({
    show: false,
    message: "",
    color: "success",
    timeout: 3000,
  });

  // Actions
  const toggleTheme = () => {
    theme.value = theme.value === "light" ? "dark" : "light";
    localStorage.setItem("theme", theme.value);
  };

  const setTheme = (newTheme) => {
    theme.value = newTheme;
    localStorage.setItem("theme", newTheme);
  };

  const toggleSidebar = () => {
    sidebar.value.isOpen = !sidebar.value.isOpen;
  };

  const setSidebarState = (isOpen) => {
    sidebar.value.isOpen = isOpen;
  };

  const setSidebarMobile = (isMobile) => {
    sidebar.value.isMobile = isMobile;
  };

  const setLoading = (isLoading) => {
    loading.value = isLoading;
  };

  const showSnackbar = ({ message, color = "success", timeout = 3000 }) => {
    snackbar.value = {
      show: true,
      message,
      color,
      timeout,
    };
  };

  const hideSnackbar = () => {
    snackbar.value.show = false;
  };

  const showSuccess = (message) => {
    showSnackbar({ message, color: "success" });
  };

  const showError = (message) => {
    showSnackbar({ message, color: "error", timeout: 5000 });
  };

  const showWarning = (message) => {
    showSnackbar({ message, color: "warning", timeout: 4000 });
  };

  const showInfo = (message) => {
    showSnackbar({ message, color: "info" });
  };

  return {
    // State
    theme,
    sidebar,
    loading,
    snackbar,

    // Actions
    toggleTheme,
    setTheme,
    toggleSidebar,
    setSidebarState,
    setSidebarMobile,
    setLoading,
    showSnackbar,
    hideSnackbar,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
});
