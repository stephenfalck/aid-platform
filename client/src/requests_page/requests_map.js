import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import { connect } from 'react-redux';
//import { store } from "../redux/store";
import RequestMarker from './request_marker';

const mapStateToProps = (state) => {
  return{
    requests: state.requests
  }
}

const RequestsMap = withScriptjs(withGoogleMap((props) =>{

  let unFulfilledRequests = props.requests.filter(request => request.fulfilled === false);

    const markers = unFulfilledRequests.map(request => 
      <RequestMarker 
          key={request.id} request={request} location={{lat: request.latitude, lng: request.longitude}}
        />
    )

    return (
        <GoogleMap
          defaultZoom={14}
          center={ { lat:  51.515499, lng: -0.1419 } }
          >
            {markers}
        </GoogleMap>
      );
    }
))

export default connect(mapStateToProps)(RequestsMap);