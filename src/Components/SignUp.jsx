import React, { useState } from 'react';
import './SignUp.css';
import { createUserWithEmailAndPassword ,updateProfile} from '@firebase/auth';
import { auth } from '../Firebase/Firebase';
function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const value ={
      username,email,password,confirmPassword,termsAccepted
    }
    console.log(value);
    try {
      const response = await fetch('https://shopping-fc0d9-default-rtdb.firebaseio.com/Users.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
      });
  
      if (!response.ok) {
        throw new Error('Something went wrong while submitting the form.');
      }
  
      console.log('Form submitted successfully!');
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setTermsAccepted(false);
    } catch (error) {
      console.error(error);
    }
    createUserWithEmailAndPassword(auth,email,password).then((res)=>
    {
      const user = res.user;
      updateProfile(user,
      {
        displayName:value.username,
      })
      console.log(res)
    }).catch((err)=>
    {
      console.log(err);
    });
  };
  

  const handleReset = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setTermsAccepted(false);
  };

  return (
    <div className='container'>
      
      <form onSubmit={handleSubmit} className='card'>
        <div >
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
        </div>
        <div>
        <input
            type="checkbox"
            id="termsAccepted"
            checked={termsAccepted}
            onChange={(event) => setTermsAccepted(event.target.checked)}
            required
            placeholder='I accept the terms and conditions'
          />
          <label htmlFor="termsAccepted">I accept the terms and conditions</label>
          </div>
        <div className='buttonGroup'>
          <button type="reset" onClick={handleReset}>Reset</button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
