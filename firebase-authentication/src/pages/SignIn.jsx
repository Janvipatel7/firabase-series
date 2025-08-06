import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { app } from "../config/firebase"
import { useState } from "react"

const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider();
const SignIn = () => {

    const [input, setInput] = useState({
        email: "", password: ""
    })

    const signInUser = () => {
        signInWithEmailAndPassword(auth, input.email, input.password)
            .then((user) => {
                console.log(user.user.accessToken)

            })

    }

    const signGoogle = async () => {
        try {
            let res = await signInWithPopup(auth, googleProvider);
            console.log(res.user);
        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <div>

            <div>
                <label htmlFor="email"> Email</label>
                <input type="email" id="email" value={input.email} onChange={(e) => { setInput({ ...input, [e.target.id]: e.target.value }) }} />
            </div>
            <br />
            <div>
                <label htmlFor="password"> Password </label>
                <input type="password" id="password" value={input.password} onChange={(e) => { setInput({ ...input, [e.target.id]: e.target.value }) }} />
            </div>
            <br />
            <button onClick={signInUser}>Sign Up</button>
            <button onClick={signGoogle}>Sign In With Google</button>

        </div>
    )
}

export default SignIn