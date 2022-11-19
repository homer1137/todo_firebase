import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAL5um_hSX0IYKxBDDKzPIGCeu4jsndPw0",
    authDomain: "todo-test-57710.firebaseapp.com",
    projectId: "todo-test-57710",
    storageBucket: "todo-test-57710.appspot.com",
    messagingSenderId: "260718321629",
    appId: "1:260718321629:web:b24f07e0756a7669b72034"
  };

  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);
  const storage = getStorage(app);

  export {db, storage};