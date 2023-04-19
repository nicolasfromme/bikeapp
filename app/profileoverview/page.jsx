"use client"
import * as React from 'react';
import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useQuery, gql } from "@apollo/client"

const drawerWidth = 240;

function openLinkInSameTab(url) {
  window.location.href = url;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

/* function createData(bestellung, inhalt, eur, datum) {
    return { bestellung, inhalt, eur, datum};
  }
  
  const rows = [
    createData("1", "...", "...", "...", "..."),
    createData("2", "...", "...","...", "..."),
    createData("3", "...", "...", "...", "..."),
    createData('',"-","-","-", "-"),
    createData('', "-", "-","-","-"),
  ]; */


function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState('Bestellungen');
  const [showTableOne, setShowTableOne] = React.useState(true);
  const [showTableTwo, setShowTableTwo] = React.useState(false);
  const [showTableThree, setShowTableThree] = React.useState(false);

  const [isEditable, setIsEditable] = React.useState(false);
  const [vorname, setVorname] = React.useState();
  const [nachname, setNachname] = React.useState();
  const [plz, setPlz] = React.useState();
  const [ort, setOrt] = React.useState();
  const [straße, setStraße] = React.useState();
  const [email, setEmail] = React.useState();
  const [bike, setBike] = React.useState();
  const [date, setDate] = React.useState();
  const [price, setPrice] = React.useState();

  const customerId = "642d151b212acfeef285ade1"

  const { data, loading, error } = useQuery(gql`
    query {
        getCustomer(id: "${customerId}") {
            firstname
            lastname
            street
            zip
            city
            email
        }  getOrdersByCustomer(customerId: "642d151b212acfeef285ade1") {
          bike
          date
          price
  }
    }
  `)

  function createData(bestellung, inhalt, eur, datum) {
    return { bestellung, inhalt, eur, datum};
  }
  
  const rows2 = [
    createData("1", "...", "...", "...", "..."),
    createData("2", "...", "...","...", "..."),
    createData("3", "...", "...", "...", "..."),
  ];

  
  const [orders, setOrders] = React.useState([]);

  const rows = orders.map((order, index) => {
    return {
      bestellung: index + 1,
      bike: order.bike,
      date: order.date,
      price: order.price
    };
  });

  useEffect(() => {
    if (data) {
      setVorname(data.getCustomer.firstname);
      setNachname(data.getCustomer.lastname);
      setPlz(data.getCustomer.zip);
      setOrt(data.getCustomer.city);
      setStraße(data.getCustomer.street);
      setEmail(data.getCustomer.email);
      setOrders(data.getOrdersByCustomer);
    }
  }, [data]);

  //if (loading) return <div>Loading...</div>

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleSave = () => {
    setIsEditable(false);
  };

  const handleVornameChange = (event) => {
    setVorname(event.target.value);
  };
  const handleNachnameChange = (event) => {
    setNachname(event.target.value);
  };
  const handlePlzChange = (event) => {
    setPlz(event.target.value);
  };
  const handleOrtChange = (event) => {
    setOrt(event.target.value);
  };
  const handleStraßeChange = (event) => {
    setStraße(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleListItemClick = (event, text) => {
    setSelectedItem(text);
    handleDrawerToggle();
  };


  const handleItemClick = (text) => {
    if (text === "Bestellungen") {
    setShowTableOne(true);
    setShowTableTwo(false);
    setShowTableThree(false);
    } else if (text === "Meine persönlichen Daten") {
    setShowTableOne(false);
    setShowTableTwo(false);
    setShowTableThree(true);
    } else if (text === "Abmelden") {
    openLinkInSameTab('http://localhost:3000');
    } else {
    setShowTableOne(false);
    setShowTableTwo(false);
    setShowTableThree(false);
    }
    };


  const drawer = (
    <div sx={{ display: 'flex', paddingTop: "25px"}}>
      <Toolbar />
      <Divider />
      <List>
        {['Bestellungen', 'Meine persönlichen Daten', 'Einstellungen'].map((text, index) => (
          <ListItem key={text} disablePadding>
           <ListItemButton selected={selectedItem === text} onClick={(event) => handleItemClick(text)}>
              <ListItemIcon>
                {/* <SettingsIcon />
                <PersonIcon /> */}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Benutzerkonto löschen', 'Abmelden'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton selected={selectedItem === text} onClick={(event) => handleItemClick(text)}>
              <ListItemIcon>
                {index % 2 === 0 ? <DeleteIcon /> : <LogoutIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  
  return (
    <Box style={{ height: 'auto', padding: "70px"}}>
      <CssBaseline />
      <AppBar
        position="auto"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` }, 
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' }
           }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Kontoübersicht
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            height: '40vh',
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, height: '40vh'},
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="persistent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, paddingTop: '35px' },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, paddingLeft: "340px" }}
      >
        <Toolbar/>
        <Typography bestellungen>
            {showTableOne && (
            
        <TableContainer component={Paper}> Hier können Sie Ihre getätigten Bestellungen einsehen: 
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell> Bestellungen</StyledTableCell>
            <StyledTableCell align="right">Bike ID</StyledTableCell>
            <StyledTableCell align="right">EUR</StyledTableCell>
            <StyledTableCell align="right">Datum</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.bestellung}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {row.bestellung}
              </StyledTableCell>
              <StyledTableCell align="right">{row.bike}</StyledTableCell>
              <StyledTableCell align="right">{row.price}</StyledTableCell>
              <StyledTableCell align="right">{row.date}</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            )}
        </Typography>
      </Box>
      <Box style={{ paddingLeft: "300px"}}>
        <Typography daten> 
          {showTableThree && (
            <Box>
              <Grid container spacing={2}>
              <Grid item xs={6} md={6}>
              <Grid > 
              <TextField
                name="vorname"
                label="Name:"
                value={vorname}
                InputProps={{ readOnly: !isEditable }}
                onChange={handleVornameChange}
                /></Grid> <br/>
              <Grid>
              <TextField
                name="nachname"
                label="Nachname:"
                value={nachname}
                InputProps={{ readOnly: !isEditable }}
                onChange={handleNachnameChange}
              /></Grid> <br/>
              <Grid >
              <TextField
              name="email"
              label="EMail:"
              value={email}
              InputProps={{ readOnly: !isEditable }}
              onChange={handleEmailChange}
            /></Grid> 
            </Grid>
              <Grid item xs={6} md={6}>
              <Grid>
              <TextField
                name="straße"
                label="Straße:"
                value={straße}
                InputProps={{ readOnly: !isEditable }}
                onChange={handleStraßeChange}
              /></Grid> <br/>
              <Grid>
              <TextField
                name="plz"
                label="PLZ:"
                value={plz}
                InputProps={{ readOnly: !isEditable }}
                onChange={handlePlzChange}
              /></Grid> <br/>
              <Grid>
              <TextField
                name="ort"
                label="ort:"
                value={ort}
                InputProps={{ readOnly: !isEditable }}
                onChange={handleOrtChange}
              />
              </Grid>
              </Grid>
              </Grid> <br/><br/>
              <Grid item xs={12}>
              {isEditable ? (
              <Button variant="outlined" onClick={handleSave}>
                Save
              </Button>
            ) : (
              <Button variant="outlined" onClick={handleEdit}>
                Edit
              </Button>
            )}
             </Grid>
             
            </Box>
          )}
        </Typography>
      </Box>
      </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;