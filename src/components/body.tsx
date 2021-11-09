import { Grid } from '@mui/material';
import { MyCard } from "./card";

import data from '../data/cards.json';

export const Body = () => { 
const cards: JSX.Element[] = [];

data.cards.map((card)=>
  cards.push( 
  <Grid item xs={4}>
    <MyCard 
    id={card.id} 
    image_reference={card.image_reference} 
    title={card.title} 
    text={card.text} 
    src_reference={card.src_reference} 
    refe={card.ref}/>
  </Grid>
  )
)
  return (
    <Grid container
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
      paddingTop="20px"
      paddingBottom="20px">
        
      <Grid item md={8} xs={12}>
        <Grid container spacing={2}>
          {cards}
        </Grid>
      </Grid>
    </Grid>
  );
}