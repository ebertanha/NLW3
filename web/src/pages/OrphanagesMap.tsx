import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';

import logoMarkerImg from '../images/map-marker.svg';
import '../styles/pages/orphanages-map.css';
import api from '../services/api';
import Orphanage from './Orphanage';

const mapIcon = Leaflet.icon({
    iconUrl: logoMarkerImg,
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2]
});

interface Orphanage {
    id: number,
    name: string,
    latitude: number,
    longitude: number    
}

function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    // console.log(orphanages);

    useEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data);
        })
    }, [] );


    return(
        <div id="page-map">
            <aside>
                <header>
                    <img src={logoMarkerImg} alt="Happy"/>
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Limeira</strong>
                    <span>São Paulo</span>
                </footer>
            </aside>

            <Map 
                center={[-22.5708501,-47.4000366]}
                zoom={15}
                style={{ width: '100%', height: '100%' }}
            >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {orphanages.map(orphanage => {
                return (<Marker
                    icon={mapIcon}
                    position={[orphanage.latitude,orphanage.longitude]}
                    key={orphanage.id}>   
                    <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup" >
                        {orphanage.name}
                        <Link to={`/orphanage/${orphanage.id}`}>
                            <FiArrowRight size="20" color="#fff"/>
                        </Link>
                    </Popup>

                </Marker>                
            )})}

            </Map>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size="32" color="#fff"/>
            </Link>

        </div>
    )
}

export default OrphanagesMap;