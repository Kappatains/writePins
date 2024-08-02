import {
    IonItem,
    IonLabel,
    IonNote
    } from '@ionic/react';
  import { Pin } from '../data/pin';
  import './PinListItem.css';
  
  interface PinListItemProps {
    pin: Pin;
  }
  
  const PinListItem: React.FC<PinListItemProps> = ({ pin }) => {
    return (
      <IonItem routerLink={`/pins/${pin.id}`} detail={false}>
        <div slot="start" className="dot dot-unread"></div>
        <IonLabel className="ion-text-wrap">
          <h2>
            <p>{pin.id}/</p>
            {pin.author}
            <span className="date">
              <IonNote>{pin.date}</IonNote>
            </span>
          </h2>
          <h3>{pin.description}</h3>
          <p>
          {pin.title}
          </p>
        </IonLabel>
      </IonItem>
    );
  };
  
  export default PinListItem;
  