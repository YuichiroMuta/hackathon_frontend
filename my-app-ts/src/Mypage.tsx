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
                  新しくチャンネルに入りたい・作りたい方は<Link className="slack-mypage__link" to={`https://forms.gle/nCVQLxewJPEHywD48`}>こちら</Link>
                </p>
              </div>
            </>
          )}
        </>
      )}
    </>
  );}

export default Mypage;

/*
import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate, Navigate, Link } from "react-router-dom";


const Mypage: React.FC = () => {
  const [user, setUser] = useState<any>("");
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/login/");
  };


  //ボタン(「チャンネルを選択」)を押すとemail情報をサーバに送り、getuserchannelコンポーネントを処理するようにしたい

  return (
    <>
      {!loading && (
        <>
          {!user ? (
            <Navigate to={`/login/`} />
          ) : (
            <>
              <h1>マイページ</h1>
              <p>{user && user.email}</p>
              <button onClick={logout}>ログアウト</button>
              <p>
              チャンネル選択は<Link to={`/getUserChannels/`}>こちら</Link>
            </p>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Mypage;
*/