import { useQuasar } from 'quasar'

function useNotify() {
  const { notify } = useQuasar()

  function notifySuccess(message: string) {
    notify({
      message,
      color: 'positive',
      icon: 'check',
      timeout: 1000,
    })
  }

  function notifyError(message: string) {
    notify({
      message,
      color: 'negative',
      icon: 'lock',
      timeout: 1000,
    })
  }

  function notifyWelcome(message: string) {
    notify({
      message,
      color: 'dark',
      timeout: 2000,
      textColor: 'primary',
      classes: 'mtg-font-bold text-h5 q-pa-md shine',
    })
  }

  return { notifyWelcome, notifySuccess, notifyError }
}

export default useNotify
