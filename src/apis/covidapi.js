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

export const fetchByCountryData = async ({Country}) => {
    try {
        const response = await covid.get(`/country/${Country}`, {
            from: '2020-03-01T00:00:00Z',
            to: new Date().toISOString()
        });
        return response;
    } catch (error) {
        console.log('error', error);
        return error;
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