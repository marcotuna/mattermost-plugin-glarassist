import {getConfig} from 'mattermost-redux/selectors/entities/general';
import {id as pluginId} from './manifest';

const getPluginState = (state: any) => state['plugins-' + pluginId] || {};

export const isEnabled = (state: any) => getPluginState(state).enabled;
export const getServerRoute = (state: any) => {
    const config = getConfig(state);
    let basePath = '';
    if (config && config.SiteURL) {
        basePath = new URL(config.SiteURL).pathname;
        if (basePath && basePath[basePath.length - 1] === '/') {
            basePath = basePath.substr(0, basePath.length - 1);
        }
    }

    return basePath;
};

export const pluginSettings = (state: any) => getPluginState(state).pluginSettings;