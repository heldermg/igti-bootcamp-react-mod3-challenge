import { Box, Button, Container, makeStyles, TextField } from "@material-ui/core"
import { AxiosError } from "axios"
import { useState } from "react"
import { IUser } from "../components"
import { apiLogin } from "../services/apiService"

const useStyles = makeStyles({
  error: {
    backgroundColor: "rgb(253,236,234)",
    borderRadius: "4px",
    padding: "16px",
    margin: "16px 0"

  }
})

interface ILoginPageProps {
  onSignIn: (user: IUser) => void;
}

function LoginPage({ onSignIn }: ILoginPageProps) {
  const classes = useStyles();
  const [email, setEmail] = useState("usuario@email.com")
  const [password, setPassword] = useState("1234")
  const [error, setError] = useState("")

  function handleSignIn(e: React.FormEvent) {
    e.preventDefault()
    async function signIn() {
      try {
        const user = await apiLogin(email, password)
        setError("")
        onSignIn(user)

      } catch (err: unknown) {
        const typedError = err as AxiosError
        throw new Error(typedError.response?.data.message)
      }
    }
    signIn()
  }

  return (
    <Container maxWidth="sm">
      <h1>Expenses</h1>
      <p>Enter email and password to log into the system. To test, use email <kbd>usuario@email.com</kbd> and password <kbd>1234</kbd></p>
      <form onSubmit={handleSignIn}>
        <TextField
          margin="normal"
          label="E-mail"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
        />
        <TextField
          type="password"
          margin="normal"
          label="Password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
        />
        <Box textAlign="right" marginTop="16px">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            >
            Sign In
          </Button>
        </Box>
        {error && <div className={classes.error}>{error}</div>}
      </form>
    </Container>
  )
}

export { LoginPage }
