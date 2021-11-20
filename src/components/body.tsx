import { Button, Grid, Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import FormDialog from './addNewCardDialog';
import { api } from './Api';
import { MyCard } from "./card";
import { MyCardProps } from './Main';

export const Body = ({ cards, setCards }: { cards: (MyCardProps[] | null), setCards: React.Dispatch<React.SetStateAction<MyCardProps[] | null>> }) => {
  const [maxCardsOnPage, setMaxCardOnPage] = useState(12);
  const [maxPageNumber, setMaxPageNumber] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  async function getCardsNumber() {
    const num = await api.getCardsNumber();
    setMaxPageNumber(Math.ceil(num / maxCardsOnPage));
    return num;
  }

  async function handleChangeCurrentPage(event: React.ChangeEvent<unknown>, value: number) {
    setCurrentPage(value);
  };

  useEffect(() => {
    const updatePageContent = async () => {
      await getCards();
    }
    console.log(10 % 6)
    updatePageContent();
  }, [currentPage]);

  async function getCards() {
    var data;
    if (currentPage === 1) {
      data = await api.getCards(0, currentPage * maxCardsOnPage)
    }
    else {
      data = await api.getCards(maxCardsOnPage * (currentPage - 1), currentPage * maxCardsOnPage)
    }
    console.log(data)
    setCards(data)
  }

  async function addCardCallBack() {
    console.log("added!");
    await getCardsNumber();
    getCards();
  }

  async function handleRemoveItem(id: number) {
    await api.removeItem(id);
    const num = await getCardsNumber();

    if (currentPage === maxPageNumber) {
      if (num % maxCardsOnPage === 0)
        setCurrentPage(currentPage - 1);
    }

    await getCards();
  };

  useEffect(() => {
    const fetchCards = async () => {
      await getCardsNumber();
      await getCards();
    }
    fetchCards();
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
      justifyContent="right"
      alignItems="flex-start"
      paddingTop="20px"
      paddingBottom="20px"
      px={2}>

      <Grid item md={8} xs={12}>
        {cards && <Cards />}
      </Grid>

      <Grid container md={2} xs={4}>
        <Grid item md={8} xs={12}>
          <FormDialog  // New card button is here!
            cards={cards}
            setCards={setCards}
            callback={addCardCallBack}
          />
        </Grid>
      </Grid>

      <Grid item md={12} xs={12}
        display='flex'
        justifyContent='center'
        paddingTop={2}>
        <Pagination count={maxPageNumber} color="secondary" onChange={handleChangeCurrentPage} page={currentPage} />
      </Grid>

    </Grid>
  );
}