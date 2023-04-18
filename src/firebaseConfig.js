import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBiJ1U9lwerErAxL-CZXJ614G-PVQmU5Cs',
  authDomain: 'my-firebase-c1f5e.firebaseapp.com',
  projectId: 'my-firebase-c1f5e',
  storageBucket: 'my-firebase-c1f5e.appspot.com',
  messagingSenderId: '145855564666',
  appId: '1:145855564666:web:a2733452a944305b48e4c3',
  measurementId: 'G-KEKHSJ3NMS',
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
