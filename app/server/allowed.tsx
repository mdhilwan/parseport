/**
 * Hard coded users
 */
const allowed = [
  {
    email: 'parse.pass.port@gmail.com',
    type: 'super',
  },
]

export const GetType = (email: string) => {
  const user = allowed.find((a) => a.email === email)
  if (user) {
    return user.type
  }
  return undefined
}
