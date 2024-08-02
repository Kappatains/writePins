import {
    IonButton,
    IonContent,
    IonInput,
    IonPage,
    IonTitle,
  } from '@ionic/react';
import { useAuth } from '../context/AuthContext';
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';

const Login : React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState('');
    const {login, register, logout } = useAuth();
    const history = useHistory();

    const handleLogin = async()=>{
        try{
            await login (email, password);
            history.push('/home');
        }catch (error){
            setError("login failed");
            console.error('Login failed: ', error);
        }
    }
    const handleRegister= async()=>{
        try{
            await register(email, password);
            history.push('/home');
        }catch (error){
            setError("Register failed");
            console.error('Register failed: ', error);
        }
    }
    return (
        <>
        <IonPage id="login-page">
            <IonContent fullscreen>
                <IonTitle> Login Page</IonTitle>
                <IonInput
                    placeholder='email'
                    value={email}
                    onIonChange={(e)=> setEmail(e.detail.value??'')}
                />
                <IonInput
                    placeholder='Password'
                    type='password'
                    value={password}
                    onIonChange={(e)=> setPassword(e.detail.value??'')}
                />
                <IonButton fill="clear" onClick={handleLogin}>Connecting</IonButton>
                <p>{error}</p>
                <IonButton fill="clear" onClick={handleRegister}>Register</IonButton>
                <IonButton fill="clear"  onClick={logout}>Logout</IonButton>
            </IonContent>
        </IonPage>
        </>
    );
}
export default Login;