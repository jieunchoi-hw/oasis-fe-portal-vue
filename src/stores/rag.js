import { defineStore } from "pinia";
import { ref } from "vue";

export const useRagStore = defineStore("rag", () => {
  // State
  const selectedRag = ref(null);
  const ragCounts = ref(0);

  // Actions
  const setSelectedRag = (rag) => {
    selectedRag.value = rag;
    // counts 정보도 함께 저장
    if (rag && rag.counts !== undefined) {
      ragCounts.value = rag.counts;
    }
  };

  const clearSelectedRag = () => {
    selectedRag.value = null;
    ragCounts.value = 0;
  };

  const getSelectedRag = () => {
    return selectedRag.value;
  };

  const getRagCounts = () => {
    return ragCounts.value;
  };

  return {
    // State
    selectedRag,
    ragCounts,

    // Actions
    setSelectedRag,
    clearSelectedRag,
    getSelectedRag,
    getRagCounts,
  };
});
