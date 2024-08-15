import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import PropTypes from 'prop-types'
import { createContext, useState, useEffect } from "react"; // Updated import statement for useEffect
// import app from "../firebase/firebase.config";
import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth"; // Corrected import statement
import app from "../firebase/firebase.config";
import useAxiosCommon from "../hooks/useAxiosCommon";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosCommon = useAxiosCommon();

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();


  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider) // Return the promise
      .finally(() => setLoading(false)); // Ensure loading is set to false after the operation
  };

  const githubSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  }

  const logOut = () => {
    setLoading(true);
    return signOut(auth).finally(() => setLoading(false));
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  useEffect(() => {
    // Updated to useEffect
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // all get token and store client
        const userInfo = { email: currentUser.email };

        axiosCommon.post("/jwt", userInfo).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
            setLoading(false);
          }
        });
      } else {
        // do something
        localStorage.removeItem("access-token");
        setLoading(false);
      }
    });
    return () => {
      return unsubscribe();
    };
  }, [axiosCommon]);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    googleSignIn,
    githubSignIn,
    logOut,
    updateUserProfile,
    setLoading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};


AuthProvider.propTypes = {
    // Array of children.
    children: PropTypes.array,
  }

export default AuthProvider;
