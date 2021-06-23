import CopyImage from '../assets/images/copy.svg'
import '../styles/code.scss'

interface CodeProps {
    code: string
}

export const Code = ({ code }: CodeProps) => {

    const copyRoomCodeToClipboard = () => {
        navigator.clipboard.writeText(code)
    }

    return (
        <button className="room-code" onClick={copyRoomCodeToClipboard}>
            <div>
                <img src={CopyImage} alt="copy room code" />
            </div>
            <span>Sala {code}</span>
        </button>
    )
}