import Header from "../components/auth/Header"
import Login from "../components/auth/Login"

export default function LoginPage({onAuthenticate}) {
    return (
        <>
        {/* <p>Login page works!</p> */}
            <Header
                heading="Login to your account"
                paragraph="Don't have an account yet? "
                linkName="Signup"
                linkUrl="/auth/signup"
            />
            <Login onAuthenticate={onAuthenticate}/>
        </>
    )
}