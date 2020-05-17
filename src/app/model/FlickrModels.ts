// Representing an Image from Flickr
export class FlickImage {
    id: number;
    owner: string;
    secret: string;
    server: number;
    farm: number;
    title: string;
    ispublic: number;
    isfriend: number;
    isfamily: number;
    tags: FlickrTag[];
}
// Representing a Tag from Flickr
export class FlickrTag {
    id: string;
    author: string;
    authorname: string;
    raw: string;
    _content: string;
    machine_tag: boolean;
}
// The interface to use when fetching a response from the Flickr API's Search method
export interface FlickrSearchResponse {
    photos: {
        page: number,
        pages: number,
        perpage: number,
        total: number,
        photo: FlickImage[]
    }
}
// The interface to use when fetching a response from the Flickr API's getListPhoto method
export interface FlickrTagResponse {
    photo: {
        id: string,
        tags: {
            tag: FlickrTag[]
        }
    }
}