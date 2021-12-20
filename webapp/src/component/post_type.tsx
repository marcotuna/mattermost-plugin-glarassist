import React, { FC } from 'react';

import {makeStyleFromTheme} from 'mattermost-redux/utils/theme_utils';
import {Theme} from 'mattermost-redux/types/preferences';
import { IconGlarAssist, IconGlartek } from './icon';


interface PostTypeProps {
    theme: Theme;
    post?: any;
}

/**
 * Based on https://github.com/mattermost/mattermost-plugin-zoom
 */
export const PostType: FC<PostTypeProps> = ({theme, post}) => {
    const style = getStyle(theme);
    const props = post.props || {};

    return (
    <div className='attachment attachment--pretext'>
        <div className='attachment__content'>
            <div className='clearfix attachment__container'>
                <h5 className='mt-1' style={style.title}>
                    {IconGlarAssist({marginRight: "5px", height: "25px"})}
                    GlarAssist
                </h5>
                    I've created a new assistance session (ID: {props.room_code}) <br/>
                    Click <b>Join Session</b> below to enter the session
                <div>
                    <div style={style.body}>
                        <Link link={props.link} theme={theme} />
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}


interface LinkProps {
    link: string;
    theme: Theme;
}

const Link: FC<LinkProps> = ({link, theme}) => {
    const style = getStyle(theme);

    return (
        <a className='btn btn-md btn-default'
            rel='noopener noreferrer'
            target='_blank'
            href={link}
            style={{...style.button}}
        >
            Join Session
        </a>
    );
}


const getStyle = makeStyleFromTheme((theme) => {
    return {
        body: {
            overflowX: 'auto',
            overflowY: 'hidden',
            paddingRight: '5px',
            width: '100%',
        },
        title: {
            fontWeight: '600',
        },
        button: {
            fontFamily: 'Open Sans',
            fontSize: '12px',
            fontWeight: 'bold',
            letterSpacing: '1px',
            lineHeight: '19px',
            marginTop: '12px',
            borderRadius: '4px',
            backgroundColor: theme.buttonBg,
            color: theme.buttonColor,
        },
        buttonIcon: {
            paddingRight: '8px',
            fill: theme.buttonColor,
        },
        summary: {
            fontFamily: 'Open Sans',
            fontSize: '14px',
            fontWeight: '600',
            lineHeight: '26px',
            margin: '0',
            padding: '14px 0 0 0',
        },
        summaryItem: {
            fontFamily: 'Open Sans',
            fontSize: '14px',
            lineHeight: '26px',
        },
    };
});