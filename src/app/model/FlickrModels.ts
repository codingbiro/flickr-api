// Representing an Image from Flickr
export class FlickrImage {
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
    theOwner: {
        first_name: string;
        last_name: string;
        country: string;
    };
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
// Representing a User from Flickr
export class FlickrProfile {
    id: string;
    first_name: string;
    last_name: string;
    country: string;
    occupation: string;
    profile_description: string;
    hometown: string;
    website: string;
    city: string;
    username: string;
}
// The interface to use when fetching a response from the Flickr API's Search method
export interface FlickrSearchResponse {
    photos: {
        page: number,
        pages: number,
        perpage: number,
        total: number,
        photo: FlickrImage[]
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
// The interface to use when fetching a response from the Flickr API's getListPhoto method
export interface FlickrProfileResponse {
    profile: FlickrProfile
}
// The interface for getting username
export interface FlickrUsernameResponse {
    person: {
        username: {
            _content: string
        }
    }
}