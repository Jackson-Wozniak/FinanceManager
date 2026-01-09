import { createContext, Navigate, Route, Routes, type RouterContext } from "react-router-dom"
import AuthProvider from "./providers/AuthProvider"
import LoginPage from "./components/pages/Login/LoginPage"
import { ThemeProvider } from "@mui/material/styles"
import { DarkTheme, LightTheme } from "./theme/AppTheme"
import UserDashboard from "./components/pages/UserDashboard/UserDashboard"
import AccountsPage from "./components/pages/AccountsPage/AccountsPage"

function App() {
    return (
        <AuthProvider>
            <ThemeProvider theme={DarkTheme}>
                <Routes>
                    <Route index element={<Navigate to="/login" replace/>}/>
                    <Route path="/login" element={<LoginPage/>} />
                    <Route path="/dashboard" element={<UserDashboard/>} />
                    <Route path="/accounts" element={<AccountsPage/>}/>
                </Routes>
            </ThemeProvider>
        </AuthProvider>
  )
}

export default App
