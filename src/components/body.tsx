import { Grid } from '@mui/material';
import { MyCard } from "./card";
import { useEffect, useState } from 'react';
import data from '../data/cards.json';


export const Body = () => {
  const [cards, setCards] = useState(data.cards)

  useEffect(() => {
    fetch('http://localhost:3000/cards').then(res => {
      return res.json();
    }).then(data => {
      setCards(data)
    });
  }, []);

  const Cards = () => {
    return (cards.map((card, i) => {
      return (
        <Grid key={i} item md={4} xs={12} >
          <MyCard
            id={card.id}
            image_reference={card.image_reference}
            title={card.title}
            text={card.text}
            src_reference={card.src_reference}
            refe={card.ref}
            onClick={() => handleRemoveItem(card.id)}
          />
        </Grid>
      )
    }
    )
    )
  }

  const handleRemoveItem = (id: number) => {
    setCards(cards.filter((card) => card.id != id));
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
        <Grid container spacing={2}>
          {Cards()}
        </Grid>
      </Grid>
    </Grid>
  );
}