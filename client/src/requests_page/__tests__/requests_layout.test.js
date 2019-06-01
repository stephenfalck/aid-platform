import React from 'react';
import RequestsPage from '../requests_layout';
import { shallow } from 'enzyme';
import RequestsMapContainer from '../requests_map_container';

it('renders without crashing', () => {
    shallow(<RequestsPage />);
  });

it('renders map ', () => {
    const wrapper = shallow(<RequestsPage />);
    const map = <RequestsMapContainer />;
    expect(wrapper.contains(map)).toEqual(true);
});