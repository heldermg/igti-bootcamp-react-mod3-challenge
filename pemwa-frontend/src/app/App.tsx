import { useEffect, useState } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { IUser, authContext } from "./components"
import { LoginPage } from "./pages/LoginPage"
import MainPage from "./pages/MainPage"
import { apiGetUserAth } from "./services/apiService"
import { getTodayYearMonthISO } from "./util/util"

function App() {
  const yearMonth = getTodayYearMonthISO()
  const [user, setUser] = useState<IUser | null>(null)

  useEffect(() => {
    async function getUser() {
      try {
        const userAth = await apiGetUserAth()
        setUser(userAth)
      } catch (err) {
        setUser(null)
      }
    }

    getUser()
  }, [])

  function onSignOut() {
    setUser(null)
  }

  const RootRedirect = () => {
    return <Navigate replace to={`/expenses/${yearMonth}`} />
  }

  if (!user) {
    return (
      <LoginPage onSignIn={setUser} />
    )
  }

  return (
    <authContext.Provider value={{user, onSignOut}}>
      <BrowserRouter>
        <Routes>
          <Route path="/expenses/:yearMonth" element={<MainPage />} />
          <Route path="/" element={<RootRedirect />} />
        </Routes>
      </BrowserRouter>
    </authContext.Provider>
  )
}

export default App
