import { Route, Routes } from "react-router-dom"
import AuthProvider from "./providers/AuthProvider"
import LoginPage from "./components/pages/Login/LoginPage"

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="login" element={<LoginPage/>} />
            </Routes>
        </AuthProvider>
  )
}

export default App
