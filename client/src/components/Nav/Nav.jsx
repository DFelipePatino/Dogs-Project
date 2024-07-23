import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink, Link } from "react-router-dom";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Sort from '../Sort/Sort';
import Filter from '../Sort/Filter';

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
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function SearchAppBar({ onSearch, onHomeClick, alltemperaments, filterDogsByTemp, selectedTemp, setSelectedTemp, resetSelection, setApiDbFilter, apiDbFilter, setWeigthOrderType, weigthOrderType, setOrderType, orderType }) {

    const [state, setState] = React.useState(false);

    const navigate = useNavigate();

    const toggleDrawer = (open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState(open);
    };

    const handleHomeClick = () => {
        onHomeClick();
        resetSelection();
    };

    const [term, setTerm] = React.useState('');

    const termTrim = term.trim();
    // console.log("este es el termtrim", termTrim)

    const onSubmit = (event) => {
        event.preventDefault();
        if (termTrim === '') {
            window.alert('Search cannot be empty');
        } else {
            onSearch(termTrim);
            setTerm('');
        }
    };

    const handleChange = (event) => {
        const { value } = event.target;
        setTerm(value);
    }

    const list = (
        <>
            <Box
                sx={{ width: 'auto' }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
            >
                <List>
                    {['Home', 'Create your Dog!', 'Exit'].map((text, index) => (
                        <ListItem key={text}>
                            <ListItemButton>
                                {index === 0 ? <NavLink to='/home'>
                                    <Button onClick={handleHomeClick}>Home</Button>
                                </NavLink>
                                    :
                                    index === 1 ? <NavLink to='/form'>
                                        <Button>{text}</Button>
                                    </NavLink>
                                        :
                                        index === 2 ?
                                            <Link to='/'>
                                                <Button>{text}</Button>
                                            </Link>
                                            :
                                            null}
                                <ListItemIcon>

                                </ListItemIcon>
                                <ListItemText />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>

            <Divider />

            <Box
                sx={{ width: 'auto' }}
                role="presentation"
            >
                <List>
                    <ListItem >
                        <Sort
                            setApiDbFilter={setApiDbFilter} apiDbFilter={apiDbFilter} setWeigthOrderType={setWeigthOrderType} weigthOrderType={weigthOrderType} setOrderType={setOrderType} orderType={orderType} selectedTemp={selectedTemp} setSelectedTemp={setSelectedTemp}
                        />
                    </ListItem>

                    <br />

                    <ListItem >
                        <Filter
                            selectedTemp={selectedTemp} setSelectedTemp={setSelectedTemp} alltemperaments={alltemperaments} filterDogsByTemp={filterDogsByTemp} handleHomeClick={handleHomeClick}
                        />
                    </ListItem>
                </List>
            </Box>
        </>
    );


    return (
        <div
            style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                            onClick={toggleDrawer(true)}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Typography
                            onClick={() => { navigate('/home') }}
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, cursor: 'pointer' }}
                        >
                            DOGS API
                        </Typography>


                        <Typography
                            onClick={handleHomeClick}
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 0, display: { xs: 'none', sm: 'block' }, cursor: 'pointer' }}
                        >
                            Reset Search
                        </Typography>

                        <Search >
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <form onSubmit={(e) => {
                                e.preventDefault(); // Prevent default form submission behavior
                                onSubmit(e); // Pass the event to onSubmit
                            }}>
                                <StyledInputBase
                                    type="text"
                                    value={term}
                                    onChange={handleChange}
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </form>
                        </Search>

                    </Toolbar>
                </AppBar>
                <div>
                    {/* {['left', 'right', 'top', 'bottom'].map((anchor) => ( */}
                    <React.Fragment >
                        {/* <Button onClick={toggleDrawer(anchor, true)}></Button> */}
                        <SwipeableDrawer
                            anchor={'left'}
                            open={state}
                            onClose={toggleDrawer(false)}
                            onOpen={toggleDrawer(true)}
                        >
                            {list}
                        </SwipeableDrawer>
                    </React.Fragment>
                    {/* ))} */}
                </div>
            </Box>
        </div>


    );
}
