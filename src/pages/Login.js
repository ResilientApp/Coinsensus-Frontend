import Header from "../components/auth/Header"
import Login from "../components/auth/Login"

export default function LoginPage({onAuthenticate}) {
    return (
        <>
            <Header
                heading="Login to your account"
                paragraph="Don't have an account yet? "
                linkName="Signup"
                linkUrl="/signup"
            />
            <Login onAuthenticate={onAuthenticate}/>
        </>
    )
}