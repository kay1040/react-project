import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import Message from '../components/UI/Message';
import Loading from '../components/UI/Loading';

export default function AuthPage() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const prevPage = location.state?.preLocation?.pathname || '/';

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage('');
      }, 5000);
    }
  }, [message]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoading(false);
      if (user) {
        navigate('/');
      }
    });
    return unsubscribe;
  }, [navigate]);

  const errorMessage = (error) => {
    switch (error.code) {
      case 'auth/email-already-in-use':
        setMessage('此電子信箱已被註冊');
        break;
      case 'auth/invalid-email':
        setMessage('無效的電子信箱');
        break;
      case 'auth/user-not-found':
        setMessage('此電子信箱尚未註冊');
        break;
      case 'auth/wrong-password':
        setMessage('密碼錯誤');
        break;
      case 'auth/missing-password':
        setMessage('密碼不可為空');
        break;
      default:
        setMessage(error.message);
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoginForm) {
      // 登入
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate(prevPage, { replace: true });
      } catch (error) {
        errorMessage(error);
      }
    } else {
      // 註冊
      try {
        if (password !== passwordConfirmation) throw new Error('輸入密碼不一致');
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const newUser = userCredential.user;
        await setDoc(doc(db, 'users', newUser.uid), {
          uid: newUser.uid,
          email,
        });
        signOut(auth);
        setIsLoginForm(true);
        setMessage('註冊成功，請重新登入');
      } catch (error) {
        errorMessage(error);
      }
    }
  };
  if (isLoading) return <Loading />;
  return (
    <>
      {message && <Message message={message} />}
      <div className="max-w-screen-xl mx-auto my-24 xxl:my-48 flex-col flex">
        <h2 className="mb-6 text-3xl font-bold text-darkslategray text-center">
          {isLoginForm ? '會員登入' : '會員註冊'}
        </h2>
        <form className="mx-auto" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              className="input-primary w-64 h-10"
              type="email"
              placeholder="請輸入e-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              className="input-primary w-64 h-10"
              type="password"
              placeholder="請輸入密碼"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {!isLoginForm
            && (
              <div className="mb-4">
                <input
                  className="input-primary w-64 h-10"
                  type="password"
                  placeholder="確認密碼"
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
              </div>
            )}
          <div>
            <button type="submit" className="btn-primary w-64 h-10 text-base font-bold">{isLoginForm ? '登入' : '註冊'}</button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <button
            type="button"
            className="text-base text-darkslategray transition-all duration-300 hover:text-[#599b9b]"
            onClick={() => { setIsLoginForm((prevState) => !prevState); }}
          >
            {isLoginForm ? '沒有會員？點此註冊' : '已有會員？點此登入'}
          </button>
        </div>
      </div>
    </>
  );
}
