import Login from '../pages/Login'
import Container from '../pages/Container'

export default [
  { path: '/login', name: 'App', component: Login },
  { path: '/index', name: 'Home', component: Container, auth: true },
  { path: '/index2', name: 'Home', component: Container, auth: true }
]
