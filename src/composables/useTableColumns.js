// composables/useTableColumns.js
import { h } from "vue";
import { createColumnHelper } from "@tanstack/vue-table";
import ContextMenu from "@/components/ContextMenu.vue";

// 파일 타입별 아이콘 import
import documentIcon from "@/assets/icons/document-icon.svg";
import pdfIcon from "@/assets/icons/pdf-icon.svg";
import wordIcon from "@/assets/icons/word-icon.svg";
import excelIcon from "@/assets/icons/excel-icon.svg";

export function useTableColumns() {
  const columnHelper = createColumnHelper();

  // 파일 타입별 아이콘 매핑 함수
  const getFileTypeIcon = (fileType) => {
    const iconMap = {
      document: documentIcon,
      pdf: pdfIcon,
      word: wordIcon,
      excel: excelIcon,
    };
    return iconMap[fileType] || pdfIcon;
  };

  // 기본 문서 테이블 컬럼 생성
  const createDocumentTableColumns = (options = {}) => {
    const { onFileNameClick = () => {}, onContextMenuClick = () => {} } =
      options;

    return [
      columnHelper.accessor("name", {
        header: () => "이름",
        size: 450,
        cell: (info) => {
          const row = info.row.original;
          return h(
            "div",
            { class: "flex items-center justify-between gap-4" },
            [
              h("div", { class: "flex items-center gap-4" }, [
                h("img", {
                  src: getFileTypeIcon(row.fileType),
                  alt: `${row.fileType} 파일`,
                  class: "w-6 h-6",
                }),
                h(
                  "span",
                  {
                    class:
                      "text-gray-900 font-medium group-hover:text-blue-500 group-hover:underline group-hover:font-semibold cursor-pointer",
                    onClick: () => onFileNameClick(row),
                  },
                  info.getValue()
                ),
              ]),
              h(ContextMenu, {
                menuItems: [
                  {
                    label: "이름바꾸기",
                    action: () => {
                      onContextMenuClick("rename", info.row.original);
                    },
                    activeClass: "bg-neutral-50",
                  },
                  {
                    label: "삭제",
                    action: () => {
                      onContextMenuClick("delete", info.row.original);
                    },
                    activeClass: "bg-blue-50",
                  },
                ],
                buttonClass:
                  "opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded transition-all",
                iconClass: "w-4 h-4",
                menuPosition: "left",
                onItemClick: (item) => {
                  console.log("Table menu item clicked:", item.label);
                },
              }),
            ]
          );
        },
        enableSorting: true,
      }),
      columnHelper.accessor("modifiedDate", {
        header: () => "수정된 날짜",
        size: 200,
        cell: (info) =>
          h("span", { class: "text-gray-900 font-normal" }, info.getValue()),
        enableSorting: true,
      }),
      columnHelper.accessor("modifiedBy", {
        header: () => "수정한 사람",
        size: 240,
        cell: (info) =>
          h("span", { class: "text-gray-900 font-normal" }, info.getValue()),
        enableSorting: true,
      }),
      columnHelper.accessor("fileSize", {
        header: () => "파일 크기",
        size: 218,
        cell: (info) =>
          h("span", { class: "text-gray-600 font-normal" }, info.getValue()),
        enableSorting: false,
      }),
      columnHelper.accessor("sharing", {
        header: () => "공유",
        size: 218,
        cell: (info) => {
          return h(
            "span",
            { class: "text-gray-900 font-normal" },
            info.getValue()
          );
        },
        enableSorting: false,
      }),
    ];
  };

  // 다른 타입의 테이블 컬럼도 여기에 추가 가능
  const createUserTableColumns = () => {
    // 사용자 테이블용 컬럼
    return [
      columnHelper.accessor("name", {
        header: () => "이름",
        size: 200,
        cell: (info) =>
          h("span", { class: "text-gray-900 font-medium" }, info.getValue()),
        enableSorting: true,
      }),
      columnHelper.accessor("email", {
        header: () => "이메일",
        size: 300,
        cell: (info) => h("span", { class: "text-gray-600" }, info.getValue()),
        enableSorting: true,
      }),
      // 추가 컬럼...
    ];
  };

  return {
    createDocumentTableColumns,
    createUserTableColumns,
    getFileTypeIcon,
  };
}
