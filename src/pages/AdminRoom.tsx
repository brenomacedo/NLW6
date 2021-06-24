import LogoImage from '../assets/images/logo.svg'
import DeleteImage from '../assets/images/delete.svg'
import { useHistory, useParams } from 'react-router-dom'
import { Button } from '../components/Button'
import { Code } from '../components/Code'
import { Question } from '../components/Question'
import { useRoom } from '../hooks/useRoom'
import '../styles/room.scss'
import { database } from '../services/firebase'

interface RoomParams {
    id: string
}

export const AdminRoom = () => {

    const { id: roomId } = useParams<RoomParams>()

    const { questions, title } = useRoom(roomId)

    const history = useHistory()

    const handleEndRoom = async () => {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date()
        })

        history.push('/')
    }

    const handleDeleteQuestion = async (questionId: string) => {
        if(window.confirm('Deseja realmente remover essa pergunta?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
        }

    }

    const renderQuestions = () => {
        return questions.map(({ author, content, id }) => (
            <Question
                key={id}
                author={author}
                content={content}
            >
                <button type="button" onClick={() => handleDeleteQuestion(id)}>
                    <img src={DeleteImage} alt="deletar imagem" />
                </button>
            </Question>
        ))
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={LogoImage} alt="logo" />
                    <div>
                        <Code code={roomId} />
                        <Button onClick={handleEndRoom} isOutlined>Encerrar sala</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala: {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

                <div className="question-list">
                    {renderQuestions()}
                </div>
            </main>
        </div>
    )
}