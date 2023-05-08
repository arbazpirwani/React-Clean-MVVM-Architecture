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

import {GoogleBook} from "domain/model/GoogleBook";
import {
  GoogleBookVolumeInfo,
  BookItemApiEntity,
  BookApiEntity,
} from 'data/entity/interfaces/BookApiEntityInterfaces';


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
