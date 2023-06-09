import './LoginForm.css'; 
import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
/* 「Link」としてインポート */
import { Navigate, Link } from "react-router-dom";

const Login: React.FC = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    } catch (error) {
      alert("メールアドレスまたはパスワードが間違っています");
    }
  };

  const [user, setUser] = useState<any>();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <>
      {user ? (
        <Navigate to={`/?email=${user.email}`} />
      ) : (
        <>
          <h1>ログインページ</h1>
          <form className="slack-form" onSubmit={handleSubmit}>
  <div className="slack-form__field">
    <label className="slack-form__label">メールアドレス</label>
    <input
      className="slack-form__input"
      name="email"
      type="email"
      value={loginEmail}
      onChange={(e) => setLoginEmail(e.target.value)}
    />
  </div>
  <div className="slack-form__field">
    <label className="slack-form__label">パスワード</label>
    <input
      className="slack-form__input"
      name="password"
      type="password"
      value={loginPassword}
      onChange={(e) => setLoginPassword(e.target.value)}
    />
  </div>
  <button className="slack-form__button">ログイン</button>
  <p>
    新規登録は<Link className="slack-form__link" to={`/register/`}>こちら</Link>
  </p>
</form>
        </>
      )}
    </>
  );
};

export default Login;
