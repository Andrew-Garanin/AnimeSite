import { Grid } from '@mui/material';
import { MyCard } from "./card";

import data from '../data/cards.json';
import { SyntheticEvent, useEffect, useState } from 'react';
import fs from 'fs'
import path from 'path'
export const Body = () => {

  const [cards, setCards] = useState(data.cards)

  const Cards = () => {
    return (cards.map((card, i) => {
      return (
        <Grid key={i} item xs={4}>
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
  let student = { 
    name: 'Mike',
    age: 23, 
    gender: 'Male',
    department: 'English',
    car: 'Honda' 
};
  const handleRemoveItem = (id: number) => {
    setCards(cards.filter((card) => card.id != id));
  };

  return (
    <Grid container
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
      paddingTop="20px"
      paddingBottom="20px">

      <Grid item md={8} xs={12}>
        <Grid container spacing={2}>
          {Cards()}
        </Grid>
      </Grid>
    </Grid>
  );
}