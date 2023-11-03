import { useRouter } from 'vue-router'

function useRedirect() {
  const { replace, currentRoute } = useRouter()

  function redirectToDashboard() {
    replace({
      name: 'index',
      query: { query: currentRoute.value.query.query },
    })
  }

  return {
    redirectToDashboard,
  }
}

export default useRedirect
