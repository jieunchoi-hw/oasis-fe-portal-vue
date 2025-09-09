import BaseButton from "@/components/BaseButton.vue";
import ContextMenu from "@/components/ContextMenu.vue";
import SearchInput from "@/components/SearchInput.vue";
import AppTable from "@/components/AppTable.vue";
import AppConfirmDialog from "@/components/AppConfirmDialog.vue";
import ModalOpenButton from "@/components/ModalOpenButton.vue";
import AppInput from "@/components/AppInput.vue";

export default {
  install(app) {
    app.component("BaseButton", BaseButton);
    app.component("ContextMenu", ContextMenu);
    app.component("SearchInput", SearchInput);
    app.component("AppTable", AppTable);
    app.component("AppConfirmDialog", AppConfirmDialog);
    app.component("ModalOpenButton", ModalOpenButton);
    app.component("AppInput", AppInput);
  },
};
