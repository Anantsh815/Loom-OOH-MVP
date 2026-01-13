"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";

// Fix for default marker icons in Next.js/Leaflet if we were using default icons,
// but we are using custom DivIcons so it might not be strictly necessary, 
// still good practice if we fall back to standard markers.
// (Skipping default icon fix since we use custom DivIcon for all nodes)

const CATEGORIES = ["All", "High-Street Retail", "Tech Parks", "Transit Hubs"];

const loomNodes = [
    { id: 1, city: 'Bangalore', area: 'Indiranagar', coords: [12.9719, 77.6412], reach: '85k', category: 'High-Street Retail' },
    { id: 2, city: 'Bangalore', area: 'Koramangala', coords: [12.9352, 77.6245], reach: '70k', category: 'High-Street Retail' },
    { id: 3, city: 'Mumbai', area: 'Bandra-Kurla Complex', coords: [19.0607, 72.8644], reach: '120k', category: 'Tech Parks' },
    { id: 4, city: 'Mumbai', area: 'Marine Drive', coords: [18.9431, 72.8230], reach: '95k', category: 'Transit Hubs' },
    { id: 5, city: 'Delhi', area: 'Cyber City (Gurgaon)', coords: [28.4950, 77.0878], reach: '150k', category: 'Tech Parks' },
    { id: 6, city: 'Delhi', area: 'Connaught Place', coords: [28.6315, 77.2167], reach: '110k', category: 'High-Street Retail' }
];

// Creating a custom pulsing icon using L.divIcon
const createPulseIcon = (isDimmed: boolean) => {
    return L.divIcon({
        className: "custom-div-icon",
        html: `
            <div class="relative flex items-center justify-center w-8 h-8 ${isDimmed ? 'opacity-20 grayscale' : ''}">
                <div class="absolute w-full h-full bg-[#00FFFF] rounded-full opacity-40 ${!isDimmed ? 'animate-ping' : ''}"></div>
                <div class="relative w-3 h-3 bg-[#00FFFF] rounded-full shadow-[0_0_10px_#00FFFF] hover:bg-white hover:scale-125 transition-all duration-300"></div>
            </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16], // Center the icon
        popupAnchor: [0, -10]
    });
};

function MapController() {
    const map = useMap();

    useEffect(() => {
        if (loomNodes.length > 0) {
            const bounds = L.latLngBounds(loomNodes.map(n => n.coords as [number, number]));
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [map]);

    return null;
}

export default function LeafletMapInternal() {
    const [activeCategory, setActiveCategory] = useState<string>('All');

    return (
        <div className="relative w-full h-full">
            <MapContainer
                center={[20.5937, 78.9629]}
                zoom={5}
                scrollWheelZoom={false}
                zoomControl={false}
                className="w-full h-full bg-[#050a14]"
                attributionControl={false}
            >
                <ZoomControl position="bottomright" />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />

                <MapController />

                {loomNodes.map((node) => {
                    const isDimmed = activeCategory !== 'All' && node.category !== activeCategory;

                    return (
                        <Marker
                            key={node.id}
                            position={node.coords as [number, number]}
                            icon={createPulseIcon(isDimmed)}
                            opacity={isDimmed ? 0.2 : 1}
                            eventHandlers={{
                                click: (e) => {
                                    if (isDimmed) {
                                        e.target.closePopup();
                                    }
                                }
                            }}
                        >
                            <Popup className="custom-leaflet-popup">
                                <div className="p-2 min-w-[200px] text-left">
                                    <h4 className="font-bold text-sm text-black mb-1 font-[family-name:var(--font-space-grotesk)]">
                                        {node.area} <span className="text-slate-400 font-normal">|</span> Daily Reach: {node.reach}
                                    </h4>
                                    <div className="text-xs text-slate-500 mb-2 font-medium">{node.category}</div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                        <span className="text-xs text-green-600 font-bold tracking-wide uppercase">Live Now</span>
                                    </div>
                                    <button
                                        className="w-full py-1.5 bg-black text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-[#00FFFF] hover:text-black transition-colors"
                                        onClick={() => console.log(`Reserving ${node.area}...`)}
                                    >
                                        Reserve This Spot
                                    </button>
                                </div>
                            </Popup>
                        </Marker>
                    )
                })}
            </MapContainer>

            {/* Filter Overlay */}
            <div className="absolute top-4 right-4 z-[1000] flex gap-2 flex-wrap justify-end">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`
                            px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 backdrop-blur-md border
                            ${activeCategory === cat
                                ? "bg-[#00FFFF] text-black border-[#00FFFF] shadow-[0_0_15px_#00FFFF]"
                                : "bg-black/60 text-slate-300 border-white/10 hover:border-[#00FFFF] hover:text-white"
                            }
                        `}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
    );
}
