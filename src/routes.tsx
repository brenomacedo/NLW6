import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Home } from './pages/Home'
import { NewRoom } from './pages/NewRoom'
import { AuthProvider } from './providers/AuthProvider'

export const Routes = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/rooms/new' component={NewRoom} />
                </Switch>
            </AuthProvider>
        </BrowserRouter>
    )
}