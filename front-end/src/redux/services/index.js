// ** fetch
import { Root } from '../../config/index';
import axios from 'axios';

export const Axios = async ({ url, data = {}, method = 'POST', headers = {} }) => {
    const response = await axios({
        url: `${Root.baseurl}${url}`,
        headers: {
            ...headers,
            'X-Requested-With': 'XMLHttpRequest'
        },
        method,
        data
    })
    return response.data
}

export const fetchs = async ({ url, body = {}, method = 'POST', headers = {} }) => {
    const fetchResponse = await fetch(`${Root.baseurl}${url}`, {
        method: method,
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
    }).catch(error => console.log(`error`, error))
    const resultData = await fetchResponse.json();
    if (resultData.session) {
        store.dispatch(LogOut())
    }
    return resultData
}