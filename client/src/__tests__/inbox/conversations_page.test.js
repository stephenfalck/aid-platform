import React from 'react';
import ConversationsPage from '../../inbox/conversations';
import Messages from '../../inbox/messages';
import { shallow, mount } from 'enzyme';
import Cookies from 'js-cookie';
import { create } from 'react-test-renderer';

describe('<ConversationsPage />', () => {
    it('renders without crashing', () => {
        Cookies.getJSON = jest.fn()
        .mockImplementation(() => '1');
      
      shallow(<ConversationsPage history="/history" />);
    });

    it('renders <Messages> component', () => {  
        Cookies.getJSON = jest.fn()
        .mockImplementation(() => '1');

        const state = {messages: [{text: "hello"}, {text: "hi"}]}
        const wrapper = shallow(<ConversationsPage history="/history" />);
        wrapper.setState(state)

        const messages = <Messages messages={state.messages} />
        
  
        //console.log(wrapper.debug())
        expect(wrapper.contains(messages)).toEqual(true);
      });

});