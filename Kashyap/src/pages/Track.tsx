import MobileLayout from "@/components/Layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const machine = {
    id: 1,
    name: "Super Seeder Pro",
    lat: 23.2599,
    lng: 77.4126,
    status: "In Use",
};

const Track = () => {
    return (
        <MobileLayout>
            {/* Header */}
            <div className="gradient-primary p-4 rounded-b-3xl">
                <h1 className="text-2xl font-bold text-primary-foreground">
                    Live Tracking
                </h1>
                <p className="text-primary-foreground/80 text-sm">
                    Track your machine in real-time
                </p>
            </div>

            {/* Map */}
            <div className="p-4">
                <Card className="h-80 rounded-2xl overflow-hidden card-shadow bg-muted relative">
                    <MapContainer
                        center={[machine.lat, machine.lng]}
                        zoom={16}
                        className="h-full w-full rounded-2xl"
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker position={[machine.lat, machine.lng]}>
                            <Popup>
                                <div>
                                    <h3 className="font-semibold">{machine.name}</h3>
                                    <p className="text-sm">{machine.status}</p>
                                </div>
                            </Popup>
                        </Marker>
                    </MapContainer>
                    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                        <div className="w-20 h-20 mx-auto bg-success/20 rounded-full flex items-center justify-center animate-pulse">
                            <Navigation className="h-10 w-10 text-success" />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Status Card */}
            <div className="px-4 space-y-4">
                <Card className="p-4 rounded-2xl elevated-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-lg">{machine.name}</h3>
                        <Badge className="bg-success text-success-foreground">
                            In Use
                        </Badge>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <p className="text-sm font-medium">Current Location</p>
                                <p className="text-xs text-muted-foreground">
                                    Green Valley, Sector 12, Near Water Tank
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <p className="text-sm font-medium">Estimated Time</p>
                                <p className="text-xs text-muted-foreground">
                                    1 hour 30 minutes remaining
                                </p>
                            </div>
                        </div>

                        <div className="pt-3 border-t">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Operator</span>
                                <span className="font-medium">Rajesh Kumar</span>
                            </div>
                        </div>
                    </div>

                    <Button className="w-full mt-4 h-11 rounded-xl" variant="outline">
                        <Phone className="h-4 w-4 mr-2" />
                        Contact Operator
                    </Button>
                </Card>

                {/* Status Timeline */}
                <Card className="p-4 rounded-2xl card-shadow">
                    <h3 className="font-semibold mb-4">Status Timeline</h3>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-success mt-2" />
                            <div className="flex-1">
                                <p className="text-sm font-medium">Currently Working</p>
                                <p className="text-xs text-muted-foreground">09:45 AM - Now</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-muted mt-2" />
                            <div className="flex-1">
                                <p className="text-sm text-muted-foreground">Arrived at Location</p>
                                <p className="text-xs text-muted-foreground">09:30 AM</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-muted mt-2" />
                            <div className="flex-1">
                                <p className="text-sm text-muted-foreground">En Route</p>
                                <p className="text-xs text-muted-foreground">09:00 AM</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-muted mt-2" />
                            <div className="flex-1">
                                <p className="text-sm text-muted-foreground">Booking Confirmed</p>
                                <p className="text-xs text-muted-foreground">08:45 AM</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </MobileLayout>
    );
};

export default Track;
