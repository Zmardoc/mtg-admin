import { useRouter } from 'vue-router'

function useRedirect() {
  const { replace, currentRoute } = useRouter()

  function redirectToDashboard() {
    replace({
      name: 'index',
      params: { cardSearch: currentRoute.value.params.cardSearch },
    })
  }

  return {
    redirectToDashboard,
  }
}

export default useRedirect
