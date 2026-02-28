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
    waypoints: [
      [10.6980, 122.5580], // Bo. Obrero
      [10.6985, 122.5565], // heading west along road
      [10.6990, 122.5555], // curving northwest
      [10.6995, 122.5545], // toward Lapuz
      [10.7005, 122.5535], // approaching Lapuz
      [10.7010, 122.5530], // Lapuz
      [10.7015, 122.5535], // turning northeast
      [10.7020, 122.5540], // along Lapuz road
      [10.7025, 122.5545], // curving
      [10.7030, 122.5550], // Lapuz Norte
      [10.7045, 122.5545], // heading toward Diversion Rd
      [10.7060, 122.5535], // along road
      [10.7075, 122.5525], // approaching Diversion Rd
      [10.7090, 122.5520], // Diversion Road
      [10.7080, 122.5530], // turning southeast on Diversion
      [10.7060, 122.5550], // along Diversion Rd
      [10.7040, 122.5570], // continuing east
      [10.7020, 122.5590], // curving toward city
      [10.7000, 122.5610], // heading to Delgado
      [10.6980, 122.5625], // approaching Delgado
      [10.6965, 122.5635], // nearing Delgado St
      [10.6955, 122.5640], // Delgado St
      [10.6960, 122.5645], // heading to City Proper
      [10.6969, 122.5648], // City Proper
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
    waypoints: [
      [10.6870, 122.5370], // Villa Plaza
      [10.6865, 122.5380], // heading east
      [10.6868, 122.5395], // curving along road
      [10.6870, 122.5410], // approaching Arevalo
      [10.6870, 122.5420], // Arevalo Plaza
      [10.6878, 122.5435], // heading northeast
      [10.6885, 122.5455], // along road
      [10.6895, 122.5475], // curving north
      [10.6905, 122.5495], // toward Calumpang
      [10.6915, 122.5510], // approaching Calumpang
      [10.6920, 122.5520], // Calumpang
      [10.6925, 122.5470], // turning west toward Molo Blvd
      [10.6930, 122.5470], // Molo Blvd
      [10.6935, 122.5475], // heading north
      [10.6940, 122.5480], // along boulevard
      [10.6950, 122.5485], // curving northeast
      [10.6960, 122.5490], // Baluarte
      [10.6960, 122.5510], // heading east
      [10.6960, 122.5530], // along road
      [10.6960, 122.5550], // curving toward Gen. Luna
      [10.6960, 122.5570], // approaching Gen. Luna
      [10.6960, 122.5590], // near Gen. Luna
      [10.6960, 122.5600], // Gen. Luna St
      [10.6962, 122.5615], // heading east
      [10.6965, 122.5630], // approaching City Proper
      [10.6969, 122.5648], // City Proper
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
    waypoints: [
      [10.7300, 122.5500], // Ungka
      [10.7295, 122.5505], // heading southeast
      [10.7290, 122.5510], // along road
      [10.7285, 122.5515], // curving
      [10.7280, 122.5520], // Ungka Junction
      [10.7270, 122.5540], // heading southeast toward CPU
      [10.7265, 122.5560], // along Lopez Jaena North
      [10.7258, 122.5580], // approaching CPU
      [10.7252, 122.5600], // nearing CPU
      [10.7250, 122.5620], // CPU
      [10.7240, 122.5635], // heading south from CPU
      [10.7230, 122.5650], // toward Jaro
      [10.7220, 122.5665], // curving
      [10.7210, 122.5685], // approaching Jaro Plaza
      [10.7200, 122.5700], // Jaro Plaza
      [10.7190, 122.5695], // heading south
      [10.7175, 122.5685], // along Jaro road
      [10.7160, 122.5675], // approaching Jaro Bridge
      [10.7150, 122.5670], // Jaro Bridge
      [10.7130, 122.5665], // heading south
      [10.7110, 122.5660], // approaching La Paz
      [10.7090, 122.5660], // La Paz
      [10.7075, 122.5645], // heading southwest
      [10.7060, 122.5625], // curving toward Lopez Jaena
      [10.7050, 122.5610], // Lopez Jaena St
      [10.7030, 122.5615], // heading south
      [10.7010, 122.5625], // along road
      [10.6990, 122.5635], // curving toward City Proper
      [10.6980, 122.5645], // approaching City Proper
      [10.6969, 122.5648], // City Proper
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
    waypoints: [
      [10.7300, 122.5500], // Ungka
      [10.7295, 122.5505], // heading south
      [10.7290, 122.5510], // along road
      [10.7280, 122.5520], // Ungka Junction
      [10.7265, 122.5515], // heading south
      [10.7250, 122.5510], // curving toward Festive Walk
      [10.7235, 122.5510], // along Benigno Aquino
      [10.7220, 122.5510], // approaching Festive Walk
      [10.7200, 122.5510], // Festive Walk
      [10.7190, 122.5515], // heading south on Aquino Ave
      [10.7175, 122.5520], // along avenue
      [10.7165, 122.5525], // curving
      [10.7150, 122.5530], // Aquino Ave
      [10.7135, 122.5525], // heading south
      [10.7120, 122.5515], // approaching Mandurriao
      [10.7110, 122.5505], // nearing Mandurriao
      [10.7100, 122.5500], // Mandurriao Plaza
      [10.7095, 122.5510], // heading east toward Diversion
      [10.7090, 122.5520], // Diversion Road
      [10.7080, 122.5535], // heading southeast on Diversion
      [10.7060, 122.5555], // along Diversion Rd
      [10.7040, 122.5575], // curving east
      [10.7020, 122.5595], // continuing
      [10.7000, 122.5615], // heading to City Proper
      [10.6985, 122.5630], // approaching downtown
      [10.6975, 122.5640], // nearing City Proper
      [10.6969, 122.5648], // City Proper
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
    waypoints: [
      [10.7200, 122.5510], // Festive Walk
      [10.7195, 122.5505], // heading south
      [10.7192, 122.5498], // along Megaworld Blvd
      [10.7190, 122.5490], // Megaworld Blvd
      [10.7180, 122.5495], // curving south
      [10.7168, 122.5510], // heading toward SM
      [10.7155, 122.5525], // approaching SM area
      [10.7145, 122.5540], // nearing SM
      [10.7135, 122.5555], // close to SM
      [10.7130, 122.5560], // SM City
      [10.7120, 122.5550], // heading south
      [10.7115, 122.5535], // curving southwest
      [10.7110, 122.5520], // approaching Mandurriao
      [10.7100, 122.5500], // Mandurriao Plaza
      [10.7095, 122.5510], // heading to Diversion
      [10.7090, 122.5520], // Diversion Road
      [10.7075, 122.5530], // along Diversion south
      [10.7060, 122.5540], // curving southeast
      [10.7045, 122.5548], // approaching Lapuz Norte
      [10.7030, 122.5550], // Lapuz Norte
      [10.7015, 122.5560], // heading southeast
      [10.7005, 122.5575], // along road
      [10.6995, 122.5595], // curving toward downtown
      [10.6985, 122.5615], // approaching City Proper
      [10.6978, 122.5630], // nearing downtown
      [10.6972, 122.5642], // close to City Proper
      [10.6969, 122.5648], // City Proper
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
    waypoints: [
      [10.7300, 122.5700], // Lanit
      [10.7280, 122.5700], // heading south
      [10.7260, 122.5700], // along road
      [10.7240, 122.5700], // approaching Jaro
      [10.7220, 122.5700], // nearing Jaro Plaza
      [10.7200, 122.5700], // Jaro Plaza
      [10.7190, 122.5695], // heading southwest
      [10.7175, 122.5685], // along road
      [10.7160, 122.5675], // curving toward bridge
      [10.7150, 122.5670], // Jaro Bridge
      [10.7145, 122.5660], // heading west
      [10.7140, 122.5640], // curving southwest
      [10.7138, 122.5620], // along road to SM
      [10.7135, 122.5600], // approaching SM area
      [10.7132, 122.5580], // nearing SM
      [10.7130, 122.5560], // SM City
      [10.7120, 122.5545], // heading south
      [10.7110, 122.5530], // curving
      [10.7105, 122.5515], // approaching Mandurriao
      [10.7100, 122.5500], // Mandurriao Plaza
      [10.7080, 122.5520], // heading southeast
      [10.7050, 122.5555], // along road
      [10.7020, 122.5590], // curving east
      [10.7000, 122.5610], // approaching Infante
      [10.6990, 122.5620], // Infante
      [10.6985, 122.5630], // heading to City Proper
      [10.6978, 122.5640], // nearing downtown
      [10.6969, 122.5648], // City Proper
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
    waypoints: [
      [10.7080, 122.5480], // Compania
      [10.7085, 122.5490], // heading east
      [10.7088, 122.5500], // along road toward Diversion
      [10.7090, 122.5510], // approaching Diversion
      [10.7090, 122.5520], // Diversion Road
      [10.7095, 122.5510], // turning south
      [10.7100, 122.5500], // Mandurriao Plaza
      [10.7090, 122.5515], // heading back east
      [10.7075, 122.5530], // along Diversion south
      [10.7060, 122.5540], // curving southeast
      [10.7045, 122.5548], // toward Lapuz Norte
      [10.7030, 122.5550], // Lapuz Norte
      [10.7015, 122.5560], // heading southeast
      [10.7000, 122.5580], // along road
      [10.6990, 122.5600], // curving east
      [10.6980, 122.5615], // approaching Delgado
      [10.6970, 122.5630], // nearing Delgado
      [10.6960, 122.5638], // close to Delgado
      [10.6955, 122.5640], // Delgado St
      [10.6960, 122.5645], // heading to City Proper
      [10.6969, 122.5648], // City Proper
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
    waypoints: [
      [10.6940, 122.5690], // Parola
      [10.6942, 122.5685], // heading west
      [10.6945, 122.5680], // along waterfront
      [10.6948, 122.5675], // curving
      [10.6950, 122.5670], // Iloilo Terminal Market
      [10.6955, 122.5665], // heading west
      [10.6960, 122.5658], // along road
      [10.6965, 122.5652], // approaching City Proper
      [10.6969, 122.5648], // City Proper
      [10.6975, 122.5640], // heading northwest
      [10.6980, 122.5635], // along road
      [10.6985, 122.5628], // curving
      [10.6990, 122.5620], // Infante
      [10.7005, 122.5600], // heading northwest
      [10.7020, 122.5580], // along road
      [10.7040, 122.5565], // curving toward Diversion
      [10.7060, 122.5550], // approaching Diversion
      [10.7075, 122.5535], // nearing Diversion
      [10.7090, 122.5520], // Diversion Road
      [10.7100, 122.5530], // heading north
      [10.7110, 122.5540], // along road to SM
      [10.7118, 122.5550], // approaching SM
      [10.7125, 122.5555], // nearing SM
      [10.7130, 122.5560], // SM City
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
    waypoints: [
      [10.6880, 122.5410], // Mohon
      [10.6878, 122.5415], // heading east
      [10.6875, 122.5418], // along road
      [10.6870, 122.5420], // Arevalo Plaza
      [10.6868, 122.5400], // heading south
      [10.6870, 122.5385], // curving toward Villa
      [10.6870, 122.5370], // Villa Plaza
      [10.6878, 122.5380], // heading northeast
      [10.6888, 122.5395], // along road
      [10.6900, 122.5410], // curving north
      [10.6915, 122.5425], // approaching Molo
      [10.6930, 122.5435], // nearing Molo Plaza
      [10.6940, 122.5445], // close to Molo
      [10.6950, 122.5450], // Molo Plaza
      [10.6945, 122.5460], // heading east along Molo Blvd
      [10.6935, 122.5468], // curving
      [10.6930, 122.5470], // Molo Blvd
      [10.6940, 122.5485], // heading northeast
      [10.6950, 122.5510], // along road
      [10.6955, 122.5540], // curving east
      [10.6958, 122.5565], // approaching Gen. Luna
      [10.6960, 122.5580], // nearing Gen. Luna
      [10.6960, 122.5600], // Gen. Luna St
      [10.6962, 122.5615], // heading east
      [10.6965, 122.5630], // approaching City Proper
      [10.6969, 122.5648], // City Proper
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
    waypoints: [
      [10.6850, 122.5560], // Buntatala
      [10.6860, 122.5550], // heading northwest
      [10.6870, 122.5540], // along road
      [10.6880, 122.5525], // curving west
      [10.6890, 122.5510], // toward Molo
      [10.6905, 122.5495], // along road
      [10.6920, 122.5480], // approaching Molo area
      [10.6935, 122.5465], // nearing Molo Plaza
      [10.6945, 122.5455], // close to Molo
      [10.6950, 122.5450], // Molo Plaza
      [10.6945, 122.5460], // heading along Molo Blvd
      [10.6935, 122.5468], // curving
      [10.6930, 122.5470], // Molo Blvd
      [10.6940, 122.5478], // heading northeast
      [10.6950, 122.5485], // along road
      [10.6960, 122.5490], // Baluarte
      [10.6960, 122.5510], // heading east
      [10.6960, 122.5540], // along road
      [10.6960, 122.5570], // curving east
      [10.6958, 122.5600], // approaching downtown
      [10.6957, 122.5620], // nearing Delgado
      [10.6955, 122.5640], // Delgado St
      [10.6960, 122.5645], // heading to City Proper
      [10.6969, 122.5648], // City Proper
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
    waypoints: [
      [10.7140, 122.5690], // Ticud La Paz
      [10.7138, 122.5680], // heading southwest
      [10.7135, 122.5670], // along road
      [10.7132, 122.5660], // curving
      [10.7130, 122.5650], // La Paz Market
      [10.7120, 122.5655], // heading south
      [10.7110, 122.5658], // along Rizal St area
      [10.7100, 122.5660], // approaching La Paz
      [10.7090, 122.5660], // La Paz
      [10.7080, 122.5650], // heading southwest
      [10.7070, 122.5640], // curving
      [10.7060, 122.5625], // toward Lopez Jaena
      [10.7050, 122.5610], // Lopez Jaena St
      [10.7035, 122.5620], // heading south
      [10.7020, 122.5630], // along road
      [10.7005, 122.5640], // curving
      [10.6990, 122.5650], // approaching Rizal St
      [10.6980, 122.5658], // nearing Rizal
      [10.6975, 122.5660], // Rizal St
      [10.6972, 122.5655], // heading south to City Proper
      [10.6969, 122.5648], // City Proper
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
    waypoints: [
      [10.7100, 122.5500], // Mandurriao Plaza
      [10.7105, 122.5490], // heading northwest
      [10.7108, 122.5480], // curving
      [10.7110, 122.5470], // Mandurriao Business District
      [10.7120, 122.5475], // heading north
      [10.7135, 122.5480], // along Aquino Ave
      [10.7150, 122.5485], // curving north
      [10.7165, 122.5490], // approaching Megaworld
      [10.7180, 122.5495], // nearing Festive Walk
      [10.7190, 122.5505], // close to Festive Walk
      [10.7200, 122.5510], // Festive Walk
      [10.7195, 122.5505], // heading south
      [10.7190, 122.5495], // along Megaworld Blvd
      [10.7190, 122.5490], // Megaworld Blvd
      [10.7175, 122.5495], // heading southeast
      [10.7155, 122.5505], // curving toward Diversion
      [10.7130, 122.5515], // along road
      [10.7110, 122.5518], // approaching Diversion
      [10.7090, 122.5520], // Diversion Road
      [10.7075, 122.5530], // heading southeast
      [10.7060, 122.5540], // along Diversion
      [10.7045, 122.5548], // curving
      [10.7030, 122.5550], // Lapuz Norte
      [10.7015, 122.5560], // heading southeast
      [10.7000, 122.5580], // along road
      [10.6985, 122.5610], // curving east
      [10.6975, 122.5635], // approaching downtown
      [10.6969, 122.5648], // City Proper
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
    waypoints: [
      [10.7170, 122.5440], // Hibao-an
      [10.7160, 122.5445], // heading south
      [10.7145, 122.5450], // along road
      [10.7130, 122.5455], // curving southeast
      [10.7115, 122.5460], // approaching Tabucan
      [10.7100, 122.5465], // nearing Tabucan
      [10.7080, 122.5472], // close to Tabucan
      [10.7050, 122.5480], // Tabucan
      [10.7060, 122.5485], // heading east
      [10.7075, 122.5490], // along road
      [10.7090, 122.5495], // curving toward Mandurriao
      [10.7100, 122.5500], // Mandurriao Plaza
      [10.7095, 122.5510], // heading to Diversion
      [10.7090, 122.5520], // Diversion Road
      [10.7075, 122.5530], // heading southeast
      [10.7060, 122.5540], // along Diversion
      [10.7045, 122.5548], // curving
      [10.7030, 122.5550], // Lapuz Norte
      [10.7015, 122.5565], // heading southeast
      [10.7000, 122.5585], // along road
      [10.6985, 122.5605], // curving east
      [10.6970, 122.5625], // approaching Delgado
      [10.6960, 122.5635], // nearing Delgado
      [10.6955, 122.5640], // Delgado St
      [10.6960, 122.5645], // heading to City Proper
      [10.6969, 122.5648], // City Proper
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
    waypoints: [
      [10.7170, 122.5440], // Hibao-an
      [10.7180, 122.5450], // heading northeast
      [10.7190, 122.5455], // along road
      [10.7200, 122.5460], // curving east
      [10.7215, 122.5470], // approaching Balabago
      [10.7225, 122.5475], // nearing Balabago
      [10.7230, 122.5480], // Balabago
      [10.7225, 122.5490], // heading south
      [10.7220, 122.5500], // curving toward Festive Walk
      [10.7210, 122.5505], // approaching Festive Walk
      [10.7200, 122.5510], // Festive Walk
      [10.7195, 122.5505], // heading south
      [10.7192, 122.5498], // along Megaworld Blvd
      [10.7190, 122.5490], // Megaworld Blvd
      [10.7175, 122.5505], // heading southeast
      [10.7160, 122.5520], // along road
      [10.7148, 122.5538], // curving east
      [10.7140, 122.5550], // approaching SM
      [10.7130, 122.5560], // SM City
      [10.7135, 122.5575], // heading northeast
      [10.7140, 122.5600], // along road
      [10.7142, 122.5625], // curving north
      [10.7145, 122.5650], // approaching Jaro Bridge
      [10.7148, 122.5660], // nearing bridge
      [10.7150, 122.5670], // Jaro Bridge
      [10.7160, 122.5678], // heading north
      [10.7175, 122.5688], // along road
      [10.7190, 122.5695], // approaching Jaro Plaza
      [10.7200, 122.5700], // Jaro Plaza
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
    waypoints: [
      [10.6950, 122.5450], // Molo Plaza
      [10.6945, 122.5460], // heading east along Molo Blvd
      [10.6938, 122.5465], // curving
      [10.6930, 122.5470], // Molo Blvd
      [10.6938, 122.5478], // heading northeast
      [10.6945, 122.5483], // along road
      [10.6955, 122.5488], // curving
      [10.6960, 122.5490], // Baluarte
      [10.6970, 122.5500], // heading northeast
      [10.6980, 122.5510], // along road
      [10.6990, 122.5518], // curving north
      [10.7000, 122.5525], // approaching Lapuz
      [10.7010, 122.5530], // Lapuz
      [10.7005, 122.5545], // heading east
      [10.7000, 122.5560], // along road
      [10.6995, 122.5575], // curving southeast
      [10.6985, 122.5595], // heading toward downtown
      [10.6975, 122.5615], // approaching Delgado
      [10.6965, 122.5630], // nearing Delgado
      [10.6955, 122.5640], // Delgado St
      [10.6958, 122.5638], // heading south slightly
      [10.6962, 122.5636], // curving toward Valeria
      [10.6965, 122.5635], // Valeria St
      [10.6967, 122.5640], // heading to City Proper
      [10.6969, 122.5648], // City Proper
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
    waypoints: [
      [10.7270, 122.5450], // Bito-on
      [10.7265, 122.5455], // heading south
      [10.7260, 122.5460], // along road
      [10.7250, 122.5468], // curving southeast
      [10.7240, 122.5475], // approaching Balabago
      [10.7230, 122.5480], // Balabago
      [10.7240, 122.5490], // heading northeast
      [10.7250, 122.5498], // along road
      [10.7260, 122.5505], // curving east
      [10.7270, 122.5512], // approaching Ungka Junction
      [10.7280, 122.5520], // Ungka Junction
      [10.7275, 122.5535], // heading southeast
      [10.7268, 122.5555], // along road toward CPU
      [10.7260, 122.5575], // curving
      [10.7255, 122.5595], // approaching CPU
      [10.7252, 122.5610], // nearing CPU
      [10.7250, 122.5620], // CPU
      [10.7240, 122.5635], // heading south
      [10.7225, 122.5650], // along road
      [10.7210, 122.5660], // curving
      [10.7195, 122.5672], // approaching Jaro Liko
      [10.7185, 122.5678], // nearing Jaro Liko
      [10.7180, 122.5680], // Jaro Liko
      [10.7190, 122.5688], // heading east
      [10.7195, 122.5695], // approaching Jaro Plaza
      [10.7200, 122.5700], // Jaro Plaza
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
    waypoints: [
      [10.6860, 122.5440], // Villa Baybay
      [10.6862, 122.5435], // heading north
      [10.6865, 122.5428], // along road
      [10.6868, 122.5425], // curving
      [10.6870, 122.5420], // Arevalo Plaza
      [10.6875, 122.5415], // heading north
      [10.6878, 122.5412], // curving
      [10.6880, 122.5410], // Mohon
      [10.6890, 122.5415], // heading northeast
      [10.6900, 122.5422], // along road
      [10.6915, 122.5430], // curving north
      [10.6930, 122.5438], // approaching Molo
      [10.6940, 122.5445], // nearing Molo Plaza
      [10.6950, 122.5450], // Molo Plaza
      [10.6955, 122.5465], // heading east
      [10.6958, 122.5490], // along Gen. Luna direction
      [10.6960, 122.5520], // curving east
      [10.6960, 122.5550], // along road
      [10.6960, 122.5575], // approaching Gen. Luna
      [10.6960, 122.5600], // Gen. Luna St
      [10.6962, 122.5615], // heading east
      [10.6965, 122.5630], // approaching City Proper
      [10.6969, 122.5648], // City Proper
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
    waypoints: [
      [10.6850, 122.5560], // Buntatala
      [10.6860, 122.5548], // heading northwest
      [10.6870, 122.5535], // along road
      [10.6885, 122.5518], // curving west
      [10.6900, 122.5500], // heading toward Molo
      [10.6920, 122.5480], // along road
      [10.6935, 122.5465], // approaching Molo Plaza
      [10.6945, 122.5455], // nearing Molo
      [10.6950, 122.5450], // Molo Plaza
      [10.6955, 122.5465], // heading east
      [10.6958, 122.5478], // curving northeast
      [10.6960, 122.5490], // Baluarte
      [10.6970, 122.5500], // heading northeast
      [10.6980, 122.5510], // along road
      [10.6990, 122.5518], // curving north
      [10.7000, 122.5525], // approaching Lapuz
      [10.7010, 122.5530], // Lapuz
      [10.7018, 122.5538], // heading northeast
      [10.7025, 122.5545], // along road
      [10.7030, 122.5550], // Lapuz Norte
      [10.7025, 122.5565], // heading southeast
      [10.7015, 122.5580], // along road
      [10.7000, 122.5600], // curving east
      [10.6985, 122.5620], // approaching downtown
      [10.6975, 122.5635], // nearing City Proper
      [10.6969, 122.5648], // City Proper
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
    waypoints: [
      [10.7270, 122.5450], // Bito-on
      [10.7265, 122.5455], // heading south
      [10.7258, 122.5462], // along road
      [10.7248, 122.5470], // curving southeast
      [10.7238, 122.5478], // approaching Balabago
      [10.7230, 122.5480], // Balabago
      [10.7238, 122.5500], // heading east
      [10.7245, 122.5530], // along road
      [10.7250, 122.5560], // curving east toward CPU
      [10.7252, 122.5590], // approaching CPU
      [10.7250, 122.5610], // nearing CPU
      [10.7250, 122.5620], // CPU
      [10.7240, 122.5640], // heading south
      [10.7230, 122.5660], // along road
      [10.7218, 122.5680], // curving toward Jaro
      [10.7210, 122.5690], // approaching Jaro Plaza
      [10.7200, 122.5700], // Jaro Plaza
      [10.7185, 122.5695], // heading south
      [10.7170, 122.5685], // along road
      [10.7155, 122.5672], // curving
      [10.7140, 122.5660], // approaching La Paz Market
      [10.7130, 122.5650], // La Paz Market
      [10.7120, 122.5655], // heading south
      [10.7105, 122.5658], // along road
      [10.7090, 122.5660], // La Paz
      [10.7070, 122.5660], // heading south
      [10.7050, 122.5658], // along road
      [10.7030, 122.5655], // curving southeast
      [10.7010, 122.5650], // approaching City Proper
      [10.6990, 122.5648], // nearing downtown
      [10.6969, 122.5648], // City Proper
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
    waypoints: [
      [10.6880, 122.5410], // Mohon
      [10.6885, 122.5400], // heading south
      [10.6892, 122.5392], // curving
      [10.6898, 122.5385], // toward Sooc
      [10.6900, 122.5380], // Sooc
      [10.6895, 122.5378], // heading west
      [10.6885, 122.5375], // curving
      [10.6875, 122.5372], // approaching Villa Plaza
      [10.6870, 122.5370], // Villa Plaza
      [10.6880, 122.5390], // heading northeast
      [10.6895, 122.5415], // along road
      [10.6915, 122.5435], // curving north
      [10.6940, 122.5455], // heading north
      [10.6960, 122.5470], // along road
      [10.6980, 122.5480], // approaching Mandurriao
      [10.7000, 122.5490], // nearing Mandurriao
      [10.7050, 122.5495], // along road
      [10.7100, 122.5500], // Mandurriao Plaza
      [10.7120, 122.5500], // heading north
      [10.7145, 122.5500], // along Aquino Ave
      [10.7170, 122.5505], // curving
      [10.7185, 122.5508], // approaching Festive Walk
      [10.7200, 122.5510], // Festive Walk
      [10.7195, 122.5530], // heading east
      [10.7185, 122.5555], // along road
      [10.7170, 122.5580], // curving southeast
      [10.7160, 122.5610], // approaching bridge area
      [10.7155, 122.5640], // nearing Jaro Bridge
      [10.7150, 122.5670], // Jaro Bridge
      [10.7160, 122.5665], // heading northeast
      [10.7170, 122.5660], // curving toward ISATU
      [10.7180, 122.5650], // ISATU
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
    waypoints: [
      [10.6850, 122.5560], // Buntatala
      [10.6860, 122.5548], // heading northwest
      [10.6875, 122.5530], // along road
      [10.6890, 122.5510], // curving west
      [10.6910, 122.5490], // heading toward Molo
      [10.6925, 122.5470], // along road
      [10.6938, 122.5458], // approaching Molo Plaza
      [10.6950, 122.5450], // Molo Plaza
      [10.6960, 122.5465], // heading northeast
      [10.6975, 122.5480], // along road toward Diversion
      [10.6990, 122.5490], // curving north
      [10.7010, 122.5500], // approaching Diversion
      [10.7040, 122.5510], // along Diversion
      [10.7065, 122.5515], // curving north
      [10.7090, 122.5520], // Diversion Road
      [10.7100, 122.5530], // heading north
      [10.7110, 122.5540], // along road to SM
      [10.7120, 122.5550], // approaching SM
      [10.7130, 122.5560], // SM City
      [10.7140, 122.5555], // heading northwest
      [10.7155, 122.5540], // along road
      [10.7170, 122.5520], // curving
      [10.7180, 122.5505], // approaching Megaworld
      [10.7188, 122.5495], // nearing Megaworld Blvd
      [10.7190, 122.5490], // Megaworld Blvd
      [10.7195, 122.5498], // heading to Festive Walk
      [10.7200, 122.5510], // Festive Walk
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
    waypoints: [
      [10.7300, 122.5500], // Ungka
      [10.7295, 122.5505], // heading southeast
      [10.7290, 122.5510], // along road
      [10.7280, 122.5520], // Ungka Junction
      [10.7275, 122.5540], // heading southeast toward CPU
      [10.7268, 122.5560], // along road
      [10.7260, 122.5580], // curving
      [10.7255, 122.5600], // approaching CPU
      [10.7250, 122.5620], // CPU
      [10.7240, 122.5640], // heading south
      [10.7228, 122.5660], // along road
      [10.7215, 122.5680], // curving toward Jaro
      [10.7208, 122.5692], // approaching Jaro Plaza
      [10.7200, 122.5700], // Jaro Plaza
      [10.7195, 122.5695], // heading south
      [10.7190, 122.5685], // along road
      [10.7185, 122.5670], // curving
      [10.7182, 122.5658], // approaching ISATU
      [10.7180, 122.5650], // ISATU
      [10.7170, 122.5650], // heading south
      [10.7158, 122.5648], // along road
      [10.7145, 122.5650], // curving toward La Paz Market
      [10.7130, 122.5650], // La Paz Market
      [10.7120, 122.5655], // heading south
      [10.7108, 122.5658], // along road
      [10.7090, 122.5660], // La Paz
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
    waypoints: [
      [10.6880, 122.5410], // Mohon
      [10.6878, 122.5415], // heading east
      [10.6873, 122.5418], // curving
      [10.6870, 122.5420], // Arevalo Plaza
      [10.6880, 122.5425], // heading northeast
      [10.6895, 122.5432], // along road
      [10.6910, 122.5438], // curving north
      [10.6925, 122.5443], // approaching Molo
      [10.6940, 122.5448], // nearing Molo Plaza
      [10.6950, 122.5450], // Molo Plaza
      [10.6945, 122.5460], // heading east
      [10.6938, 122.5465], // along Molo Blvd
      [10.6930, 122.5470], // Molo Blvd
      [10.6945, 122.5475], // heading northeast
      [10.6960, 122.5478], // along road
      [10.6980, 122.5480], // curving north
      [10.7000, 122.5480], // approaching Compania
      [10.7040, 122.5480], // along road
      [10.7060, 122.5480], // nearing Compania
      [10.7080, 122.5480], // Compania
      [10.7085, 122.5490], // heading east
      [10.7088, 122.5505], // curving toward Diversion
      [10.7090, 122.5520], // Diversion Road
      [10.7095, 122.5510], // heading south
      [10.7100, 122.5500], // Mandurriao Plaza
      [10.7105, 122.5490], // heading west
      [10.7108, 122.5480], // curving
      [10.7110, 122.5470], // Mandurriao Business District
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
    waypoints: [
      [10.7090, 122.5660], // La Paz
      [10.7100, 122.5658], // heading north
      [10.7110, 122.5655], // along road
      [10.7120, 122.5652], // curving
      [10.7130, 122.5650], // La Paz Market
      [10.7132, 122.5640], // heading west
      [10.7130, 122.5630], // curving toward Nabitasan
      [10.7130, 122.5620], // Nabitasan
      [10.7135, 122.5630], // heading north
      [10.7140, 122.5645], // along road
      [10.7143, 122.5655], // curving toward bridge
      [10.7148, 122.5662], // approaching Jaro Bridge
      [10.7150, 122.5670], // Jaro Bridge
      [10.7148, 122.5660], // heading west
      [10.7145, 122.5645], // along road
      [10.7142, 122.5625], // curving southwest
      [10.7140, 122.5605], // heading toward SM
      [10.7138, 122.5585], // along road
      [10.7135, 122.5575], // approaching SM
      [10.7130, 122.5560], // SM City
      [10.7140, 122.5555], // heading northwest
      [10.7150, 122.5545], // along road
      [10.7165, 122.5525], // curving
      [10.7178, 122.5510], // approaching Megaworld
      [10.7185, 122.5498], // nearing Megaworld Blvd
      [10.7190, 122.5490], // Megaworld Blvd
      [10.7195, 122.5498], // heading to Festive Walk
      [10.7200, 122.5510], // Festive Walk
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
    waypoints: [
      [10.6950, 122.5450], // Molo Plaza
      [10.6945, 122.5458], // heading east
      [10.6940, 122.5463], // along Molo Blvd
      [10.6935, 122.5467], // curving
      [10.6930, 122.5470], // Molo Blvd
      [10.6935, 122.5480], // heading northeast
      [10.6940, 122.5495], // along road
      [10.6945, 122.5515], // curving east
      [10.6950, 122.5535], // along Gen. Luna direction
      [10.6955, 122.5555], // heading east
      [10.6958, 122.5575], // approaching Gen. Luna
      [10.6960, 122.5590], // nearing Gen. Luna
      [10.6960, 122.5600], // Gen. Luna St
      [10.6962, 122.5615], // heading east
      [10.6965, 122.5628], // along road
      [10.6968, 122.5640], // curving
      [10.6970, 122.5648], // approaching Rizal area
      [10.6975, 122.5655], // nearing Rizal St
      [10.6975, 122.5660], // Rizal St
      [10.6972, 122.5655], // heading south
      [10.6970, 122.5648], // curving
      [10.6968, 122.5640], // toward Valeria
      [10.6965, 122.5635], // Valeria St
      [10.6967, 122.5640], // heading to City Proper
      [10.6969, 122.5648], // City Proper
    ],
  },
];
