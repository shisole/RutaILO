import type { Route } from "./types";

export const routes: Route[] = [
  // Route 1: Bo. Obrero-Lapuz to City Proper Loop
  {
    id: "route-1",
    number: 1,
    name: "Bo. Obrero-Lapuz to City Proper Loop",
    color: "#3B82F6", // blue
    stopIds: [
      "bo-obrero",
      "lapuz",
      "lapuz-norte",
      "diversion-road",
      "delgado-st",
      "city-proper",
    ],
  },

  // Route 2: Villa Plaza to City Proper via Calumpang
  {
    id: "route-2",
    number: 2,
    name: "Villa Plaza to City Proper via Calumpang",
    color: "#EF4444", // red
    stopIds: [
      "villa-plaza",
      "arevalo-plaza",
      "calumpang",
      "molo-blvd",
      "baluarte",
      "gen-luna",
      "city-proper",
    ],
  },

  // Route 3: Ungka to City Proper via CPU
  {
    id: "route-3",
    number: 3,
    name: "Ungka to City Proper via CPU",
    color: "#10B981", // emerald
    stopIds: [
      "ungka",
      "ungka-junction",
      "cpu",
      "jaro-plaza",
      "jaro-bridge",
      "la-paz",
      "lopez-jaena-st",
      "city-proper",
    ],
  },

  // Route 4: Ungka to City Proper via Aquino Ave / Festive Walk
  {
    id: "route-4",
    number: 4,
    name: "Ungka to City Proper via Aquino Ave / Festive Walk",
    color: "#F59E0B", // amber
    stopIds: [
      "ungka",
      "ungka-junction",
      "festive-walk",
      "aquino-ave",
      "mandurriao-plaza",
      "diversion-road",
      "city-proper",
    ],
  },

  // Route 5: Festive Walk to City Proper via SM City
  {
    id: "route-5",
    number: 5,
    name: "Festive Walk to City Proper via SM City",
    color: "#8B5CF6", // violet
    stopIds: [
      "festive-walk",
      "megaworld-blvd",
      "sm-city",
      "mandurriao-plaza",
      "diversion-road",
      "lapuz-norte",
      "city-proper",
    ],
  },

  // Route 6: Lanit to Infante via SM City
  {
    id: "route-6",
    number: 6,
    name: "Lanit to Infante via SM City",
    color: "#EC4899", // pink
    stopIds: [
      "lanit",
      "jaro-plaza",
      "jaro-bridge",
      "sm-city",
      "mandurriao-plaza",
      "infante",
      "city-proper",
    ],
  },

  // Route 7: Compania to City Proper Loop
  {
    id: "route-7",
    number: 7,
    name: "Compania to City Proper Loop",
    color: "#14B8A6", // teal
    stopIds: [
      "compania",
      "diversion-road",
      "mandurriao-plaza",
      "lapuz-norte",
      "delgado-st",
      "city-proper",
    ],
  },

  // Route 8: Parola to SM City via Infante Loop
  {
    id: "route-8",
    number: 8,
    name: "Parola to SM City via Infante Loop",
    color: "#F97316", // orange
    stopIds: [
      "parola",
      "iloilo-terminal-market",
      "city-proper",
      "infante",
      "diversion-road",
      "sm-city",
    ],
  },

  // Route 9: Mohon to City Proper
  {
    id: "route-9",
    number: 9,
    name: "Mohon to City Proper",
    color: "#6366F1", // indigo
    stopIds: [
      "mohon",
      "arevalo-plaza",
      "villa-plaza",
      "molo-plaza",
      "molo-blvd",
      "gen-luna",
      "city-proper",
    ],
  },

  // Route 10: Buntatala/Tagbak to City Proper
  {
    id: "route-10",
    number: 10,
    name: "Buntatala/Tagbak to City Proper",
    color: "#84CC16", // lime
    stopIds: [
      "buntatala",
      "molo-plaza",
      "molo-blvd",
      "baluarte",
      "delgado-st",
      "city-proper",
    ],
  },

  // Route 11: Ticud La Paz to City Proper
  {
    id: "route-11",
    number: 11,
    name: "Ticud La Paz to City Proper",
    color: "#0EA5E9", // sky
    stopIds: [
      "ticud-la-paz",
      "la-paz-market",
      "la-paz",
      "lopez-jaena-st",
      "rizal-st",
      "city-proper",
    ],
  },

  // Route 12: Mandurriao to City Proper via Festive Walk
  {
    id: "route-12",
    number: 12,
    name: "Mandurriao to City Proper via Festive Walk",
    color: "#D946EF", // fuchsia
    stopIds: [
      "mandurriao-plaza",
      "mandurriao-business-district",
      "festive-walk",
      "megaworld-blvd",
      "diversion-road",
      "lapuz-norte",
      "city-proper",
    ],
  },

  // Route 13: Hibao-an to City Proper via Tabucan
  {
    id: "route-13",
    number: 13,
    name: "Hibao-an to City Proper via Tabucan",
    color: "#78716C", // stone
    stopIds: [
      "hibao-an",
      "tabucan",
      "mandurriao-plaza",
      "diversion-road",
      "lapuz-norte",
      "delgado-st",
      "city-proper",
    ],
  },

  // Route 14: Hibao-an to Jaro via Festive Walk
  {
    id: "route-14",
    number: 14,
    name: "Hibao-an to Jaro via Festive Walk",
    color: "#059669", // emerald-dark
    stopIds: [
      "hibao-an",
      "balabago",
      "festive-walk",
      "megaworld-blvd",
      "sm-city",
      "jaro-bridge",
      "jaro-plaza",
    ],
  },

  // Route 15: Molo to City Proper via Baluarte Loop
  {
    id: "route-15",
    number: 15,
    name: "Molo to City Proper via Baluarte Loop",
    color: "#DC2626", // red-dark
    stopIds: [
      "molo-plaza",
      "molo-blvd",
      "baluarte",
      "lapuz",
      "delgado-st",
      "valeria-st",
      "city-proper",
    ],
  },

  // Route 16: Bito-on to Jaro via Balabago Loop
  {
    id: "route-16",
    number: 16,
    name: "Bito-on to Jaro via Balabago Loop",
    color: "#7C3AED", // purple
    stopIds: [
      "bito-on",
      "balabago",
      "ungka-junction",
      "cpu",
      "jaro-liko",
      "jaro-plaza",
    ],
  },

  // Route 17: Villa Baybay to City Proper
  {
    id: "route-17",
    number: 17,
    name: "Villa Baybay to City Proper",
    color: "#0284C7", // blue-dark
    stopIds: [
      "villa-baybay",
      "arevalo-plaza",
      "mohon",
      "molo-plaza",
      "gen-luna",
      "city-proper",
    ],
  },

  // Route 18: Buntatala/Tagbak to City Proper via Lapuz
  {
    id: "route-18",
    number: 18,
    name: "Buntatala/Tagbak to City Proper via Lapuz",
    color: "#EA580C", // orange-dark
    stopIds: [
      "buntatala",
      "molo-plaza",
      "baluarte",
      "lapuz",
      "lapuz-norte",
      "city-proper",
    ],
  },

  // Route 19: Bito-on to City Proper via La Paz
  {
    id: "route-19",
    number: 19,
    name: "Bito-on to City Proper via La Paz",
    color: "#65A30D", // lime-dark
    stopIds: [
      "bito-on",
      "balabago",
      "cpu",
      "jaro-plaza",
      "la-paz-market",
      "la-paz",
      "city-proper",
    ],
  },

  // Route 20: Mohon to ISATU via Sooc / Festive Walk
  {
    id: "route-20",
    number: 20,
    name: "Mohon to ISATU via Sooc / Festive Walk",
    color: "#DB2777", // pink-dark
    stopIds: [
      "mohon",
      "sooc",
      "villa-plaza",
      "mandurriao-plaza",
      "festive-walk",
      "jaro-bridge",
      "isatu",
    ],
  },

  // Route 21: Buntatala/Tagbak to Festive Walk via SM City
  {
    id: "route-21",
    number: 21,
    name: "Buntatala/Tagbak to Festive Walk via SM City",
    color: "#4F46E5", // indigo-dark
    stopIds: [
      "buntatala",
      "molo-plaza",
      "diversion-road",
      "sm-city",
      "megaworld-blvd",
      "festive-walk",
    ],
  },

  // Route 22: Ungka to La Paz via CPU / ISATU Loop
  {
    id: "route-22",
    number: 22,
    name: "Ungka to La Paz via CPU / ISATU Loop",
    color: "#0D9488", // teal-dark
    stopIds: [
      "ungka",
      "ungka-junction",
      "cpu",
      "jaro-plaza",
      "isatu",
      "la-paz-market",
      "la-paz",
    ],
  },

  // Route 23: Mohon to Mandurriao Business District
  {
    id: "route-23",
    number: 23,
    name: "Mohon to Mandurriao Business District",
    color: "#B45309", // amber-dark
    stopIds: [
      "mohon",
      "arevalo-plaza",
      "molo-plaza",
      "molo-blvd",
      "compania",
      "diversion-road",
      "mandurriao-plaza",
      "mandurriao-business-district",
    ],
  },

  // Route 24: La Paz to Festive Walk via Nabitasan Loop
  {
    id: "route-24",
    number: 24,
    name: "La Paz to Festive Walk via Nabitasan Loop",
    color: "#E11D48", // rose
    stopIds: [
      "la-paz",
      "la-paz-market",
      "nabitasan",
      "jaro-bridge",
      "sm-city",
      "megaworld-blvd",
      "festive-walk",
    ],
  },

  // Route 25: Molo to City Proper via Gen. Luna
  {
    id: "route-25",
    number: 25,
    name: "Molo to City Proper via Gen. Luna",
    color: "#9333EA", // purple-vivid
    stopIds: [
      "molo-plaza",
      "molo-blvd",
      "gen-luna",
      "rizal-st",
      "valeria-st",
      "city-proper",
    ],
  },
];
