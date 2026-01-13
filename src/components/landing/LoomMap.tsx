"use client";

import { APIProvider, Map, AdvancedMarker, InfoWindow, useAdvancedMarkerRef } from "@vis.gl/react-google-maps";
import { useState } from "react";
import { cn } from "@/lib/utils";

const DARK_MAP_ID = "22c1df6d389a9f02"; // Using a demo mapId or user needs to create one. 
// For this MVP, we will try to use a style array if mapId is not sufficient, but new AdvancedMarkers require Map ID.
// I will provide a fallback style JSON but rely on Map ID for performance.
// Since the user might not have a Map ID, I'll fallback gracefully? 
// No, react-google-maps works best with Map ID for advanced markers. I'll use a placeholder.

// "Void Dark" Style
const mapStyle = [
    { elementType: "geometry", stylers: [{ color: "#050a14" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#050a14" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
    { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
    { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#070e1a" }] },
    { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#6b9a76" }] },
    { featureType: "road", elementType: "geometry", stylers: [{ color: "#101622" }] },
    { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#1b2332" }] },
    { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9ca5b3" }] },
    { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#746855" }] },
    { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#1f2835" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#0a101b" }] },
    { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#515c6d" }] },
    { featureType: "water", elementType: "labels.text.stroke", stylers: [{ color: "#17263c" }] },
];

const BANGALORE_NODES = Array.from({ length: 10 }).map((_, i) => ({
    id: `blr-${i}`,
    lat: 12.9784 + (Math.random() - 0.5) * 0.02,
    lng: 77.6408 + (Math.random() - 0.5) * 0.02,
    city: "Bangalore",
    location: "Indiranagar",
    reach: "50,000+ daily"
}));

const GURGAON_NODES = Array.from({ length: 10 }).map((_, i) => ({
    id: `ggn-${i}`,
    lat: 28.4949 + (Math.random() - 0.5) * 0.03,
    lng: 77.0895 + (Math.random() - 0.5) * 0.03,
    city: "Gurgaon",
    location: "Cyber City",
    reach: "65,000+ daily"
}));

const ALL_NODES = [...BANGALORE_NODES, ...GURGAON_NODES];

export function LoomMap() {
    const [activeNode, setActiveNode] = useState<string | null>(null);

    // In a real app, API key should be environmental
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

    if (!apiKey) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center bg-[#050a14] text-slate-500 p-8 text-center border border-[var(--card-border)] rounded-3xl">
                <h3 className="text-xl font-bold text-white mb-2">Map Unavailable</h3>
                <p>Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env file to view the live network.</p>
            </div>
        )
    }

    return (
        <APIProvider apiKey={apiKey}>
            <div className="w-full h-[600px] rounded-3xl overflow-hidden border border-[var(--card-border)] relative">
                <Map
                    defaultCenter={{ lat: 12.9784, lng: 77.6408 }}
                    defaultZoom={13}
                    mapId={DARK_MAP_ID} // Required for AdvancedMarker
                    styles={mapStyle} // Fallback styles
                    disableDefaultUI={true}
                    zoomControl={true}
                    streetViewControl={false}
                    mapTypeControl={false}
                    className="w-full h-full"
                >
                    {ALL_NODES.map((node) => (
                        <LoomMarker key={node.id} node={node} />
                    ))}
                </Map>

                {/* Overlay Controls */}
                <div className="absolute top-4 left-4 p-4 bg-black/80 backdrop-blur-md rounded-xl border border-[var(--card-border)] text-white">
                    <h4 className="font-bold text-[var(--primary)] mb-1">Live Network</h4>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse"></span>
                        Running perfectly
                    </div>
                </div>
            </div>
        </APIProvider>
    );
}

function LoomMarker({ node }: { node: any }) {
    const [isOpen, setIsOpen] = useState(false);
    // useAdvancedMarkerRef hook isn't strictly necessary if strict referencing isn't needed, but good for InfoWindow anchoring
    // Actually, explicit anchor management is easier component-side.

    return (
        <AdvancedMarker
            position={{ lat: node.lat, lng: node.lng }}
            onClick={() => setIsOpen(true)}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <div className="relative flex items-center justify-center group cursor-pointer">
                <div className="absolute w-8 h-8 bg-[var(--primary)] rounded-full opacity-20 animate-ping"></div>
                <div className="w-3 h-3 bg-[var(--primary)] rounded-full shadow-[0_0_10px_var(--primary)] group-hover:bg-white group-hover:scale-125 transition-all duration-300"></div>
            </div>

            {isOpen && (
                <InfoWindow anchor={null} headerDisabled className="custom-info-window">
                    <div className="p-2 min-w-[200px]">
                        <h4 className="font-bold text-sm text-black mb-1">{node.location}</h4>
                        <div className="text-xs text-slate-600 font-medium">Reach: {node.reach}</div>
                        <div className="text-xs text-green-600 font-bold mt-1 tracking-wide flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> ACTIVE
                        </div>
                    </div>
                </InfoWindow>
            )}
        </AdvancedMarker>
    )
}
