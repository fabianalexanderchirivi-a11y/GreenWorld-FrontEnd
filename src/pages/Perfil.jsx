import UserAccountPanel from '../components/UserAccountPanel'
import usePageTitle from '../hooks/usePageTitle'
import '../styles/admin.css'

export default function Perfil() {
  usePageTitle('Perfil')

  return <UserAccountPanel mode="profile" />
}
