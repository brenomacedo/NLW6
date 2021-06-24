import { FormEvent, useState } from 'react'
import { useParams } from 'react-router-dom'
import LogoImage from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { Code } from '../components/Code'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'
import { Question } from '../components/Question'
import '../styles/room.scss'
import { useRoom } from '../hooks/useRoom'

interface RoomParams {
    id: string
}

export const Room = () => {

    const { user } = useAuth()
    const [newQuestion, setNewQuestion] = useState('')
    const { id: roomId } = useParams<RoomParams>()

    const { questions, title } = useRoom(roomId)

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

    const renderQuestions = () => {
        return questions.map(({ author, content, id }) => (
            <Question
                key={id}
                author={author}
                content={content}
            />
        ))
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

                <div className="question-list">
                    {renderQuestions()}
                </div>
            </main>
        </div>
    )
}