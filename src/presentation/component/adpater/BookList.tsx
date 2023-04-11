import {GoogleBook} from "../../../domain/model/GoogleBook";
import {Grid} from "@mui/material";
import React from "react";
import {Book} from "./item/Book";

interface BookListProps {
    books: GoogleBook[] | null;
}

const BookList = ({books}: BookListProps) => {
    return (
        <Grid container spacing={2} justifyContent="center">
            {books?.map((book) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
                    <Book book={book}/>
                </Grid>
            ))}
        </Grid>
    );
};

export default BookList;