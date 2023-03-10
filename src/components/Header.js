import MenuIcon from '@mui/icons-material/Menu';
import { Divider, Drawer, Grid, IconButton, List, ListItem, Switch, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Container } from '@mui/system';
import * as React from 'react';

import { Locale } from './Locale.js';

function Header({ pages, home, navigate, changeLocale }) {

    const locale = React.useContext(Locale);
    const [open, setOpen] = React.useState(false);

    const updateLocale = (event) => {
        if (event.target.checked) {
            changeLocale('en');
        } else {
            changeLocale('it');
        }
    }

    const Logo = ({ clickable }) => (<Box sx={{ height: 64, cursor: clickable ? 'pointer' : 'auto' }} onClick={clickable ? () => navigate(home) : null} component="img" src="/static/logo.png" />);

    return (
        <Box id="header" component="header" >
            <Grid container height={64} columns={{ xs: 4, md: 12 }} justifyContent="space-between">
                <Grid item xs={1} sx={{ display: { xs: 'flex', md: 'none' } }} >
                    <IconButton size="large" onClick={() => setOpen(true)}>
                        <MenuIcon />
                    </IconButton>
                </Grid>

                <Grid item xs={2} sx={{ display: { xs: 'flex', md: 'none' } }} justifyContent="center" >
                    <Logo clickable />
                </Grid>

                <Grid item md={1} sx={{ display: { xs: 'none', md: 'flex ' } }} justifyContent="left" >
                    <Logo clickable />
                </Grid>
                <Grid item md={10} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>

                    <Box alignItems="center" display="flex">
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={() => navigate(page)}
                                size="large"
                            >
                                <Typography fontFamily='Roboto'>
                                    {page}
                                </Typography>
                            </Button>
                        ))
                        }
                    </Box>
                </Grid>

                <Grid item xs={1} alignItems="center" justifyContent="right" display="flex">
                    <Typography fontFamily='Roboto' color="primary">IT</Typography>
                    <Switch defaultChecked={locale === 'en'} onChange={updateLocale} size="small" />
                    <Typography fontFamily='Roboto' color="primary">EN</Typography>
                </Grid>
            </Grid>
            <Drawer
                anchor='left'
                open={open}
                onClose={() => setOpen(false)}
            >
                <Box width={'70vw'} maxWidth={300}>
                    <List>
                        {pages.map((page) => (
                            <Box key={page}>
                                <ListItem>
                                    <Button
                                        key={page}
                                        onClick={() => {
                                            navigate(page);
                                            setOpen(false);
                                        }}
                                    >
                                        <Typography fontFamily='Roboto'>
                                            {page}
                                        </Typography>
                                    </Button>
                                </ListItem>
                                <Container><Divider /></Container>
                            </Box>
                        )
                        )}
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
}

export default Header;