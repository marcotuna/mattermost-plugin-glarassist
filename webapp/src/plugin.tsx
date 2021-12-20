import React from 'react';
import {Store, Action} from 'redux';
import {GlobalState} from 'mattermost-redux/types/store';
import {PluginRegistry, Plugin} from './types';
import { IconGlarAssist, IconHeadphones, IconMeet } from './component/icon';
import { PostType } from './component/post_type';
import { startAssistance } from './component/start_assistance';
import Client from './client';
import { getServerRoute } from './selectors';

export class MattermostPlugin implements Plugin {
    public async initialize(registry: PluginRegistry, store: Store<GlobalState, Action<Record<string, unknown>>>) {
        console.log('Initializing MattermostPlugin...')
        // @see https://developers.mattermost.com/extend/plugins/webapp/reference/

        Client.setServerRoute(getServerRoute(store.getState()));
        
        registry.registerChannelHeaderButtonAction(
            <IconHeadphones />,
            (channel) => startAssistance(channel)(store.dispatch, store.getState),
            "GlarAssist Assistance"
        );

        registry.registerPostTypeComponent(
            'custom_meet_post_type',
            (props) => <PostType theme={props.theme}  post={props.post}/>
        );
    }

    public async uninitialize() {
        console.log('Unintializing MattermostPlugin...')
    }
}