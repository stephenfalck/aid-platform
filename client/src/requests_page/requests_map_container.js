import React from "react";
import RequestsMap from './requests_map';

class RequestsMapContainer extends React.Component {
    
    render() {
        //const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
        const apiKey = 'AIzaSyCrNPz4UTHYuMbYlXUxM7UT21hf9742Dfk'
        
        return(
            
            <RequestsMap
                requests = {this.props.requests}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`}   
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%`, width: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        );
    }
}

export default RequestsMapContainer;