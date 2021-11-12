import { Grid } from '@mui/material';
import { MyCard, MyCardProps } from "./card";
import { useEffect, useState } from 'react';
import { AlertDialog } from './deleteItemConfirmation';
//import { Cards } from "./cardList";

// class Card{
//   id: number;
//   image_reference: string;
//   title: string;
//   text: string;
//   src_reference: string;
//   refe: string;
//   constructor( id: number,image_reference: string,title: string,text: string,src_reference: string,refe: string) {
//     this.id = id;
//     this.image_reference = image_reference;
//     this.title = title;
//     this.text = text;
//     this.src_reference = src_reference;
//     this.refe = refe;
//   }
// }

export const Body = () => {
  const [cards, setCards] = useState<MyCardProps[] | null>(null)

  function getCards() {
    fetch('http://localhost:3000/cards').then(res => {
      return res.json();
    }).then(data => {
      setCards(data)
      console.log(data)
    });
  }

  useEffect(() => { getCards() }, []);

  const Cards = () => {
    return (
      <Grid container spacing={2}>
        {cards!.map((card, i) => (
          <Grid key={i} item md={4} xs={12} >
            <MyCard
              id={card.id}
              image_reference={card.image_reference}
              title={card.title}
              text={card.text}
              src_reference={card.src_reference}
              refe={card.refe}
              onClick={() => handleRemoveItem(card.id)}
            />
            <AlertDialog/>
          </Grid>
        ))}
      </Grid>
    );
  }

  const handleRemoveItem = (id: number) => {
    console.log(id)
    fetch(`http://localhost:3000/cards/${id}`, { method: 'DELETE' }).then(async response => {
      const data = await response.json();

      // check for error response
      if (!response.ok) {
        // get error message from body or default to response status
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
      }
      else {
        setCards(cards!.filter((card) => card.id != id));
      }
    })
      .catch(error => {

        console.error('There was an error!', error);
      });

  };

  return (
    <Grid container
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
      paddingTop="20px"
      paddingBottom="20px"
      px={2}>

      <Grid item md={8} xs={12}>
        {cards && <Cards />}
      </Grid>
    </Grid>
  );
}