import React from 'react';
import ConversationUser from '../../inbox/conversation_user';
import { shallow, mount } from 'enzyme';
import Cookies from 'js-cookie';
import { IsoTwoTone } from '@material-ui/icons';

describe('<ConversationUser>', () => {
    it('renders without crashing', () => {
        const conversation = {
            id: 1
        }

        shallow(<ConversationUser 
                key={conversation.id}
                conversation={conversation} 
                setConversationUser={1} 
                active={false}
            />)
    })
})