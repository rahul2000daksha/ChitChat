import { useState } from "react";
import axios from "axios";
import { IoLogoSnapchat } from "react-icons/io";

const AuthPage = (props) => {
  const [username, setUsername] = useState();
  const [secret, setSecret] = useState();
  const [email, setEmail] = useState();
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [log, setLog] = useState(false);
  const [sign, setSign] = useState(true);

  const onLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", { username, secret })
      .then((r) => props.onAuth({ ...r.data, secret })) // NOTE: over-ride secret
      .catch((e) => console.log(JSON.stringify(e.response.data)));
  };

  const onSignup = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/signup", {
        username,
        secret,
        email,
        first_name,
        last_name,
      })
      .then((r) => props.onAuth({ ...r.data, secret })) // NOTE: over-ride secret
      .catch((e) => console.log(JSON.stringify(e.response.data)));
  };



  return (
    <div className="login-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >

      <div className="card" style={{ backgroundColor: 'black', padding: '20px', borderRadius: '20px',display:'flex',flexDirection:'column',alignItems:'center' }} >
        {/* Login Form */}
        <p style={{position:'absolute',fontSize:'30px',fontWeight:'800',top:'-25px',color:'lightgreen',fontFamily:"cursive", display:'flex',alignItems:'center', justifyContent:'center'}}><IoLogoSnapchat style={{fontSize:'30px'}}/>ChitChat <IoLogoSnapchat style={{fontSize:'30px'}}/></p>
        
        {log && (<form onSubmit={onLogin}>
          <div className="title">Login</div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="secret"
            placeholder="Password"
            onChange={(e) => setSecret(e.target.value)}
          />
          <button type="submit">LOG IN</button>
        </form>)}

        {/* Sign Up Form */}
        {sign && (<form onSubmit={onSignup}>
          <div className="title">Sign Up</div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="secret"
            placeholder="Password"
            onChange={(e) => setSecret(e.target.value)}
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            name="first_name"
            placeholder="First name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last name"
            onChange={(e) => setLastName(e.target.value)}
          />
          <button type="submit">SIGN UP</button>
        </form>)}
        {sign ? (<p style={{color:'white',fontSize:'10px'}}>If already have an account ? <button onClick={() => { setLog(true); setSign(false) }}>Login</button></p>) : (<p style={{color:'white',fontSize:'10px'}}>If new, create an account ? <button onClick={() => { setLog(false); setSign(true) }}>SignUp</button></p>)}

      </div>

      <style>{`
      .login-page { width: 100vw; height: 100vh;  background: url('Back.jpg') center/cover no-repeat fixed; }
      .card { width: 200px; position: relative; text-align: center; }
      .title { padding-top: 32px; font-size: 22px; color: white; font-weight: 700; }
      input { width: calc(100% - 16px); margin-top: 12px; padding: 8px; background-color: #e6f7ff; outline: none; border: 1px solid #e6f7ff; }
      button { margin-top: 12px; width: 100%; padding: 8px; }
      `}</style>
    </div>
  );
};

export default AuthPage;
