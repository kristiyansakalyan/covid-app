import axios from 'axios';

const covid = axios.create({
    baseURL: 'https://api.covid19api.com'
});

export const fetchGlobalData = async () => {
    try {
        const response = await covid.get('summary');
        return response;
    } catch(error) {
        console.log('error', error)
        return error;
    }
} 