import Illustration from '../assets/images/illustration.svg'
import Logo from '../assets/images/logo.svg'
import GoogleIcon from '../assets/images/google-icon.svg'
import '../styles/auth.scss'
import { Button } from '../components/Button'
import { useHistory } from 'react-router-dom'
import { firebase, auth, database } from '../services/firebase'
import { useAuth } from '../providers/AuthProvider'
import { FormEvent } from 'react'
import { useState } from 'react'

export const Home = () => {

    const [roomCode, setRoomCode] = useState('')

    const history = useHistory()
    const { signInWithGoogle, user } = useAuth()

    const handleCreateRoom = async () => {

        if(!user) {
            await signInWithGoogle()
        }
        
        history.push('/rooms/new')
    }

    const handleJoinRoom = async (e: FormEvent) => {
        e.preventDefault()

        if (roomCode.trim() === '') {
            return
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get()

        if (!roomRef.exists) {
            alert('Room does not exist!')
            return
        }

        history.push(`rooms/${roomCode}`)
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
                    <form onSubmit={handleJoinRoom}>
                        <input type="text" placeholder="Digite o código da sala"
                        onChange={e => setRoomCode(e.target.value)} value={roomCode} />
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}