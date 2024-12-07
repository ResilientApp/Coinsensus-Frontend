import Header from "../components/auth/Header";
import Signup from "../components/auth/Signup";

export default function SignupPage({onAuthenticate}) {
    return (
        <>
            <Header
                heading="Signup to create an account"
                paragraph="Already have an account? "
                linkName="Login"
                linkUrl="/"
            />
            <Signup onAuthenticate={onAuthenticate}/>
        </>
    )
}