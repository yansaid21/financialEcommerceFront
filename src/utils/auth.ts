export function handleOAuthRedirect() {
  if (typeof window === 'undefined') return

  const url = new URL(window.location.href)
  const token = url.searchParams.get('token')

  if (token) {
    console.log("token al llega",token);
    
    localStorage.setItem('token', token)
    //window.location.href = '/dashboard'
  }
}
