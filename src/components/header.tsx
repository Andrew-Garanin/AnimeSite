import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import logo from "../assets/site-icon.png"
import Typography from '@mui/material/Typography';
import { Grid, useMediaQuery } from '@mui/material';
import { theme } from './Themes';

export const Head = () => {
  const isHD = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  return (
    <header className="header" >
      <Grid container justifyContent='center'>
        <Grid item md={8} xs={12}>
          <Grid container alignItems='center' direction={isHD ? 'row': 'column'} >
            <Grid item>
              <Grid container alignItems='center' spacing={2}>
                <Grid item>
                  <img className="header_icon" src={logo} alt="header_icon" />
                </Grid>
                <Grid item>
                  <Typography variant='h4' className="header_title">Anime Girls</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item marginBottom={isHD ? 0: 2}>
              <Search className="search" >

                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>

                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }} />

              </Search>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </header>
  );
}