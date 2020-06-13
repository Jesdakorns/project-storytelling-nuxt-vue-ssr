
export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (this.$cookies.get('_Key')) {
    this.isLogin = true
  } else {
    this.isLogin = false
    this.$router.push('/auth', () => {})
  }
}
