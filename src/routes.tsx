import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AdminRoom } from './pages/AdminRoom'
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
                    <Route path='/admin/rooms/:id' component={AdminRoom} />
                </Switch>
            </AuthProvider>
        </BrowserRouter>
    )
}