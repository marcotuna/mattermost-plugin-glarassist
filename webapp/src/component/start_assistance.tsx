import { Dispatch } from 'react';
import {Action} from 'redux';
import {GlobalState} from 'mattermost-redux/types/store';

import { Channel } from 'mattermost-redux/types/channels';
import {getCurrentUserId} from 'mattermost-redux/selectors/entities/common';
import {createPostImmediately} from 'mattermost-redux/actions/posts';
import { Post } from 'mattermost-redux/types/posts';
import Client from '../client';
import { Configuration, Room } from '../types/api';

export const startAssistance = (channel: Channel) => {
    return async (dispatch: Dispatch<Action<Record<string, unknown>>>, getState: () => GlobalState) => {
        const state = getState();
        
        const createConfiguration: Configuration = await Client.getConfiguration()
        const createRoom: Room = await Client.createRoom()
        const url = `${createConfiguration.ServerURL}/session/${createRoom.code}`;

        // Open a window?
        // window.open(url);

        const post: Post = {
            create_at: Date.now(),
            user_id: getCurrentUserId(state),
            channel_id: channel.id,
            type: 'custom_meet_post_type',
            props: {
                room_code: createRoom.code,
                link: url
            },
        } as any;

        return await dispatch(createPostImmediately(post as any) as any);
    }
}