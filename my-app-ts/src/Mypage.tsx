import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate, Navigate, Link } from "react-router-dom";
import './MyPage.css';

export let userEmail: string | null = null; 

const Mypage: React.FC = () => {
  const [user, setUser] = useState<any>("");
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        userEmail = currentUser.email; // userEmailにユーザのメールアドレスを代入
      }
    });
  }, []);

  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/login/");
  };

  return (
    <>
      {!loading && (
        <>
          {!user ? (
            <Navigate to={`/login/`} />
          ) : (
            <>
              <div className="slack-mypage">
                <h1 className="slack-mypage__title">マイページ</h1>
                <p className="slack-mypage__email">{user && user.email}</p>
                <button className="slack-mypage__logout" onClick={logout}>ログアウト</button>
                <p>
                  チャンネル選択は<Link className="slack-mypage__link" to={`/getUserChannels/`}>こちら</Link>
                </p>
                <p>
                  新しくチャンネルの作成・参加は<Link className="slack-mypage__link" to={`https://forms.gle/nCVQLxewJPEHywD48`}>こちら</Link>
                </p>
              </div>
            </>
          )}
        </>
      )}
    </>
  );}

export default Mypage;

