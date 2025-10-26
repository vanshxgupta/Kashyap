import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/Layout/MobileLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Search,
  MapPin,
  Filter,
  Star,
  Tractor,
  Package,
  Wheat,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Leaflet imports
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix default marker icon issue
import "leaflet/dist/leaflet.css";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const machines = [
  {
    id: 1,
    name: "Super Seeder Pro",
    type: "Seeder",
    chc: "Green Valley CHC",
    price: 500,
    distance: 2.3,
    rating: 4.8,
    icon: Wheat,
    status: "active",
    lat: 23.2599,
    lng: 77.4126,
  },
  {
    id: 2,
    name: "Hay Baler Max",
    type: "Baler",
    chc: "Sunrise Farms CHC",
    price: 750,
    distance: 4.1,
    rating: 4.6,
    icon: Package,
    status: "idle",
    lat: 23.2610,
    lng: 77.4140,
  },
  {
    id: 3,
    name: "Harvest King 3000",
    type: "Harvester",
    chc: "Valley View CHC",
    price: 1200,
    distance: 5.8,
    rating: 4.9,
    icon: Tractor,
    status: "maintenance",
    lat: 23.2625,
    lng: 77.4155,
  },
];

const Home = () => {
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();
  const { t } = useLanguage();

  const filteredMachines =
    filter === "all"
      ? machines
      : machines.filter((m) => m.type.toLowerCase() === filter.toLowerCase());

  return (
    <MobileLayout>
      {/* Header */}
      <div className="gradient-primary p-4 pb-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-primary-foreground">
            {t("home.title")}
          </h1>
          <Button variant="ghost" size="icon" className="text-primary-foreground">
            <MapPin className="h-5 w-5" />
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder={t("home.search")}
            className="pl-10 h-12 rounded-xl bg-card"
          />
        </div>
      </div>

      {/* Filter */}
      <div className="p-4 flex items-center gap-3">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full h-11 rounded-xl">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("home.filterAll")}</SelectItem>
            <SelectItem value="seeder">{t("home.filterSeeder")}</SelectItem>
            <SelectItem value="baler">{t("home.filterBaler")}</SelectItem>
            <SelectItem value="harvester">{t("home.filterHarvester")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Map */}
      <div className="mx-4 mb-4">
        <MapContainer
          center={[23.26, 77.414]}
          zoom={15}
          scrollWheelZoom={false}
          className="h-48 rounded-2xl w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {filteredMachines.map((m) => (
            <Marker key={m.id} position={[m.lat, m.lng]}>
              <Popup>
                <strong>{m.name}</strong>
                <br />
                {m.chc}
                <br />
                ₹{m.price}/{t("common.hr")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Machine List */}
      <div className="px-4 space-y-3 pb-4">
        <h2 className="text-lg font-semibold">{t("home.available")}</h2>
        {filteredMachines.map((machine) => {
          const Icon = machine.icon;
          return (
            <Card
              key={machine.id}
              className="p-4 rounded-2xl card-shadow hover:elevated-shadow transition-shadow cursor-pointer"
              onClick={() => navigate(`/machine/${machine.id}`)}
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold">{machine.name}</h3>
                      <p className="text-sm text-muted-foreground">{machine.chc}</p>
                    </div>
                    <Badge variant="secondary" className="shrink-0">
                      <Star className="h-3 w-3 mr-1 fill-primary text-primary" />
                      {machine.rating}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="font-semibold text-primary">
                        ₹{machine.price}/{t("common.hr")}
                      </span>
                      <span className="text-muted-foreground">
                        {machine.distance} {t("common.km")}
                      </span>
                    </div>
                    <Button size="sm" className="gradient-primary">
                      {t("home.bookNow")}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </MobileLayout>
  );
};

export default Home;
