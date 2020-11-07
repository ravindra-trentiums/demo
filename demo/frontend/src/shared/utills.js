import {BASE_URL} from './settings';

export const getImage = (imageURL) => {
    if(imageURL) {
        if(imageURL.includes('http')) return imageURL;
        return `${BASE_URL}${imageURL}`;
    }
   return '';
};