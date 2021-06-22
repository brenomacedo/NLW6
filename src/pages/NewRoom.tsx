import Illustration from '../assets/images/illustration.svg'
import Logo from '../assets/images/logo.svg'
import GoogleIcon from '../assets/images/google-icon.svg'
import '../styles/auth.scss'
import { Button } from '../components/Button'
import { Link } from 'react-router-dom'

export const NewRoom = () => {
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
                    <h2>Criar uma nova sala</h2>
                    <br />
                    <form>
                        <input type="text" placeholder="Nome da sala" />
                        <Button type="submit">Criar uma sala</Button>
                        <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>
                    </form>
                </div>
            </main>
        </div>
    )
}