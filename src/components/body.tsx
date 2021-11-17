import { Button, Grid } from '@mui/material';
import { useEffect } from 'react';
import { api } from './Api';
import { MyCard } from "./card";
import { MyCardProps } from './Main';

export const Body = ({ cards, setCards }: { cards: (MyCardProps[] | null), setCards: React.Dispatch<React.SetStateAction<MyCardProps[] | null>> }) => {

  async function getCards() {
    const data = await api.getCards()
    setCards(data)
  }

  async function handleRemoveItem(id: number) {
    await api.removeItem(id)
    await getCards()
  };

  useEffect(() => {
    getCards();
  }, []);

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
              getCards={getCards}
            />
          </Grid>
        ))}
      </Grid>
    );
  }

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