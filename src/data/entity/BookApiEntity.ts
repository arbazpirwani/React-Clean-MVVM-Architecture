import {GoogleBook} from "../../domain/model/GoogleBook";

interface GoogleBookVolumeInfo {
    id: string;
    title: string;
    subtitle: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    pageCount?: number;
    printType?: string;
    imageLinks?: {
        extraLarge?: string;
        large?: string;
        medium?: string;
        small?: string;
        thumbnail?: string;
        smallThumbnail?: string;
    };
    maturityRating?: string;
    allowAnonLogging?: boolean;
    contentVersion?: string;
    language?: string;
    previewLink?: string;
    infoLink?: string;
    canonicalVolumeLink?: string;

}

export interface BookItemApiEntity {
    id: string;
    kind: string;
    etag: string;
    volumeInfo: GoogleBookVolumeInfo;
}

export interface BookApiEntity {
    items: BookItemApiEntity[];
}

export const availableImageLink = (googleBookVolumeInfo: GoogleBookVolumeInfo): string | undefined => {
    const link = googleBookVolumeInfo.imageLinks
    if (link != null) {
        if (link.extraLarge) {
            return link.extraLarge.replace(/^http:/, 'https:')
        }
        if (link.large) {
            return link.large.replace(/^http:/, 'https:')
        }
        if (link.medium) {
            return link.medium.replace(/^http:/, 'https:')
        }
        if (link.small) {
            return link.small.replace(/^http:/, 'https:')
        }
        if (link.thumbnail) {
            return link.thumbnail.replace(/^http:/, 'https:')
        }
        if (link.smallThumbnail) {
            return link.smallThumbnail.replace(/^http:/, 'https:')
        }
    }
    return undefined
}

export const fromAPIEntityToDomain = (api: BookApiEntity): GoogleBook[] => {
    return api.items.map((item) => (fromAPIEntityToDomainItem(item)))
}
export const fromAPIEntityToDomainItem = (
    {
        id, volumeInfo
    }: BookItemApiEntity): GoogleBook => ({
    id: id,
    description: volumeInfo.description,
    title: volumeInfo.title,
    subtitle: volumeInfo.subtitle,
    authors: volumeInfo.authors,
    publisher: volumeInfo.publisher,
    imageLink: availableImageLink(volumeInfo),
    pageCount: volumeInfo.pageCount
});
