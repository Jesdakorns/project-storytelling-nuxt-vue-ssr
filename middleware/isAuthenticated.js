export default (context) => {
  if (context.app.$cookies.get('_Key')) {
    return context.redirect('/')
  }
}
