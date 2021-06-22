import { ButtonHTMLAttributes } from "react"
import '../styles/button.scss'

export const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button className="button" {...props}></button>
    )
}