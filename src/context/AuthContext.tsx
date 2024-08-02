import React, { createContext, useState, useContext, ReactNode, Children, useEffect } from "react";
import {auth, db} from "../firebaseConfig";
import {collection, query, where, getDocs, setDoc, doc} from "firebase/firestore";
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";

interface User {
  mail: string
  loggedIn: boolean
}

interface AuthContextType {
  user: User | null;
  login: (username:string, password:string) => Promise<void>;
  register: (username:string, password:string) => Promise<void>;
  logout : () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider : React.FC<{children: ReactNode}> = ({children})=>{
  const [user, setUser] = useState<User | null> (() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
/*
  const login = (user:User) =>{
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };
*/

  useEffect(()=> {
    const unsubscribe = onAuthStateChanged(auth, (user) =>{
      if (user){
        setUser({mail : user.email ?? '', loggedIn:true});
        localStorage.setItem('user', JSON.stringify({mail : user.email ?? '', loggedIn:true}))
        }
        else{
          setUser(null);
          localStorage.removeItem('user')
        }
    }
  )
  console.log("test use effect unsubscribe")
  return unsubscribe  
  }, []);

  const login = async (mail:string, password: string)=> {
    await signInWithEmailAndPassword(auth, mail, password)
  }

  const register = async (mail:string, password:string)=>{
   await createUserWithEmailAndPassword(auth, mail, password);
  };

  const logout = async () => {
   await signOut(auth)
   setUser(null);
   localStorage.removeItem('user')   
  };

  return (
    <AuthContext.Provider value = {{user, login , register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context){
    throw new Error('useAuth must be within an AuthProvider');
  }
  return context;
};