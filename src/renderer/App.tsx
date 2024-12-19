import { Provider } from 'react-redux'
import './App.css'
import store from './store/store'
import { Container} from '@mui/material'
import HabitsList from './components/habits-list'
import HabitsStat from './components/habits-stat'
import React from 'react'

function App() {
  return (
    <Provider store={store}>
        <Container maxWidth="md">
            
            <HabitsList />
            <HabitsStat />
        </Container>
    </Provider>
  )
}

export default App
