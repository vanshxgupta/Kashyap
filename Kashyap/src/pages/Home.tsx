// src/pages/Home.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/Layout/MobileLayout";
import { Input } from "@/components/ui/input"; // Re-added Input
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Search, // Re-added Search
  MapPin,
  Filter,
  Star,
  Tractor,
  Package,
  Wheat,
  Mic, // Re-added Mic
  AlertCircle, // For errors
  XCircle, // For Clear button
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
import "leaflet/dist/leaflet.css";
// Leaflet icon fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// --- IMPORTS FOR RECOMMENDATION FEATURE ---
import { Loader } from "@/components/Loader"; // Ensure this path is correct
import { RecommendationList } from "@/components/RecommendationList"; // Ensure this path is correct
import { RecommendationInput } from "@/components/RecommendationInput"; // Ensure this path is correct
import { getDemoRecommendations, DemoMachine } from "@/lib/demoData"; // Ensure this path is correct
import { cn } from "@/lib/utils";

// Original machine data
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

// Check for Web Speech API (Used in both search bars now)
const SpeechRecognition =
  (window as any).SpeechRecognition ||
  (window as any).webkitSpeechRecognition;
const isSpeechApiSupported = !!SpeechRecognition;


const Home = () => {
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();
  const { t, language } = useLanguage(); // Added language back for original search bar's mic

  // --- STATE VARIABLES ---
  // State for the ORIGINAL search bar
  const [originalSearchText, setOriginalSearchText] = useState("");
  const [isOriginalListening, setIsOriginalListening] = useState(false);
  const [originalSpeechError, setOriginalSpeechError] = useState<string | null>(null);

  // State for RECOMMENDATION feature
  const [isSearchingRecommendations, setIsSearchingRecommendations] = useState(false); // Renamed for clarity
  const [recommendationError, setRecommendationError] = useState<string | null>(null); // Renamed for clarity
  const [recommendations, setRecommendations] = useState<DemoMachine[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);

  // --- FILTER LOGIC ---
  // Original machine list filtering based on dropdown AND original search bar text
  const filteredMachines = machines.filter((m) => {
      const typeMatch = filter === "all" || m.type.toLowerCase() === filter.toLowerCase();
      const searchMatch = !originalSearchText || // Show all if search is empty
                          m.name.toLowerCase().includes(originalSearchText.toLowerCase()) ||
                          m.chc.toLowerCase().includes(originalSearchText.toLowerCase());
      return typeMatch && searchMatch;
  });

  // --- HANDLER FUNCTIONS ---

  // Handler for the ORIGINAL search bar form submission (currently just prevents default)
  const handleOriginalFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement filtering logic based on originalSearchText here if needed beyond the live filtering
    console.log("Original search submitted:", originalSearchText);
  };

  // Handler for the ORIGINAL search bar's microphone
  const handleOriginalListen = () => {
    if (isOriginalListening) return;
    if (!isSpeechApiSupported) {
      setOriginalSpeechError(t("error.noSpeechApi"));
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language === "hindi" ? "hi-IN" : "en-US";
    recognition.onstart = () => {
      setIsOriginalListening(true);
      setOriginalSpeechError(null);
    };
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setOriginalSearchText(transcript); // Update the original search bar
    };
    recognition.onerror = (event) => {
      if (event.error === "no-speech") {
        setOriginalSpeechError(t("error.noSpeech"));
      } else {
        setOriginalSpeechError(typeof event.error === 'string' ? event.error : 'Speech recognition error');
      }
    };
    recognition.onend = () => {
      setIsOriginalListening(false);
    };
    recognition.start();
  };


  // Handler for the RECOMMENDATION input submission
  const handleRecommendationSearch = (query: string) => {
    setIsSearchingRecommendations(true);
    setRecommendationError(null);
    setRecommendations([]);
    setShowRecommendations(true); // Switch to recommendation view immediately

    setTimeout(() => {
      const results = getDemoRecommendations(query);
      if (results && results.length > 0) {
        setRecommendations(results);
        setRecommendationError(null);
      } else {
        setRecommendationError(t("error.noMatch"));
        setRecommendations([]);
      }
      setIsSearchingRecommendations(false);
    }, 2500);
  };

  // Handler to clear recommendations and go back to default view
  const clearRecommendations = () => {
    setShowRecommendations(false);
    setRecommendations([]);
    setRecommendationError(null);
  };

  // --- RENDER FUNCTION (JSX) ---
  return (
    <MobileLayout>
      {/* Header with ORIGINAL search bar */}
      <div className="gradient-primary p-4 pb-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-primary-foreground">
            {t("home.title")}
          </h1>
          <Button variant="ghost" size="icon" className="text-primary-foreground">
            <MapPin className="h-5 w-5" />
          </Button>
        </div>
        {/* --- ORIGINAL SEARCH BAR RESTORED --- */}
        <form onSubmit={handleOriginalFormSubmit}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder={t("home.search")} // Uses the original placeholder
              className="pl-10 pr-12 h-12 rounded-xl bg-card"
              value={originalSearchText}
              onChange={(e) => setOriginalSearchText(e.target.value)}
            />
            {isSpeechApiSupported && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleOriginalListen}
                className={cn(
                  "absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-9 w-9 text-muted-foreground hover:text-primary",
                  isOriginalListening && "text-primary animate-pulse"
                )}
                aria-label={t("home.speakLabel")} // Reuse label, might need a unique one
              >
                <Mic className="h-5 w-5" />
              </Button>
            )}
          </div>
        </form>
         {isOriginalListening && (
           <p className="text-center text-sm text-primary-foreground/90 mt-2">
             {t("home.listening")}...
           </p>
         )}
         {originalSpeechError && (
            <p className="text-xs text-destructive flex items-center gap-1 justify-center mt-1">
               <AlertCircle size={14} /> {originalSpeechError}
            </p>
          )}
        {/* --- END ORIGINAL SEARCH BAR --- */}
      </div>

      {/* --- Recommendation Input Section --- */}
      {/* Conditionally render based on whether we are showing recommendations or searching */}
      {!showRecommendations && !isSearchingRecommendations && (
        <RecommendationInput onSubmit={handleRecommendationSearch} />
      )}

      {/* --- Conditional Rendering Logic for Main Content Area --- */}
      {isSearchingRecommendations ? (
        <Loader />
      ) : showRecommendations ? ( // If we are in recommendation mode
        <>
          {recommendationError ? ( // If there's an error in recommendation mode
            <div className="p-4 text-center text-destructive flex flex-col items-center gap-2">
              <AlertCircle className="h-8 w-8" />
              <p>{recommendationError}</p>
            </div>
          ) : ( // Otherwise, show the (potentially empty) recommendations
            <RecommendationList recommendations={recommendations} />
          )}
          {/* Always show the clear button when in recommendation mode */}
          <div className="px-4 pb-4">
            <Button variant="outline" className="w-full" onClick={clearRecommendations}>
              <XCircle className="h-4 w-4 mr-2" />
              {t("home.clearRecommendations")}
            </Button>
          </div>
        </>
      ) : ( // Default view: Show Filter, Map, and List (filtered by original search)
        <>
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

          {/* Map Section */}
          <div className="mx-4 mb-4">
            <Card className="h-48 rounded-2xl overflow-hidden card-shadow relative z-10"> {/* Keep z-index fix */}
              <MapContainer
                center={[23.26, 77.414]}
                zoom={15}
                scrollWheelZoom={false}
                className="h-full w-full"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                {/* Use filteredMachines for the map */}
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
            </Card>
          </div>

          {/* Machine List */}
          <div className="px-4 space-y-3 pb-4">
            <h2 className="text-lg font-semibold">{t("home.available")}</h2>
            {/* Display message if filtering yields no results */}
            {filteredMachines.length === 0 && !originalSearchText && (
                 <p className="text-muted-foreground text-center py-4">No machines available for the selected filter.</p>
            )}
             {filteredMachines.length === 0 && originalSearchText && (
                 <p className="text-muted-foreground text-center py-4">No machines match your search "{originalSearchText}".</p>
            )}
            {/* Use filteredMachines for the list */}
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
        </>
      )}
    </MobileLayout>
  );
};

export default Home;