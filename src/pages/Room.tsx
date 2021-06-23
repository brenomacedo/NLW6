import { useEffect } from 'react'
import { FormEvent, useState } from 'react'
import { useParams } from 'react-router-dom'
import LogoImage from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { Code } from '../components/Code'
import { useAuth } from '../providers/AuthProvider'
import { database } from '../services/firebase'
import '../styles/room.scss'

interface RoomParams {
    id: string
}

interface Question {
    id: string
    author: {
        name: string
        avatar: string
    }
    content: string
    isAnswered: boolean
    isHighlighted: boolean
}

type FirebaseQuestions = Record<string, {
    author: {
        name: string
        avatar: string
    }
    content: string
    isAnswered: boolean
    isHighlighted: boolean
}>

export const Room = () => {

    const { user } = useAuth()

    const [newQuestion, setNewQuestion] = useState('')
    const [questions, setQuestions] = useState<Question[]>([])
    const [title, setTitle] = useState('')

    const { id: roomId } = useParams<RoomParams>()

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`)

        roomRef.once('value', room => {
            const databaseRoom = room.val()
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {}

            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => ({
                id: key,
                content: value.content,
                author: value.author,
                isHighlighted: value.isHighlighted,
                isAnswered: value.isAnswered
            }))

            setTitle(databaseRoom.title)
            setQuestions(parsedQuestions)
        })
    }, [roomId])

    const handleSendQuestion = async (e: FormEvent) => {

        e.preventDefault()

        if (newQuestion.trim() === '') {
            return
        }

        if(!user) {
            throw new Error('You must be logged in')
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar
            },
            isHighlighted: false,
            isAnswered: false
        }

        await database.ref(`rooms/${roomId}/questions`).push(question)

        setNewQuestion('')
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={LogoImage} alt="logo" />
                    <Code code={roomId} />
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala: {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea value={newQuestion} onChange={e => setNewQuestion(e.target.value)}
                    placeholder="O que você quer perguntar?" />
                    <div className="form-footer">
                        {user ? (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
                        )}
                        <Button type="submit" disabled={!user}>Enviar pergunta</Button>
                    </div>
                </form>
            </main>
        </div>
    )
}