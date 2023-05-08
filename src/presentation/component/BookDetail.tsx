/*
 * Copyright (c) 2023 Arbaz Pirwani
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import React from "react";
import {Box, Card, CardContent, CardHeader, IconButton, Typography,} from "@mui/material";
import {Favorite, Book} from "@mui/icons-material";
import {GoogleBook} from "domain/model/GoogleBook";

interface BookDetailProps {
    book: GoogleBook | null;
}

const BookDetail: React.FC<BookDetailProps> = ({book}) => {
    const createMarkup = (html: string) => {
        return {__html: html};
    };

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
                        <Typography variant="body1" color="textPrimary" component="div"
                                    dangerouslySetInnerHTML={book?.description ? createMarkup(book.description) : undefined}>
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
                    <Box sx={{display: "flex", justifyContent: "space-between", p: 1}}>
                        <IconButton aria-label="add to cart">
                            <Book/>
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