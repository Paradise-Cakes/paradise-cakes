import React from "react";
import {Box, TextField, Typography, Container} from "@mui/material";

export default function CreateDessert() {
	return (
		<Container sx={{border: "2px solid red"}}>
			<Box px={8} sx={{paddingTop: {xs: "1rem"}}}>
				<Typography
					variant="h4"
					sx={{textAlign: {xs: "center", sm: "start"}}}
				>
					New Dessert
				</Typography>
				<Box component={"form"} sx={{maxWidth: "400px"}}>
					<TextField fullWidth label={"Name"} sx={{marginTop: "1rem"}}/>
					<TextField fullWidth label={"Description"} multiline sx={{marginTop: "1rem"}} rows={4}/>
				</Box>
			</Box>
		</Container>
	);
}
