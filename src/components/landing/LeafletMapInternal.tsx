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

const CITY_COORDS = {
    Bangalore: [12.9716, 77.5946],
    Mumbai: [19.0760, 72.8777],
    Delhi: [28.7041, 77.1025]
};

const METRO_CLUSTERS = [
    { name: 'Mumbai', latMin: 18.9, latMax: 19.2, lngMin: 72.8, lngMax: 73.0 },
    { name: 'Delhi', latMin: 28.4, latMax: 28.7, lngMin: 77.0, lngMax: 77.3 },
    { name: 'Bangalore', latMin: 12.8, latMax: 13.1, lngMin: 77.5, lngMax: 77.7 },
    { name: 'Hyderabad', latMin: 17.3, latMax: 17.5, lngMin: 78.3, lngMax: 78.5 },
    { name: 'Chennai', latMin: 12.9, latMax: 13.1, lngMin: 80.1, lngMax: 80.3 },
    { name: 'Kolkata', latMin: 22.4, latMax: 22.6, lngMin: 88.3, lngMax: 88.5 }
];

const generateMetroNodes = () => {
    const nodes: any[] = [];
    let idCounter = 1;
    const TOTAL_NODES = 100;
    const NODES_PER_CLUSTER = Math.floor(TOTAL_NODES / METRO_CLUSTERS.length);

    METRO_CLUSTERS.forEach(cluster => {
        for (let i = 0; i < NODES_PER_CLUSTER; i++) {
            const lat = cluster.latMin + Math.random() * (cluster.latMax - cluster.latMin);
            const lng = cluster.lngMin + Math.random() * (cluster.lngMax - cluster.lngMin);
            const category = CATEGORIES[1 + Math.floor(Math.random() * (CATEGORIES.length - 1))]; // Random category excluding 'All'

            nodes.push({
                id: idCounter++,
                city: cluster.name,
                area: `${cluster.name} Node #${i + 1}`,
                coords: [lat, lng],
                reach: `${(Math.floor(Math.random() * 50) + 10)}k`, // 10k - 60k
                category: category
            });
        }
    });
    return nodes;
};

const loomNodes = generateMetroNodes();

// Creating a custom pulsing icon using L.divIcon
const createPulseIcon = (isDimmed: boolean) => {
    return L.divIcon({
        className: "custom-div-icon",
        html: `
            <div class="relative flex items-center justify-center w-4 h-4 ${isDimmed ? 'opacity-20 grayscale' : ''}">
                <div class="absolute w-full h-full bg-[#00FFFF] rounded-full opacity-40 ${!isDimmed ? 'animate-ping' : ''}"></div>
                <div class="relative w-2 h-2 bg-[#00FFFF] rounded-full shadow-[0_0_10px_#00FFFF] hover:bg-white hover:scale-125 transition-all duration-300"></div>
            </div>
        `,
        iconSize: [16, 16],
        iconAnchor: [8, 8], // Center the icon
        popupAnchor: [0, -6],
        shadowUrl: undefined, // No shadow
        shadowSize: undefined
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

function CityFocusControl() {
    const map = useMap();

    const handleFocus = (coords: number[]) => {
        map.flyTo(coords as L.LatLngExpression, 12, {
            duration: 2 // 2 seconds smooth animation
        });
    };

    return (
        <div className="absolute top-1/2 left-4 z-[9999] -translate-y-1/2 flex flex-col gap-3">
            <div className="glass-panel p-3 rounded-xl border border-[#00FFFF] shadow-[0_0_15px_rgba(0,255,255,0.2)] flex flex-col gap-2">
                <h3 className="text-[#00FFFF] text-xs font-bold uppercase tracking-widest mb-1 text-center" style={{ textShadow: '0 0 5px rgba(0,0,0,0.8)' }}>
                    Quick Focus
                </h3>
                {Object.entries(CITY_COORDS).map(([city, coords]) => (
                    <button
                        key={city}
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent map click
                            handleFocus(coords);
                        }}
                        className="px-4 py-2 text-xs font-bold uppercase tracking-wide text-white hover:text-black hover:bg-[#00FFFF] border border-white/10 hover:border-[#00FFFF] rounded transition-all duration-300"
                    >
                        {city}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default function LeafletMapInternal() {
    const [activeCategory, setActiveCategory] = useState<string>('All');

    return (
        <div className="relative w-full h-full">
            <MapContainer
                center={[20.5937, 78.9629]}
                zoom={5}
                scrollWheelZoom={true}
                doubleClickZoom={true}
                zoomSnap={0.5}
                zoomDelta={0.5}
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
                <CityFocusControl />

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
                                    <h4 className="font-bold text-sm text-white mb-1 font-[family-name:var(--font-space-grotesk)]" style={{ textShadow: '0 0 5px rgba(0,0,0,0.8)' }}>
                                        {node.area} <span className="text-slate-400 font-normal">|</span> <span className="text-[#00FFFF]">Daily Reach: {node.reach}</span>
                                    </h4>
                                    <div className="text-xs text-slate-300 mb-2 font-medium">{node.category}</div>
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
            <div className="absolute top-4 right-4 z-[9999] flex gap-2 flex-wrap justify-end">
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
