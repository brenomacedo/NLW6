import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Home } from './pages/Home'
import { NewRoom } from './pages/NewRoom'
import { Room } from './pages/Room'
import { AuthProvider } from './providers/AuthProvider'

export const Routes = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/rooms/new' exact component={NewRoom} />
                    <Route path='/rooms/:id' component={Room} />
                </Switch>
            </AuthProvider>
        </BrowserRouter>
    )
}