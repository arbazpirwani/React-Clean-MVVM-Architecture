export interface GoogleBook {
    id: string;
    title: string;
    description?: string,
    subtitle: string;
    authors?: string[],
    publisher?: string,
    imageLink?: string;
    pageCount?: number
}