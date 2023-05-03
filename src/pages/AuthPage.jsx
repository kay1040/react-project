import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import Message from '../components/UI/Message';
import Loading from '../components/UI/Loading';
import useErrorMessage from '../hooks/useErrorMessage';
import { mergeCartData, saveCartData } from '../store/reducers/cartSlice';
import { mergeFavoritesList, saveFavoritesList } from '../store/reducers/favoritesSlice';
import useMessageTimer from '../hooks/useMessageTimer';

export default function AuthPage() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [message, setMessage] = useMessageTimer('', 2000);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);
  const [inputType, setInputType] = useState({
    password: 'password',
    passwordConfirmation: 'password',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const prevPage = location.state?.preLocation?.pathname || '/';
  const dispatch = useDispatch();

  const togglePasswordVisibility = (key) => {
    setInputType((prevState) => ({
      ...prevState,
      [key]: prevState[key] === 'password' ? 'text' : 'password',
    }));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoading(false);
      if (user && !isNewUser) {
        navigate(prevPage, { replace: true });
      }
    });
    return unsubscribe;
  }, [isNewUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoginForm) {
      // 登入
      setIsNewUser(false);
      try {
        await signInWithEmailAndPassword(auth, email, password);
        const userDoc = doc(db, 'users', auth.currentUser.uid);
        const userSnap = await getDoc(userDoc);
        const userData = userSnap?.data();
        const firebaseCartData = userData?.cartData;
        if (firebaseCartData) {
          dispatch(mergeCartData(userData.cartData));
        } else {
          dispatch(saveCartData(auth.currentUser.uid));
        }
        const firebaseFavoritesList = userData?.favoritesList;
        if (firebaseFavoritesList) {
          dispatch(mergeFavoritesList(firebaseFavoritesList));
        } else {
          dispatch(saveFavoritesList(auth.currentUser.uid));
        }
      } catch (error) {
        setMessage(useErrorMessage(error));
      }
    } else {
      // 註冊
      setIsNewUser(true);
      try {
        if (password !== passwordConfirmation) throw new Error('輸入密碼不一致');
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const newUser = userCredential.user;
        await setDoc(doc(db, 'users', newUser.uid), {
          uid: newUser.uid,
          email,
        });
        setIsLoginForm(true);
        signOut(auth);
        setMessage('註冊成功，請重新登入');
      } catch (error) {
        setMessage(useErrorMessage(error));
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4 relative">
            <input
              className="input-primary w-64 h-10"
              type={inputType.password}
              placeholder="請輸入密碼"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {password && (
              <FontAwesomeIcon
                icon={inputType.password === 'text' ? faEyeSlash : faEye}
                className="absolute inset-0 my-auto mx-56 cursor-pointer text-darkslategray text-sm"
                onClick={() => togglePasswordVisibility('password')}
              />
            )}
          </div>
          {!isLoginForm
            && (
              <div className="mb-4 relative">
                <input
                  className="input-primary w-64 h-10"
                  type={inputType.passwordConfirmation}
                  placeholder="確認密碼"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
                {passwordConfirmation && (
                  <FontAwesomeIcon
                    icon={inputType.passwordConfirmation === 'text' ? faEyeSlash : faEye}
                    className="absolute inset-0 my-auto mx-56 cursor-pointer text-darkslategray text-sm"
                    onClick={() => togglePasswordVisibility('passwordConfirmation')}
                  />
                )}
              </div>
            )}
          <div>
            <button type="submit" className="btn-primary w-64 h-10 text-base font-bold">
              {isLoginForm ? '登入' : '註冊'}
            </button>
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
