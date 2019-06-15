import React from 'react';
import { RequestsPage } from '../../map/requests_layout';
import { shallow, mount } from 'enzyme';
import RequestsMapContainer from '../../map/requests_map_container';
import { Provider } from 'react-redux';

it('renders without crashing', () => {
    shallow(<RequestsPage />);
  });

  /*

it('renders map ', () => {
    const props = {
      userLocation: 'london',
      requests: [{request1: true},{request2: true},{request3: true}]
    }

    const wrapper = shallow(<RequestsPage />);
    const map = <RequestsMapContainer {...props}/>;
    expect(wrapper.contains(map)).toEqual(true);
});

*/