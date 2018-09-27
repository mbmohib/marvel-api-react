import axios from 'axios';
import CryptoJS from 'crypto-js';
import config from '../config';

export default async (url, limit=20, offset=0) => {

    // New timestamp for every request                                                                                    
    const ts = new Date().getTime();
    // New Hash for every request
    const hash = CryptoJS.MD5(ts + config.privateKey + config.publicKey).toString();

    try {
        const results = await axios.get(url, {
            params: {
                ts,
                hash,
                limit,
                offset,
                apikey: config.publicKey
            }}
        )
        
        return results;
    } catch(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);
    }
}