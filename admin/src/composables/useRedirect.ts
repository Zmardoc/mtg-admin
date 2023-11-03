import { useRouter } from 'vue-router'

function useRedirect() {
  const { replace, currentRoute } = useRouter()

  function redirectToDashboard() {
    replace({
      name: 'index',
      query: { cardSearch: currentRoute.value.query.cardSearch },
    })
  }

  return {
    redirectToDashboard,
  }
}

export default useRedirect
