import { IonPage,IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonInput, IonButton } from '@ionic/react';
import { useForm } from 'react-hook-form';

interface NewCardProps {
    addPin: (a?: any, b? :any) => void;
}


const NewCard : React.FC <NewCardProps> = ({addPin}) =>{

    function handleSubmit(e:any) {
        console.log("test");
        const formData = new FormData(e.target);
        const title = formData.get("title");
        const citation = formData.get("citation");
        addPin(title ,citation)
      }

    return (
<IonPage id="view-message-page">
<IonCard>
    <IonCardHeader>
        <IonCardTitle>Create new Citation</IonCardTitle>
    </IonCardHeader>

    <IonCardContent>
    <form method="post" onSubmit={handleSubmit}>
    <IonInput label="Title" name='title' ></IonInput>
    <IonInput label="Citation" name='citation'></IonInput>
    <IonButton type="submit" fill="clear">Add</IonButton>
    </form>
    </IonCardContent>
    </IonCard>
    </IonPage>
    );
}

export default NewCard;

