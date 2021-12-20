import {Client4} from 'mattermost-redux/client';
import {ClientError} from 'mattermost-redux/client/client4';

import {id as pluginId} from '../manifest';

export default class Client {
    url: string | undefined;
    setServerRoute(url: string) {
        this.url = url + `/plugins/${pluginId}/api/v1`;
    }

    getConfiguration = async () => {
        return this.doGet(`${this.url}/configuration`);
    }

    createRoom = async () => {
        return this.doGet(`${this.url}/create`);
    }

    doGet = async (url: string, body?: string, headers = {}) => {

        const options = {
            method: 'get',
            headers,
        };

        const response = await fetch(url, Client4.getOptions(options));

        if (response.ok) {
            return response.json();
        }

        const text = await response.text();

        throw new ClientError(Client4.url, {
            message: text || '',
            status_code: response.status,
            url,
        });
    }

    doPost = async (url: string, body?: string, headers = {}) => {

        const options = {
            method: 'post',
            body: JSON.stringify(body),
            headers,
        };

        const response = await fetch(url, Client4.getOptions(options));

        if (response.ok) {
            return response.json();
        }

        const text = await response.text();

        throw new ClientError(Client4.url, {
            message: text || '',
            status_code: response.status,
            url,
        });
    }

    doDelete = async (url: string, body?: string, headers = {}) => {

        const options = {
            method: 'delete',
            headers,
        };

        const response = await fetch(url, Client4.getOptions(options));

        if (response.ok) {
            return response.json();
        }

        const text = await response.text();

        throw new ClientError(Client4.url, {
            message: text || '',
            status_code: response.status,
            url,
        });
    }

    doPut = async (url: string, body?: string, headers = {}) => {

        const options = {
            method: 'put',
            body: JSON.stringify(body),
            headers,
        };

        const response = await fetch(url, Client4.getOptions(options));

        if (response.ok) {
            return response.json();
        }

        const text = await response.text();

        throw new ClientError(Client4.url, {
            message: text || '',
            status_code: response.status,
            url,
        });
    }
}