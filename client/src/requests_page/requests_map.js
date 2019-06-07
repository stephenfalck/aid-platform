import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
//import { store } from "../redux/store";
import RequestMarker from './request_marker';

const RequestsMap = withScriptjs(withGoogleMap((props) =>{

    /*const markers = store.getState().requests.map(request => 
        <RequestMarker 
          key={request.id} request={request} location={{lat: request.latitude, lng: request.longitude}}
        />
    );*/

    const markers = props.requests.map(request => 
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

export default RequestsMap;