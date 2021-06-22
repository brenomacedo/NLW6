import Illustration from '../assets/images/illustration.svg'
import Logo from '../assets/images/logo.svg'
import GoogleIcon from '../assets/images/google-icon.svg'
import '../styles/auth.scss'
import { Button } from '../components/Button'
import { useHistory } from 'react-router-dom'
import { firebase, auth } from '../services/firebase'

export const Home = () => {

    const history = useHistory()

    const handleCreateRoom = () => {

        const provider = new firebase.auth.GoogleAuthProvider() 
        auth.signInWithPopup(provider).then(result => {
            
        })
        history.push('/rooms/new')
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={Illustration} alt="illustration" />
                <strong>Crie salas de Q\&A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className='main-content'>
                    <img src={Logo} alt="Logo" />
                    <button type="button" onClick={handleCreateRoom} className="create-room">
                        <img src={GoogleIcon} alt="Google" />
                        Crie sua sala com o google
                    </button>
                    <div className="separator">ou entre uma sala</div>
                    <form>
                        <input type="text" placeholder="Digite o código da sala" />
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}