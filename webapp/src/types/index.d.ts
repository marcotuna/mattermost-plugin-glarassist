import {Channel} from 'mattermost-redux/types/channels';
import {Store, Action} from 'redux';
import {GlobalState} from 'mattermost-redux/types/store';
import React from 'react';


declare global {
    interface Window {
        registerPlugin(id: string, plugin: Plugin): void
    }
}

interface Plugin {
    initialize(registry: PluginRegistry, store: Store<GlobalState, Action<Record<string, unknown>>>);
    uninitialize();
}

export interface PluginRegistry {
    registerPostTypeComponent(typeName: string, component: React.ElementType);
    registerChannelHeaderButtonAction(icon: React.ReactNode, callback: (channel: Channel) => void, dropdownText: React.ReactNode|string);
}