import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
    width: "100%",
    height: "60vh",
};

const center = {
    lat: 35.69575,
    lng: 139.77521,
};

export const Map = () => {
    return (
    <LoadScript googleMapsApiKey="AIzaSyAGNGbHGpTca1CXdOfH2Ct3_qlMIdHyeNw">
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={17}
        ></GoogleMap>
    </LoadScript>
    );
};