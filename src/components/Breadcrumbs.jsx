/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';

function handleClick(e) {
    e.preventDefault();
    console.info('You clicked a breadcrumb.');
}

export default function BasicBreadcrumbs({ name, link1, link2 }) {
    return (
        <>
            <Grid container style={{ width: '90%', margin: '0 auto' }}>
                <Grid item xs={12}>
                    <Paper style={{ height: '75%', margin: 10, borderRadius: 8 }}>
                        <div style={{ paddingLeft: 40, color: '#212121' }}>
                            <p style={{ paddingTop: 16, fontSize: 24, fontWeight: 600, marginBottom: 12 }}>{name}</p>
                            <Breadcrumbs aria-label="breadcrumb" onClick={handleClick} style={{ paddingBottom: 20, fontSize: 14 }}>
                                <Link underline="none" color="inherit" href="/">
                                    {link1}
                                </Link>
                                <Link
                                    underline="none"
                                    color="inherit"
                                    href="/"
                                >
                                    {link2}
                                </Link>
                                <Typography color="text.primary">{name}</Typography>
                            </Breadcrumbs>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}
