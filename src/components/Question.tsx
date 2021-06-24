import '../styles/question.scss'

interface QuestionProps {
    content: string
    author: {
        name: string
        avatar: string
    }
}

export const Question = ({ content, author: { avatar, name }}: QuestionProps) => {
    return (
        <div className="question">
            <p>
                {content}
            </p>
            <footer>
                <div className="user-info">
                    <img src={avatar} alt={name} />
                    <span>{name}</span>
                </div>
                <div></div>
            </footer>
        </div>
    )
}