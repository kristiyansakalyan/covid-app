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

export const fetchByCountryData = async ({Country,from,to}) => {
    try {
        console.log(from);
        console.log(to);
        const response = await covid.get(`/country/${Country}`, {
            params: {
                from: from,
                to: to
        }});
        return response;
    } catch (error) {
        throw error;
    }
}

export const fetchAllCountries = async () => {
    try {
        const response = await covid.get('countries');
        return response;
    } catch (error) {
        console.log('error', error);
        return error;
    }
};