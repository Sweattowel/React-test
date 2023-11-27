import React, { useEffect, useState, useRef } from 'react';
import { Spinner, Box } from '@chakra-ui/react';
import { MapContainer, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css'; // Make sure to import Leaflet's CSS

const MapComponent = ({ user }) => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [loading, setLoading] = useState(true)
  const mapRef = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
        setLoading(true)
      if (!user.address) {
        console.error('User address is undefined');
        return;
      }
      try {
        const apiKey = process.env.REACT_APP_OPEN_CAGE_API_KEY;
        const { postcode, state, street, houseNumber } = user.address;
        const addressQuery = `${houseNumber} ${street}, ${state}, ${postcode}`;
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${addressQuery}&key=${apiKey}`
        );
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          const firstResult = data.results[0];
          setLatitude(firstResult.geometry.lat);
          setLongitude(firstResult.geometry.lng);
        } else {
          console.error('Geocoding service returned no results');
        }
      } catch (error) {
        console.log('Error fetching coordinates', error);
      } finally {
        setLoading(false)
      }
    };
    fetchData();
  }, [user]);

  useEffect(() => {
    // Reset the view when the user changes
    if (mapRef.current) {
        mapRef.current.setView([latitude, longitude], 13);
      }
  }, [latitude, longitude]);

  return (
    <Box position="relative" height="100%" width="100%">
      {loading && (
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
          <Spinner size="xl" color="teal.500" thickness="4px" />
        </Box>
      )}
      {!loading && (
        <MapContainer ref={mapRef} center={[latitude, longitude]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </MapContainer>
      )}
    </Box>
  );
};

export default MapComponent;