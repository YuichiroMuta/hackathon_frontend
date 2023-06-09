import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { Navigate, Link } from "react-router-dom";
import './RegistrationForm.css'; 

const Register: React.FC = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [user, setUser] = useState<any>("");

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!registerName) {
      alert("Please enter a name");
      return;
    }

    if (registerName.length > 50) {
      alert("Please enter a name shorter than 50 characters");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      await fetchUsers();
    } catch (error) {
      alert("Failed to register. Please check your input.");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch("https://curriculum-3-muta-yuichiro-hackathon-eaq52kewiq-uc.a.run.app/users", {
        method: "POST",
        body: JSON.stringify({
          email: registerEmail,
          password: registerPassword,
          username: registerName
        }),
      });

      if (!res.ok) {
        throw Error(`Failed to fetch users: ${res.status}`);
      }

      const users = await res.json();
      setUser(users);
    } catch (err) {
      console.error(err);
    }
  };

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
          <div className="slack-registration">
            <h1 className="slack-registration__title">新規登録</h1>
            <form className="slack-registration__form" onSubmit={handleRegisterSubmit}>
              <div className="slack-registration__field">
                <label className="slack-registration__label" htmlFor="email">メールアドレス</label>
                <input
                  className="slack-registration__input"
                  id="email"
                  name="email"
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                />
              </div>
              <div className="slack-registration__field">
                <label className="slack-registration__label" htmlFor="password">パスワード</label>
                <input
                  className="slack-registration__input"
                  id="password"
                  name="password"
                  type="password"
                  value={registerPassword}
                  autoComplete="new-password"
                  onChange={(e) => setRegisterPassword(e.target.value)}
                />
              </div>
              <div className="slack-registration__field">
                <label className="slack-registration__label" htmlFor="name">名前</label>
                <input
                  className="slack-registration__input"
                  id="name"
                  name="name"
                  type="name"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                />
              </div>
              <button className="slack-registration__button" type="button" onClick={handleRegisterSubmit}>
                登録する
              </button>
              <p>
                ログインは<Link className="slack-registration__link" to={`/login/`}>こちら</Link>
              </p>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default Register;
