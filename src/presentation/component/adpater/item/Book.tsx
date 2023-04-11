import {Card, CardActionArea, CardContent, CardMedia, Typography} from '@mui/material';
import {GoogleBook} from "../../../../domain/model/GoogleBook";

interface BookProps {
    book: GoogleBook;
}

export const Book = ({book}: BookProps) => {
    return (
        <Card >
            <CardActionArea href={`book/${book.id}`}>
                <CardMedia
                    component="img"
                    height="400"
                    image={book.imageLink}
                    alt={book.title}
                    sx={{boxShadow: 8}}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {book.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {book.pageCount} pages | {book.authors?.join(', ')} | {book.publisher}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};
