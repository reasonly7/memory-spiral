import { FormModel, memorySpiralApi } from "@/api/memory-spiral.api";
import { toReactive, useToggle } from "@vueuse/core";
import { FormInstance } from "ant-design-vue";
import { computed, reactive, ref } from "vue";

export const useCreateUpdateForm = (initModel?: FormModel) => {
  const isUpdate = computed(() => !!initModel);
  const isCreate = computed(() => !isUpdate.value);
  const [modalVisible, setModalVisible] = useToggle(false);
  const modalTitle = computed((): string => {
    if (isCreate.value) {
      return "Create an entry";
    }
    if (isUpdate.value) {
      return "Update an entry";
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
        count: 0,
      };
    }
  };

  const model = reactive<FormModel>(getInitModel());

  const reset = () => {
    Object.assign(model, getInitModel());
  };

  const formRef = ref<FormInstance | null>(null);

  const create = async (): Promise<boolean> => {
    const newItem = await memorySpiralApi.create(model);
    if (!newItem) {
      return false;
    }

    return true;
  };

  return toReactive({
    reset,
    formRef,
    model,
    create,
    modal: toReactive({
      visible: modalVisible,
      open: onModalOpen,
      close: onModalClose,
      title: modalTitle,
    }),
  });
};
