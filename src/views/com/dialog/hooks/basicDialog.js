import { ref } from 'vue'

export const basicDialog = () => {
  const basicDialogStatus = ref(false)

  const openBasicDialog = () => (basicDialogStatus.value = !basicDialogStatus.value)

  const closeBasicDialog = () => (basicDialogStatus.value = !basicDialogStatus.value)

  return {
    basicDialogStatus,
    openBasicDialog,
    closeBasicDialog
  }
}
