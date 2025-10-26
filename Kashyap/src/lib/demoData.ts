// src/lib/demoData.ts

// Define the structure for your recommendation "cards"
export interface DemoMachine {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string; // We'll use placeholder images
  icon: string; // Use string names for mapping later
}

// 1. Define your dummy machine data (Expanded)
const DUMMY_MACHINES: Record<string, DemoMachine> = {
  tractor: {
    id: "demo-1",
    name: "Tractor (50 HP)",
    description: "Multi-purpose, for medium to large fields.",
    price: 500,
    image: "/placeholder.svg",
    icon: "Tractor",
  },
  rotavator: {
    id: "demo-2",
    name: "Rotavator",
    description: "Breaks soil, good for seedbed preparation.",
    price: 350,
    image: "/placeholder.svg",
    icon: "Wheat", // Placeholder icon
  },
  seedDrill: {
    id: "demo-3",
    name: "Tractor + Seed Drill",
    description: "Efficient sowing for wheat, soyabean etc.",
    price: 600,
    image: "/placeholder.svg",
    icon: "Wheat",
  },
  harvester: {
    id: "demo-4",
    name: "Combine Harvester",
    description: "Harvests grain crops quickly.",
    price: 1000,
    image: "/placeholder.svg",
    icon: "Tractor", // Placeholder icon
  },
  sprayer: {
    id: "demo-5",
    name: "Boom Sprayer",
    description: "Wide pesticide/fertilizer spraying.",
    price: 300,
    image: "/placeholder.svg",
    icon: "Spray", // Need a 'Spray' icon name
  },
  thresher: { // NEW
    id: "demo-6",
    name: "Thresher",
    description: "Separates grain from stalks and husks.",
    price: 400,
    image: "/placeholder.svg",
    icon: "Package", // Placeholder icon
  },
  cultivator: { // NEW
    id: "demo-7",
    name: "Cultivator",
    description: "Secondary tillage, removes weeds.",
    price: 300,
    image: "/placeholder.svg",
    icon: "Tractor", // Placeholder icon
  },
  reaper: { // NEW
    id: "demo-8",
    name: "Reaper Binder",
    description: "Cuts and bundles crops like wheat, paddy.",
    price: 700,
    image: "/placeholder.svg",
    icon: "Tractor", // Placeholder icon
  },
};

// 2. Define your keyword mapping (Expanded)
const KEYWORD_MAP: Record<string, DemoMachine[]> = {
  // Ploughing / Tillage
  "जोतना": [DUMMY_MACHINES.tractor, DUMMY_MACHINES.rotavator, DUMMY_MACHINES.cultivator],
  "plough": [DUMMY_MACHINES.tractor, DUMMY_MACHINES.rotavator, DUMMY_MACHINES.cultivator],
  "tillage": [DUMMY_MACHINES.tractor, DUMMY_MACHINES.rotavator, DUMMY_MACHINES.cultivator],
  "khet jotna": [DUMMY_MACHINES.tractor, DUMMY_MACHINES.rotavator, DUMMY_MACHINES.cultivator],
  "cultivate": [DUMMY_MACHINES.tractor, DUMMY_MACHINES.cultivator], // More specific
  "मिट्टी तैयार": [DUMMY_MACHINES.tractor, DUMMY_MACHINES.rotavator, DUMMY_MACHINES.cultivator], // Soil prep
  // Sowing
  "बुआई": [DUMMY_MACHINES.seedDrill],
  "sowing": [DUMMY_MACHINES.seedDrill],
  "seed": [DUMMY_MACHINES.seedDrill],
  "बीज बोना": [DUMMY_MACHINES.seedDrill],
  "wheat sowing": [DUMMY_MACHINES.seedDrill], // Specific crop
  // Harvesting / Reaping
  "कटाई": [DUMMY_MACHINES.harvester, DUMMY_MACHINES.reaper],
  "harvest": [DUMMY_MACHINES.harvester, DUMMY_MACHINES.reaper],
  "reap": [DUMMY_MACHINES.reaper], // Reaper specific
  "fasal katna": [DUMMY_MACHINES.harvester, DUMMY_MACHINES.reaper],
  "गेहूं कटाई": [DUMMY_MACHINES.harvester, DUMMY_MACHINES.reaper], // Specific crop
  // Spraying
  "स्प्रे": [DUMMY_MACHINES.sprayer],
  "spray": [DUMMY_MACHINES.sprayer],
  "छिड़काव": [DUMMY_MACHINES.sprayer],
  "pesticide": [DUMMY_MACHINES.sprayer],
  // Threshing
  "threshing": [DUMMY_MACHINES.thresher], // NEW
  "गहाई": [DUMMY_MACHINES.thresher], // NEW
  "dana nikalna": [DUMMY_MACHINES.thresher], // NEW (extract grain)
  // Weeding (overlaps with cultivator)
  "weed removal": [DUMMY_MACHINES.cultivator], // NEW
  "खरपतवार निकालना": [DUMMY_MACHINES.cultivator], // NEW
};

// 3. Create the function that your component will call (Improved matching)
export const getDemoRecommendations = (
  query: string
): DemoMachine[] | null => {
  if (!query) return null;

  const lowerQuery = query.toLowerCase().trim();
  let bestMatch: DemoMachine[] = [];

  // Find all keywords present in the query
  const matchedKeywords = Object.keys(KEYWORD_MAP).filter(keyword =>
    lowerQuery.includes(keyword)
  );

  if (matchedKeywords.length === 0) {
    return null; // No keywords found
  }

  // Simple logic: Use the results from the longest matching keyword found
  matchedKeywords.sort((a, b) => b.length - a.length); // Sort by length desc
  bestMatch = KEYWORD_MAP[matchedKeywords[0]];


  // You could add more complex logic here later, e.g., combining results
  // For now, return the best match based on the longest keyword

  // Remove duplicates if multiple keywords point to the same machine set
  const uniqueResults = Array.from(new Set(bestMatch.map(m => m.id)))
                            .map(id => bestMatch.find(m => m.id === id)!);

  return uniqueResults.length > 0 ? uniqueResults : null;
};