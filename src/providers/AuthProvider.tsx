import { useContext } from "react"
import { useState } from "react"
import { useEffect } from "react"
import { FC } from "react"
import { createContext } from "react"
import { auth, firebase } from '../services/firebase'

interface User {
    id: string
    name: string
    avatar: string
}

interface AuthProps {
    user: User | undefined
    signInWithGoogle: () => Promise<void>    
}

const AuthContext = createContext<AuthProps>({} as AuthProps)

export const AuthProvider:FC = ({ children }) => {

    const [user, setUser] = useState<User>()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(newUser => {
            if(newUser) {
                const { displayName, photoURL, uid } = newUser
    
                if(!displayName || !photoURL) {
                    throw new Error('Missing information from google account')
                }
    
                setUser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL
                })
            }
        })

        return () => {
            unsubscribe()
        }
    }, [])

    const signInWithGoogle = async () => {

        const provider = new firebase.auth.GoogleAuthProvider() 

        const result = await auth.signInWithPopup(provider)

        if(result.user) {
            const { displayName, photoURL, uid } = result.user

            if(!displayName || !photoURL) {
                throw new Error('Missing information from google account')
            }

            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL
            })
        }
        
    }

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)