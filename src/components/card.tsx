import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, CardMedia, Chip, Grid, IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LinkIcon from '@mui/icons-material/Link';
import { useState } from 'react';
import { MoreButtonDialog } from "./dialog";


export interface MyCardProps {
  id: number;
  image_reference: string;
  title: string;
  text: string;
  src_reference: string;
  refe: string;
  onClick: () => void;
}

export const MyCard = (props: MyCardProps) => {
  const { id, image_reference, title, text, src_reference, refe, onClick } = props;

  const color2 = "#fbc2eb";
  const color1 = "#a6c1ee";

  const [deleteButtonDisplay, setDeleteButtonDisplay] = useState({ display: 'none' });
  const shortReference = src_reference.substring(8, src_reference.indexOf("/", 8))

  return (
    <Card
      className='card'
      id={id.toString()}
      style={{ background: `linear-gradient(to bottom,  ${color1} ,${color2})`, height: '200px' }}
      sx={{ boxShadow: 4 }}
      onMouseEnter={e => {
        setDeleteButtonDisplay({ display: 'block' });
      }}
      onMouseLeave={e => {
        setDeleteButtonDisplay({ display: 'none' })
      }}>
      <Grid container
        direction="row"
        flexWrap="nowrap">

        <Grid item xs={8} md={6}>
          <CardContent
            sx={{ height: '100%' }}
            style={{ padding: 0 }}>
            <CardActionArea>
              <CardMedia
                className="preview_image"
                component="img"
                image={image_reference}
                alt="Anime picture"
              />
            </CardActionArea>
          </CardContent>
        </Grid>

        <Grid item xs={8} md={6}>

          <Grid container
            direction="column"
            px={1}
            spacing={1.7}
            height="100%"
            wrap="nowrap">

            <Grid
              item display="flex"
              direction='row'
              justifyContent='space-between'>
              <Typography className="main_card_text" height="5rem" variant="body2" paddingTop="14px" paddingLeft="14px" paddingRight="14px" >
                {title}
              </Typography>
              <Box>
                <IconButton
                  aria-label="delete"
                  style={deleteButtonDisplay}
                  sx={{ color: '#453a94', marginTop: "5px", width: "40px", height: "40px" }}
                  onClick={onClick}>
                  <DeleteForeverIcon />
                </IconButton>
              </Box>
            </Grid>

            <Grid item display="flex" alignItems="center">
              <Chip label={shortReference}
                icon={<LinkIcon />}
                onClick={() => window.open(src_reference, "_blank")}
              />
            </Grid>

            <Grid item paddingLeft={2}>
              <MoreButtonDialog // More button is here!
                image_reference={image_reference}
                title={title}
                text={text}
                src_reference={src_reference} />
            </Grid>

          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

