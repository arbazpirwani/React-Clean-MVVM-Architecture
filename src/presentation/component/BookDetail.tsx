import React from "react";
import {Box, Card, CardContent, CardHeader, IconButton, Typography,} from "@mui/material";
import {Favorite, ShoppingCart} from "@mui/icons-material";
import {GoogleBook} from "../../domain/model/GoogleBook";


interface BookDetailProps {
    book: GoogleBook | null;
}

const BookDetail: React.FC<BookDetailProps> = ({book}) => {
    return (
        <Card sx={{mt: 2}}>
            <CardHeader
                title={book?.title}
                sx={{
                    bgcolor: "#eeeeee",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Box sx={{display: "flex", alignItems: "center"}}>
                    <Typography variant="subtitle1" color="textSecondary" sx={{mr: 1}}>
                        by {book?.authors?.join(', ')}
                    </Typography>
                    <IconButton aria-label="add to favorites">
                        <Favorite/>
                    </IconButton>
                </Box>
            </CardHeader>
            <Box sx={{display: "flex"}}>
                <Box sx={{flex: 1}}>
                    <CardContent sx={{pt: 2, pb: 2}}>
                        <Typography variant="body1" color="textPrimary">
                            {book?.description}
                        </Typography>
                    </CardContent>
                </Box>
                <Box sx={{display: "flex", flexDirection: "column", width: 200}}>
                    <Box sx={{flexGrow: 1}}>
                        <img
                            src={book?.imageLink}
                            alt={book?.title}
                            style={{width: "100%"}}
                        />
                    </Box>
                    <Box sx={{display: "flex", justifyContent: "space-between"}}>
                        <IconButton aria-label="add to cart">
                            <ShoppingCart/>
                        </IconButton>
                        <Typography variant="subtitle1" color="textSecondary">
                            {book?.publisher}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Card>
    );
};

export default BookDetail;