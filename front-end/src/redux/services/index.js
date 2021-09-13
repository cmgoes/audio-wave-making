// ** fetch
import { Root } from 'config';
import axios from 'axios';

const sessionToken = JSON.parse(localStorage.getItem(Root.sessionKey))

export const Axios = async ({ url, data = {}, method = 'POST', headers = {} }) => {
    console.log(`sessionToken`, sessionToken)
    const response = await axios({
        url: `${Root.baseurl}${url}`,
        headers: {
            ...headers,
            'X-Requested-With': 'XMLHttpRequest',
            'access-token': sessionToken
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