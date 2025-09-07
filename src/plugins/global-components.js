import BaseButton from "@/components/BaseButton.vue";
import ContextMenu from "@/components/ContextMenu.vue";
import SearchInput from "@/components/SearchInput.vue";

export default {
  install(app) {
    app.component("BaseButton", BaseButton);
    app.component("ContextMenu", ContextMenu);
    app.component("SearchInput", SearchInput);
  },
};
