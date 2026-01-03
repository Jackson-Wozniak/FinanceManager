import { createContext, Route, Routes, type RouterContext } from "react-router-dom"
import AuthProvider from "./providers/AuthProvider"
import LoginPage from "./components/pages/Login/LoginPage"
import { ThemeProvider } from "@mui/material/styles"
import { DarkTheme, LightTheme } from "./theme/AppTheme"
import UserDashboard from "./components/pages/UserDashboard/UserDashboard"

function App() {
    return (
        <AuthProvider>
            <ThemeProvider theme={DarkTheme}>
                <Routes>
                    <Route path="/login" element={<LoginPage/>} />
                    <Route path="/dashboard" element={<UserDashboard/>} />
                </Routes>
            </ThemeProvider>
        </AuthProvider>
  )
}

export default App
