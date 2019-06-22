import React from 'react';
import ConversationsPage from '../../inbox/conversations';
import ConversationUser from '../../inbox/conversation_user';
import Messages from '../../inbox/messages';
import Navbar from '../../navbar/navbar';
import { shallow, mount } from 'enzyme';
import Cookies from 'js-cookie';
import { create } from 'react-test-renderer';

describe('<ConversationsPage />', () => {
    it('renders without crashing', () => {
        Cookies.getJSON = jest.fn()
        .mockImplementation(() => '1');
      
      shallow(<ConversationsPage history="/history" />);
    });

    it('renders <Navbar> component', () => {  
      Cookies.getJSON = jest.fn()
        .mockImplementation(() => '1');

      const wrapper = shallow(<ConversationsPage/>);
      const navbar = <Navbar title="Inbox"/>

      expect(wrapper.contains(navbar)).toEqual(true);
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

      it('renders a list of conversation users', () => {
        
        /* FIX THIS TEST */

        Cookies.getJSON = jest.fn()
        .mockImplementation(() => '1');

        let conversations = [
          {id: 1},
          {id: 2},
          {id: 3}
        ]
      
        const wrapper = mount(<ConversationsPage history="/history" />);
        wrapper.setState({conversations: conversations})
        console.log(wrapper.debug())

        function component() {
          return <ConversationUser />
        }
        //const component = <Navbar title="Inbox"/>
        expect(wrapper.find(component)).to.have.lengthOf(3)
        //expect(wrapper.contains(component)).toEqual(true);
      })

});