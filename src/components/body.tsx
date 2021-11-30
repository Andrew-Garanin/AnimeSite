import { Grid, Pagination, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { api } from './Api';
import { MyCard } from "./MyCard";
import NewCardDialog from './NewCardDialog';
import { theme } from './Themes';


export interface MyCardProps {
  id: number;
  image_reference: string;
  title: string;
  text: string;
  src_reference: string;
  onClickDeleteButton: () => void;
  getCards: () => void;
}

export const Body = () => {
  const isHD = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const [cards, setCards] = useState<MyCardProps[] | null>(null);
  // eslint-disable-next-line
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

  async function getCards() {
    var data;
    if (currentPage === 1) {
      data = await api.getCards(0, currentPage * maxCardsOnPage);
    }
    else {
      data = await api.getCards(maxCardsOnPage * (currentPage - 1), currentPage * maxCardsOnPage);
    }
    setCards(data);
  }

  async function newCardCallBack() {
    await getCardsNumber();
    getCards();
  }

  async function handleRemoveItem(id: number) {
    await api.removeItem(id);
    const num = await getCardsNumber();

    if (currentPage === maxPageNumber && num % maxCardsOnPage === 0) {
      setCurrentPage(currentPage - 1);
    }
    await getCards();
  };

  useEffect(() => {
    const updatePageContent = async () => {
      await getCards();
    }
    updatePageContent();
    // eslint-disable-next-line
  }, [currentPage]);

  useEffect(() => {
    const fetchCards = async () => {
      await getCardsNumber();
      await getCards();
    }
    fetchCards();
    // eslint-disable-next-line
  }, []);

  const NewCardButton = () => {
    return (
      <Grid container md={2} xs={4}>
        <Grid item md={8} xs={12} marginBottom={isHD ? 0 : 2}>
          <NewCardDialog  // New card button is here!
            callback={newCardCallBack} />
        </Grid>
      </Grid>
    );
  }

  const CardList = () => {
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
              onClickDeleteButton={() => handleRemoveItem(card.id)}
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
        {!isHD && <NewCardButton />}
        {cards && <CardList />}
      </Grid>

      {isHD && <NewCardButton />}

      <Grid item md={12} xs={12}
        display='flex'
        justifyContent='center'
        paddingTop={2}>
        <Pagination
          count={maxPageNumber}
          color="secondary"
          onChange={handleChangeCurrentPage}
          page={currentPage} />
      </Grid>
    </Grid>
  );
}