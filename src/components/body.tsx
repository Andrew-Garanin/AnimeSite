import { Grid } from '@mui/material';
import { MyCard } from "./card";


export const Body = () => {
const cards: JSX.Element[] = [];
for (let i = 0; i < 30; i++) {
  cards.push( <Grid item xs={4}>
                <MyCard/>
              </Grid>
            );
}
  return (
    <Grid container
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
      paddingTop="20px">
        
      <Grid item md={8} xs={12}>
        <Grid container spacing={2}>
          {cards}
        </Grid>
      </Grid>
    </Grid>
  );
}