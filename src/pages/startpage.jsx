import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
/* import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; */

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

/* const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  })); */


export default function VariableWidthGrid() {
    return (
     <Box>
        <h1>Zweirradverleih Mannheim</h1> <br/>
        <img src="fahrradverleihbanner.jpg" alt="logo" width="1000"/> 
        {/* <IconButton aria-label="cart">
      <StyledBadge badgeContent={4} color="secondary">
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton> */}
      <Box sx={{ flexGrow: 1 }}> <br/>
        <Grid container spacing={3}>
          <Grid item xs="auto">
            <Item><Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt="bike"
          height="350"
          image="bike.jpg"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Philosophie Studenten Porsche
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Low Budget
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Buchen</Button>
        </CardActions>
      </Card></Item>
          </Grid>
          <Grid item xs="auto">
            <Item><Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt="e-bike"
          height="350"
          image="ebike2.jpg"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            E-Bike
          </Typography>
          <Typography variant="body2" color="text.secondary">
            E-Bike, wenn's mal schneller gehen muss und sie sagt sie hat sturmfrei
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Buchen</Button>
        </CardActions>
      </Card></Item>
          </Grid>
          <Grid item xs="auto">
            <Item><Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt="e-scooter"
          height= "350"
          image="lime-e-scooter.webp"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            E-Scooter
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Für ereignisreiche Sternzeichen Frankfurt Momente
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Buchen</Button>
        </CardActions>
      </Card></Item>
          </Grid>
        </Grid>
      
    </Box>
    </Box>
    );
  }