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
}

export interface FlickrResponse {
    photos: {
        page: number,
        pages: number,
        perpage: number,
        total: number,
        photo: FlickImage[]
    }
}