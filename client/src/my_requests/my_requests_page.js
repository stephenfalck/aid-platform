import React, { Fragment } from 'react';
import Cookies from 'js-cookie';
import Navbar from '../navbar/navbar'
import { store } from "../redux/store";
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        requests: state.requests
    }
}

class MyRequestsPage extends React.Component {
    componentDidMount() {
        console.log(store.getState())
        console.log(this.props.requests)
    }
    render() {
        return(
            <Fragment>
                <Navbar title='My Requests'/>
            </Fragment>
        )
    }
}

export default connect(mapStateToProps)(MyRequestsPage);