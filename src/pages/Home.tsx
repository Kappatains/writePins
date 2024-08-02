import PinListItem from '../components/PinListItem';
import { useEffect, useState } from 'react';
import { Pin, getPins } from '../data/pin';
import {
  IonButton,
  IonCard,
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter
} from '@ionic/react';
import './Home.css';
import NewCard from './NewCard';
import {useHistory } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const {user} = useAuth();
  const history = useHistory();
  useEffect(() => {
    console.log(user);
    if (user?.loggedIn == false || !user ){
      console.log(user?.loggedIn);
      console.log('yolo');
      history.push("/login");
    }});

  const [pin, setPin] = useState<Pin[]>(getPins());
  console.log("setPin:Updated")

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  function addPin(title?:any, citation?:string){
    const newPin : Pin = {title: title, description: citation, id:pin.length+1}
    pin.push(newPin)
    console.log("newPinsList:", pin)
    setPin([...pin])
  }

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inbox</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              Inbox
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {pin.map(m => <PinListItem key={m.id} pin={m}/>)}
        </IonList>
        {/* <NewCard addPin={addPin}/> */}
      </IonContent>
    </IonPage>
  );
};

export default Home;
