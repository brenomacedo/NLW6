import Illustration from '../assets/images/illustration.svg'
import Logo from '../assets/images/logo.svg'
import '../styles/auth.scss'
import { Button } from '../components/Button'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { FormEvent } from 'react'
import { useState } from 'react'
import { database } from '../services/firebase'

export const NewRoom = () => {

    const [newRoom, setNewRoom] = useState('')

    const history = useHistory()

    const { user } = useAuth()

    const handleCreateRoom = async (e: FormEvent) => {
        e.preventDefault()

        if (newRoom.trim() === '') {
            return
        }

        const roomRef = database.ref('rooms')
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id
        })

        history.push(`/rooms/${firebaseRoom.key}`)
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
                    <h2>Criar uma nova sala</h2>
                    <br />
                    <form onSubmit={handleCreateRoom}>
                        <input type="text" placeholder="Nome da sala"
                        value={newRoom} onChange={e => setNewRoom(e.target.value)} />
                        <Button type="submit">Criar uma sala</Button>
                        <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>
                    </form>
                </div>
            </main>
        </div>
    )
}