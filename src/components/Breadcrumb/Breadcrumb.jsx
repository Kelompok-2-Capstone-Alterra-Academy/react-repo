/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import * as React from 'react';

function handleClick(e) {
	e.preventDefault();
	console.info('You clicked a breadcrumb.');
}

export default function Breadcrumb({ name, links }) {
	return (
		<>
			<Grid container>
				<Grid item xs={12}>
					<Paper elevation={0}>
						<p style={{ fontSize: 24, fontWeight: 600, marginBottom: 6 }}>{name}</p>
						<Breadcrumbs aria-label="breadcrumb" onClick={handleClick} style={{ fontSize: 14 }}>
							{links.map((link) => (
								<Link underline="hover" key={link.title} color="inherit" href={link.link}>
									{link.title}
								</Link>
							))}
						</Breadcrumbs>
					</Paper>
				</Grid>
			</Grid>
		</>
	);
}
