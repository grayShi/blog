import Login from '../pages/Login'
import MenuManagement from '../component/MenuManagement'

export default [
  { path: '/login', exact: true, name: 'Login', component: Login },
  { path: '/index/', name: 'Home', component: MenuManagement, auth: true }
]
