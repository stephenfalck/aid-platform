import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";

const RequestsMap = withScriptjs(withGoogleMap((props) =>{

    return (
        <GoogleMap
          defaultZoom={14}
          center={ { lat:  51.515499, lng: -0.1419 } }
          >
        </GoogleMap>
      );
    }
))

export default RequestsMap;