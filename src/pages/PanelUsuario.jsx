import UserAccountPanel from '../components/UserAccountPanel'
import usePageTitle from '../hooks/usePageTitle'
import '../styles/admin.css'

export default function PanelUsuario() {
  usePageTitle('Panel Usuario')

  return <UserAccountPanel mode="panel" />
}
