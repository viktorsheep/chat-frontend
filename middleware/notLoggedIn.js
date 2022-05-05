export default function (context) {
  if (context.$auth.loggedIn) {
    context.$auth.loggedIn && context.$auth.user.user_role_id === 1
      ? context.redirect('/admin/dashboard')
      : context.redirect('/message')
  }
}
