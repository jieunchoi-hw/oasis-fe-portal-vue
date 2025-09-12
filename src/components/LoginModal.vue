<template>
  <div
    v-if="showModal"
    class="fixed inset-0 bg-black/80 bg-opacity-80 flex items-center justify-center z-50"
    @click="closeModal"
  >
    <div class="bg-white rounded-lg p-8 w-96 max-w-md mx-4" @click.stop>
      <div class="text-center mb-6">
        <img
          src="@/assets/icons/oasis-logo.svg"
          alt="OASIS Logo"
          class="w-16 h-16 mx-auto mb-4"
        />
        <h2 class="text-2xl font-bold text-gray-800 mb-2">로그인</h2>
        <p class="text-gray-600">계정 정보를 입력해주세요</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label
            for="account_id"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            계정 ID
          </label>
          <input
            id="account_id"
            v-model="formData.account_id"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="계정 ID를 입력하세요"
            :disabled="isLoading"
          />
        </div>

        <div>
          <label
            for="password"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            비밀번호
          </label>
          <input
            id="password"
            v-model="formData.password"
            type="password"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="비밀번호를 입력하세요"
            :disabled="isLoading"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          :disabled="isLoading || !formData.account_id || !formData.password"
        >
          <span v-if="isLoading">로그인 중...</span>
          <span v-else>로그인</span>
        </button>
      </form>

      <div
        v-if="errorMessage"
        class="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded"
      >
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { login } from "@/api/index.js";

// 모달 상태 관리
const showModal = ref(true);
const isLoading = ref(false);

// 폼 데이터
const formData = ref({
  account_id: "",
  password: "",
});

// 에러 메시지
const errorMessage = ref("");

// 로그인 처리
const handleLogin = async () => {
  errorMessage.value = "";
  isLoading.value = true;

  try {
    const result = await login(
      formData.value.account_id,
      formData.value.password
    );

    // 로그인 응답 데이터 콘솔 출력
    console.log("로그인 응답 데이터:", result.data);

    // 로그인 성공 시 모달 닫기
    showModal.value = false;
  } catch (error) {
    errorMessage.value = "로그인 중 오류가 발생했습니다.";
    console.error("로그인 오류:", error);
  } finally {
    isLoading.value = false;
  }
};

// 모달 닫기 (ESC 키로는 닫을 수 없도록 함 - 필수 로그인)
const closeModal = () => {
  // 로그인이 필수이므로 모달을 닫지 않음
  // showModal.value = false;
};
</script>
