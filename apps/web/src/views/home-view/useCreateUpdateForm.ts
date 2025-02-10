import { FormModel } from "@/api/memory-spiral.api";
import { toReactive, useToggle } from "@vueuse/core";
import { FormInstance } from "ant-design-vue";
import { computed, reactive, ref } from "vue";

export const useCreateUpdateForm = (initModel?: FormModel) => {
  const isUpdate = computed(() => !!initModel);
  const isCreate = computed(() => !isUpdate.value);
  const [modalVisible, setModalVisible] = useToggle(false);
  const modalTitle = computed((): string => {
    if (isCreate.value) {
      return "创建词条";
    }
    if (isUpdate.value) {
      return "更新词条";
    }
    throw new Error();
  });

  const onModalOpen = () => {
    setModalVisible(true);
  };

  const onModalClose = () => {
    setModalVisible(false);
  };

  const getInitModel = (): FormModel => {
    if (initModel) {
      return structuredClone(initModel);
    } else {
      return {
        name: "",
        content: "",
        link: null,
      };
    }
  };

  const model = reactive<FormModel>(getInitModel());

  const reset = () => {
    Object.assign(model, getInitModel());
  };

  const formRef = ref<FormInstance | null>(null);

  return toReactive({
    reset,
    formRef,
    model,
    modal: toReactive({
      visible: modalVisible,
      open: onModalOpen,
      close: onModalClose,
      title: modalTitle,
    }),
  });
};
