import Login from '../pages/Login'
import Container from '../pages/Container'

export default [
  { path: '/login', exact: true, name: 'App', component: Login },
  { path: '/index/', name: 'Home', component: Container, auth: true }
]
