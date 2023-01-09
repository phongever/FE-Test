import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBQr3Bzp3FAHDwiipqlSIZOOO0JW66gqsc",
  authDomain: "koogio.firebaseapp.com",
  databaseURL: "https://koogio.firebaseio.com",
  projectId: "koogio",
  storageBucket: "koogio.appspot.com",
  messagingSenderId: "503031321459",
  appId: "1:503031321459:web:118dcf71aad68321fdab06",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const uploadFile = async (file) => {
  const storageRef = ref(storage, file.name);

  await uploadBytes(storageRef, file);

  const url = await getDownloadURL(storageRef);

  return url;
};
