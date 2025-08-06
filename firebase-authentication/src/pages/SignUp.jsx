import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import { useState } from "react";
import { app } from "../config/firebase";

const auth = getAuth(app);

const SignUp = () => {
    const [input , setInput] = useState({
        email : "" , password : ""
    })

  const signUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(auth , input.email , input.password);
      console.log(res);
    }catch(err){
      console.log(err);
      alert("already using email")
    }
    
    
  }

  return (
    <div>
     
            <div>
                <label htmlFor="email"> Email</label>
                <input type="email" id="email" value={input.email} onChange={(e) => {setInput({...input , [e.target.id]: e.target.value})}}/>
            </div>
            <br />
            <div>
                <label htmlFor="password"> Password </label>
                <input type="password" id="password" value={input.password} onChange={(e) => {setInput({...input , [e.target.id]: e.target.value})}}/>
            </div>
            <br />
            <button onClick={signUp}>Sign Up</button>
       
        
    </div>
  )
}



export default SignUp