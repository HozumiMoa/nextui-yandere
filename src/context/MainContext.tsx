/* import { ReactNode, createContext, useContext, useReducer } from 'react'

interface State {
  task: any // 你需要替换为实际的类型
}

interface Action {
  type: string
  payload?: any // 你需要替换为实际的类型
}

const MainContext = createContext<{
  state: State
  dispatch: React.Dispatch<Action>
} | null>(null)

const initialState: State = {
  task: {},
}

function mainReducer(state: State, action: Action): State {
  return {
    task: taskReducer(state.task, action),
  }
}

export function MainProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(mainReducer, initialState)

  return (
    <MainContext.Provider value={{ state, dispatch }}>
      {children}
    </MainContext.Provider>
  )
}

export function useMain() {
  const context = useContext(MainContext)
  if (!context) {
    throw new Error('useMain must be used within a MainProvider')
  }
  return context
}
 */
