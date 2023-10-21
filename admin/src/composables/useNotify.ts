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

  function notifyWelcome(message: string) {
    notify({
      message,
      color: 'dark',
      timeout: 2000,
      textColor: 'primary',
      classes: 'mtg-font-bold text-h5 q-pa-md shine',
    })
  }

  function notifyPrimary(message: string) {
    notify({
      message,
      color: 'primary',
      timeout: 1000,
    })
  }

  return { notifyWelcome, notifySuccess, notifyPrimary }
}

export default useNotify
