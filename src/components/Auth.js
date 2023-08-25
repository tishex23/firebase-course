import React from 'react'
import { auth } from '../config/firebase'
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';

function Auth() {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("")

  const signIn = async () => {
      try {
        await createUserWithEmailAndPassword(auth, email, password)
      }catch(err){
        console.log(err)
      }
  }

const signOutFrom = async () => {
  try{
    await signOut(auth)
  }catch(err){
    console.log(err)
  }
}

  return (
    <div>
        <input placeholder='Email...' 
        onChange={(e) => setEmail(e.target.value)}
        />
        <input placeholder='Password...' 
        type='password'
        onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={signIn}>sign in</button>
        <button onClick={signOutFrom} >Log Out</button>
    </div>
  )
}

export default Auth