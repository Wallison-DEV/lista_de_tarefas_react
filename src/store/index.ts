import { configureStore } from '@reduxjs/toolkit'

import filtroReducer from './reducers/filtro'

import tarefasReducer from './reducers/tarefa'

const store = configureStore({
  reducer: {
    tarefas: tarefasReducer,
    filtro: filtroReducer
  }
})

export type RootReducer = ReturnType<typeof store.getState>

export default store
