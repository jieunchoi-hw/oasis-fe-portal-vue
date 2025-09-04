<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <!-- Page Header -->
        <div class="text-center mb-12">
          <div class="inline-flex items-center justify-center w-24 h-24 bg-green-600 rounded-full mb-6">
            <FolderIcon class="h-12 w-12 text-white" />
          </div>
          
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            문서 저장소
          </h1>
          
          <p class="text-xl text-gray-600 dark:text-gray-300">
            문서 관리 및 저장 시스템
          </p>
        </div>

        <!-- Placeholder Content -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
          <div class="mb-6">
            <WrenchScrewdriverIcon class="h-16 w-16 text-gray-400 mx-auto" />
          </div>
          
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            개발 예정
          </h3>
          
          <p class="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            문서 저장소 기능은 현재 개발 중입니다.<br>
            곧 다양한 문서 관리 기능을 만나보실 수 있습니다.
          </p>

          <!-- 기능 미리보기 -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div 
              v-for="feature in upcomingFeatures"
              :key="feature.title"
              class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <component 
                :is="feature.icon" 
                class="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-3" 
              />
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
                {{ feature.title }}
              </h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { 
  FolderIcon,
  WrenchScrewdriverIcon,
  CloudArrowUpIcon,
  ShareIcon,
  MagnifyingGlassIcon,
  DocumentDuplicateIcon,
  LockClosedIcon,
  TagIcon
} from '@heroicons/vue/24/outline';

const upcomingFeatures = ref([
  {
    title: "파일 업로드",
    description: "드래그 앤 드롭으로 쉬운 파일 업로드",
    icon: CloudArrowUpIcon
  },
  {
    title: "공유 기능",
    description: "팀원들과 안전한 문서 공유",
    icon: ShareIcon
  },
  {
    title: "고급 검색",
    description: "내용 기반 스마트 문서 검색",
    icon: MagnifyingGlassIcon
  },
  {
    title: "버전 관리",
    description: "문서 변경 이력 추적 및 복원",
    icon: DocumentDuplicateIcon
  },
  {
    title: "보안 설정",
    description: "세밀한 접근 권한 및 암호화",
    icon: LockClosedIcon
  },
  {
    title: "태그 시스템",
    description: "효율적인 문서 분류 및 관리",
    icon: TagIcon
  }
]);
</script>
