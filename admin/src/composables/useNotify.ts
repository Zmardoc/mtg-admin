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

  return { notifySuccess }
}

export default useNotify
