import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonFooter, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonModal, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import useApi, { DetailsResult } from '../hooks/useAPI';
import { bodyOutline, information, starHalfOutline } from 'ionicons/icons';

interface DetailsPageProps
    extends RouteComponentProps<{
        id:string;
    }> {}

const Details: React.FC<DetailsPageProps> = ({match}) => {
    const {getDetails} = useApi()
    const [information, setInformation] = useState<DetailsResult | null>(null);

    useIonViewWillEnter(async() => {
        const id = match.params.id
        const data = await getDetails(id)
        setInformation(data)
        console.log("🚀 ~file: Home.tsx:26 ~useIonViewWillEnter ~ data", data)
    })

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref='/movies'></IonBackButton>
                    </IonButtons>
                    <IonTitle>{information?.Genre}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>

                {information && (
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>{information.Title}</IonCardTitle>
                            <IonCardSubtitle>{information.Year}</IonCardSubtitle>
                        </IonCardHeader>
                        <IonCardContent text-center>
                            <IonImg src={information.Poster}/>
                            <IonItem lines="none">
                                <IonIcon icon={starHalfOutline} slot="start" color="warning"></IonIcon>
                                <IonLabel>{information.imdbRating}</IonLabel>
                            </IonItem>
                        </IonCardContent>
                    </IonCard>
                )}

                <IonModal 
                    trigger="open-modal" 
                    initialBreakpoint= {0.25}
                    breakpoints={[0, .25, .5, .75]}>
                    <IonContent className='ion-padding'>

                        <IonItem lines="none">
                            <IonIcon icon={bodyOutline} slot="start" />
                            <IonLabel className='ion-text-wrap'>{information?.Director}</IonLabel>
                        </IonItem>

                        <IonItem lines="none">
                            <IonIcon icon={bodyOutline} slot="start" />
                            <IonLabel className='ion-text-wrap'>{information?.Awards}</IonLabel>
                        </IonItem>

                        <IonItem lines="none">
                            <IonIcon icon={bodyOutline} slot="start" />
                            <IonLabel className='ion-text-wrap'>{information?.Actors}</IonLabel>
                        </IonItem>

                        <IonItem lines="none">
                            <IonIcon icon={bodyOutline} slot="start" />
                            <IonLabel className='ion-text-wrap'>{information?.Plot}</IonLabel>
                        </IonItem>

                    </IonContent>
                </IonModal>
            </IonContent>

            <IonFooter>
                <IonButton expand="full" id="open-modal">
                    Show more
                </IonButton>
            </IonFooter>
        </IonPage>
    );
};

export default Details;