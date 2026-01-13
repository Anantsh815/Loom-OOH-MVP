"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";

// Fix for default marker icons in Next.js/Leaflet if we were using default icons,
// but we are using custom DivIcons so it might not be strictly necessary, 
// still good practice if we fall back to standard markers.
// (Skipping default icon fix since we use custom DivIcon for all nodes)

// Reusing the node data from the original file
const BANGALORE_NODES = Array.from({ length: 10 }).map((_, i) => ({
    id: `blr-${i}`,
    lat: 12.9784 + (Math.random() - 0.5) * 0.05,
    lng: 77.6408 + (Math.random() - 0.5) * 0.05,
    city: "Bangalore",
    location: "Indiranagar",
    reach: "50,000+ daily"
}));

const GURGAON_NODES = Array.from({ length: 10 }).map((_, i) => ({
    id: `ggn-${i}`,
    lat: 28.4949 + (Math.random() - 0.5) * 0.05,
    lng: 77.0895 + (Math.random() - 0.5) * 0.05,
    city: "Gurgaon",
    location: "Cyber City",
    reach: "65,000+ daily"
}));

const ALL_NODES = [...BANGALORE_NODES, ...GURGAON_NODES];

// Creating a custom pulsing icon using L.divIcon
const createPulseIcon = () => {
    return L.divIcon({
        className: "custom-div-icon",
        html: `
            <div class="relative flex items-center justify-center w-8 h-8">
                <div class="absolute w-full h-full bg-[var(--primary)] rounded-full opacity-20 animate-ping"></div>
                <div class="relative w-3 h-3 bg-[var(--primary)] rounded-full shadow-[0_0_10px_var(--primary)] hover:bg-white hover:scale-125 transition-all duration-300"></div>
            </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16], // Center the icon
        popupAnchor: [0, -16]
    });
};

export default function LeafletMapInternal() {
    return (
        <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            scrollWheelZoom={false}
            className="w-full h-full bg-[#050a14]"
            attributionControl={false} // Clean look, adding custom attribution if needed or keep standard
        >
            {/* Custom Attribution defined in requirements but MapContainer has an attributionControl prop default true. 
                 To use custom position or style, we can disable and add our own, 
                 or just let TileLayer handle it via the attribution prop.
             */}
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />

            {ALL_NODES.map((node) => (
                <Marker
                    key={node.id}
                    position={[node.lat, node.lng]}
                    icon={createPulseIcon()}
                >
                    <Popup className="custom-leaflet-popup">
                        <div className="p-1 min-w-[150px]">
                            <h4 className="font-bold text-sm text-black mb-1">{node.location}</h4>
                            <div className="text-xs text-slate-600 font-medium">{node.city}</div>
                            <div className="text-xs text-slate-600">Reach: {node.reach}</div>
                            <div className="text-xs text-green-600 font-bold mt-1 tracking-wide flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> ACTIVE
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
