import BaseButton from "@/components/BaseButton.vue";
import ContextMenu from "@/components/ContextMenu.vue";
import SearchInput from "@/components/SearchInput.vue";
import AppTable from "@/components/AppTable.vue";

export default {
  install(app) {
    app.component("BaseButton", BaseButton);
    app.component("ContextMenu", ContextMenu);
    app.component("SearchInput", SearchInput);
    app.component("AppTable", AppTable);
  },
};
