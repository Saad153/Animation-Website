import { useParams, useNavigate, Link } from "react-router";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { useState, useRef } from "react";
import { projects } from "../data/projects";
import { ArrowLeft, ArrowRight, ArrowDown } from "lucide-react";

// ─── Fonts ───────────────────────────────────────────────────────────────────
const SANS  = "'DM Sans', 'Inter', sans-serif";
const SERIF = "'Cormorant Garamond', 'Playfair Display', Georgia, serif";

// ─── Static supplementary images ─────────────────────────────────────────────
const STATIC = {
  floorplan: "https://images.unsplash.com/photo-1762146828422-50a8bd416d3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwZmxvb3IlMjBwbGFuJTIwYmx1ZXByaW50JTIwdGVjaG5pY2FsJTIwZHJhd2luZ3xlbnwxfHx8fDE3NzUxNjI4OTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
};

// ─── Per-project data ─────────────────────────────────────────────────────────
const SUBTITLES: Record<string, string> = {
  "jinnah-askari-ii":    "Four Towers, One Identity",
  "pearl-towers":        "Six Towers, One Community",
  "dha4-islamabad":      "Oval Forms on the Cliff Edge",
  "askari-block-130":    "Every Home, Its Own Geometry",
  "dha-enclave-highrise":"Sea, Sky & Commerce",
  "askari-block-18a":    "Angular Luxury, Park Views",
  "askari-block-7-11":   "Twin Towers, Triangular Site",
  "askari-block-10-12":  "Majestic Twin Towers, Lahore's Heart",
  "embassy-gardens":     "A Facade That Set the Standard",
  "malir-jinnah-boulevard": "Eight Towers, One Neighbourhood",
  "cyber-command-ahq":      "Two Structures, One Identity",
  "gravity-tower-1":        "Glass, Sky & the Sea",
  "paf-chalet-resort":      "Mountain Living, Prefabricated Precision",
  "paf-vfom-52-suites":     "52 Suites, One European Soul",
  "challet": "Challet",
};

// const QUOTES: Record<string, { text: string; author: string; role: string }> = {
  // "jinnah-askari-ii": {
  //   text: "A constrained site is not a limitation — it is an invitation to innovate. The narrow plot forced us to think vertically, and in doing so we discovered a richer spatial typology.",
  //   author: "Design Director",
  //   role: "Gravity Studio",
  // },
  // "pearl-towers": {
  //   text: "A gate is not merely a threshold — it is a statement of intent. The winged steel form at Pearl Towers announces, before a single apartment is seen, that what lies beyond is extraordinary.",
  //   author: "Design Director",
  //   role: "Gravity Studio",
  // },
  // "dha4-islamabad": {
  //   text: "The cliff does not resist the building — it demands that the building respond. Every curve of these towers is a reply to the valley, an acknowledgement that the landscape was here first.",
  //   author: "Design Director",
  //   role: "Gravity Studio",
  // },
  // "askari-block-130": {
  //   text: "An irregular plot is an honest plot. Rather than forcing a standard layout onto a non-standard site, we let the land dictate the plan — and discovered that every home became extraordinary as a result.",
  //   author: "Design Director",
  //   role: "Gravity Studio",
  // },
  // "dha-enclave-highrise": {
  //   text: "To build on the sea's edge is to accept that the horizon is the most important element of every room. Every decision in this project — from tower placement to facade angle — was made in service of that view.",
  //   author: "Design Director",
  //   role: "Gravity Studio",
  // },
  // "askari-block-18a": {
  //   text: "The park was not a backdrop — it was a collaborator. Every angle of this tower was drawn in conversation with the green expanse of Askari Park, so that nature enters every apartment as an equal resident.",
  //   author: "Design Director",
  //   role: "Gravity Studio",
  // },
  // "askari-block-7-11": {
  //   text: "A triangle is the most structurally honest shape in geometry. We took that honesty and made it the building's identity — two towers that are direct, confident, and unapologetically of their site.",
  //   author: "Design Director",
  //   role: "Gravity Studio",
  // },
  // "askari-block-10-12": {
  //   text: "Amenity is not an afterthought — it is architecture. At Askari 11, the swimming pool, the gym, and the lounge are not tucked away; they are celebrated as part of the building's identity, as much a facade element as glass and steel.",
  //   author: "Design Director",
  //   role: "Gravity Studio",
  // },
  // "embassy-gardens": {
  //   text: "When the authorities ask you to set the standard for an entire boulevard, you understand that architecture is not a private act. Every arch, every balcony, every cornice on this building was drawn with the weight of the street in mind.",
  //   author: "Design Director",
  //   role: "Gravity Studio",
  // },
  // "malir-jinnah-boulevard": {
  //   text: "Colour in architecture is not decoration — it is identity. Each bay window on Jinnah Boulevard is a resident announcing themselves to the street. The building is not one thing; it is eight towers, hundreds of homes, and a thousand small acts of personal expression.",
  //   author: "Design Director",
  //   role: "Gravity Studio",
  // },
  // "cyber-command-ahq": {
  //   text: "To unify is harder than to build anew. Two buildings that once spoke different languages had to be made to sing the same note — and that note had to be strong enough to belong to one of Pakistan's most significant military institutions.",
  //   author: "Design Director",
  //   role: "Gravity Studio",
  // },
  // "gravity-tower-1": {
  //   text: "A tower on three sides of glass is not a building that hides behind its walls — it is one that offers itself entirely to the city, to the sea, and to the sky. Every terrace, every stepped setback, is a gesture of generosity toward the view.",
  //   author: "Design Director",
  //   role: "Gravity Studio",
  // },
  // "paf-chalet-resort": {
  //   text: "To build in the mountains is to accept that the landscape will always be the dominant presence. The chalets do not compete with Kalabagh's peaks — they settle quietly among the pines, dark-clad and angular, as though they grew from the rock itself.",
  //   author: "Design Director",
  //   role: "Gravity Studio",
  // },
  // "paf-vfom-52-suites": {
  //   text: "A courtyard is not a void — it is the heart of a building. At PAFVOM, every suite opens onto a private green space, so that the boundary between inside and outside dissolves, and the fruit gardens become as much a part of the room as its walls.",
  //   author: "Design Director",
  //   role: "Gravity Studio",
  // },
  // "challet": {
  //   text: "A courtyard is not a void — it is the heart of a building. At PAFVOM, every suite opens onto a private green space, so that the boundary between inside and outside dissolves, and the fruit gardens become as much a part of the room as its walls.",
  //   author: "Design Director",
  //   role: "Gravity Studio",
  // },
  // "american": {
  //   text: "A courtyard is not a void — it is the heart of a building. At PAFVOM, every suite opens onto a private green space, so that the boundary between inside and outside dissolves, and the fruit gardens become as much a part of the room as its walls.",
  //   author: "Design Director",
  //   role: "Gravity Studio",
  // },
  // "cigar": {
  //   text: "A courtyard is not a void — it is the heart of a building. At PAFVOM, every suite opens onto a private green space, so that the boundary between inside and outside dissolves, and the fruit gardens become as much a part of the room as its walls.",
  //   author: "Design Director",
  //   role: "Gravity Studio",
  // },
  // "roof": {
  //   text: "A courtyard is not a void — it is the heart of a building. At PAFVOM, every suite opens onto a private green space, so that the boundary between inside and outside dissolves, and the fruit gardens become as much a part of the room as its walls.",
  //   author: "Design Director",
  //   role: "Gravity Studio",
  // },
  // "americanRes": {
  //   text: "A courtyard is not a void — it is the heart of a building. At PAFVOM, every suite opens onto a private green space, so that the boundary between inside and outside dissolves, and the fruit gardens become as much a part of the room as its walls.",
  //   author: "Design Director",
  //   role: "Gravity Studio",
  // },
  // "pafSchool": {
  //   text: "A courtyard is not a void — it is the heart of a building. At PAFVOM, every suite opens onto a private green space, so that the boundary between inside and outside dissolves, and the fruit gardens become as much a part of the room as its walls.",
  //   author: "Design Director",
  //   role: "Gravity Studio",
  // },
  // "atts": {
  //   text: "A courtyard is not a void — it is the heart of a building. At PAFVOM, every suite opens onto a private green space, so that the boundary between inside and outside dissolves, and the fruit gardens become as much a part of the room as its walls.",
  //   author: "Design Director",
  //   role: "Gravity Studio",
  // },
// };

// const CONCEPTS: Record<string, string> = {
//   "jinnah-askari-ii":
//     "The design response to this challenging narrow and elongated plot is a quartet of towers that read as a unified composition from afar while revealing distinct characters up close. High and low masses alternate in a syncopated rhythm, breaking the monotony typical of high-rise residential clusters. The podium weaves generous amenity floors — a gym, pool deck, and landscaped sky terrace — beneath the residential floors, while two basement levels accommodate the parking demand of a building of this scale. The result is a vertical neighbourhood that delivers world-class urban living within one of Karachi's most ambitious residential developments.",
//   "pearl-towers":
//     "Pearl Towers is conceived as a self-sufficient urban village rising from a generous 70-kanal site. Six towers of G+29 floors are arranged around a central communal garden — a green heart that every apartment looks toward. The podium level is a richly programmed base: gyms, swimming pools, a pharmacy, salon, and a mosque integrated seamlessly so that residents need rarely leave. The signature element is the monumental steel winged gate — a soaring sculptural canopy inspired by the spread of wings — that frames the entrance boulevard and gives the entire complex its unmistakable civic identity.",
//   "dha4-islamabad":
//     "Sited on the precipitous cliff edge of DHA Phase 4, Islamabad, these G+15 oval towers exploit what most developments would consider an impossible constraint. The fluid elliptical floor plates rotate subtly floor by floor, maximising valley views from every unit while reducing wind loads at altitude. The soft, undulating facade — composed of continuous horizontal bands of glazing and warm cladding — echoes the contour lines of the hillside below. Each tower appears to grow organically from the terrain, as though shaped by the same geological forces that formed the valley over millennia. At 76.78 kanals, the master plan preserves the natural cliff ecology, threading landscape between the towers and down the escarpment in a continuous green cascade.",
//   "askari-block-130":
//     "The irregular geometry of this Askari 5 plot — a condition that typically forces architects toward compromise — became the generative logic of the entire design. Rather than subdividing the land into a regular grid and accepting residual awkward spaces, the design team embraced the angular boundaries, deriving each apartment's layout directly from the site's perimeter. The result is a G+14 tower in which no two floor plans are identical. Some apartments open wide toward the south; others are narrow and deep, oriented east. Each has a distinct spatial character, a particular relationship to light, and a unique sense of address. The warm facade palette of cream and bronze cladding, punctuated by deep balconies, gives the building a coherent exterior identity that belies the richly individual world within.",
//   "dha-enclave-highrise":
//     "The DHA Enclave Highrise is one of Karachi's most ambitious waterfront developments currently in the design phase. Four towers — two residential, sea-facing to the west, and two commercial, anchoring the eastern edge of the podium — are arranged around a landscaped promenade at grade. The residential towers are characterised by curving, full-height glazed facades that maximise Arabian Sea views, while the commercial towers adopt a more orthogonal language, creating a dialogue between the two programmatic worlds. Cascading sky gardens interrupt each tower's facade at every fourth floor, bringing nature into the vertical realm and reducing solar gain. The podium stitches the four towers together with retail, hospitality, and civic amenity, creating a destination that belongs as much to the city as to its residents and tenants.",
//   "askari-block-18a":
//     "The G+18 Askari Block 18A tower is one of the studio's most disciplined exercises in site-responsive design. The small, acutely angular plot in Askari 5 demanded a building form that did not attempt to disguise its boundaries but instead celebrated them. The result is a slender tower of emphatic geometry — each facade a different angle, each elevation reading uniquely from the street. Two luxury 3-bed apartments occupy each floor, both oriented to face the Askari Park directly to the north. Deep balconies slice across the facade at each level, providing shade, outdoor living space, and a visual rhythm that gives the tower an identity from a distance. The base is compact and secure, with parking integrated into the lower floors and ground-level amenities serving the building's residents.",
//   "askari-block-7-11":
//     "Askari Blocks 7 and 11 presented an unusual brief: two towers of matching footprint, sited on a narrow triangular plot. Rather than treating this as a problem of subdivision, the design team conceived the two towers as a single architectural statement — a pair in conversation, separated by a shared podium and linked by the bold central latticed core that rises between them. Three 3-bed apartments per floor wrap around the triangular plan, each with generous terraces that turn every face of the triangle outward to light and air. The distinctive cross-braced central element is structural and expressive simultaneously — carrying vertical loads while creating a legible architectural identity that makes these twin towers instantly recognisable within the Askari 5 neighbourhood.",
//   "askari-block-10-12":
//     "Rising G+18 floors in the prestigious Askari 11 enclave, Blocks 10 and 12 represent Gravity Studio's vision of vertical community living in Lahore. Two towers of matching floor plan stand side by side, their shared language creating a harmonious pair rather than two isolated objects. The defining ambition of this project is the integration of amenities — swimming pool, gymnasium, and residents' lounges — not as basement afterthoughts but as celebrated volumes within the building's envelope, expressed on the facade and contributing to the towers' distinctive vertical character. Construction is well advanced, with the concrete structure rising steadily against Lahore's skyline. The evening render captures the promise of the finished towers: warm, lit apartments above a generously planted ground level, the twin forms majestic in the dusk light of one of Pakistan's most sought-after residential addresses.",
//   "embassy-gardens":
//     "Embassy Gardens in Bahria Town, Islamabad, is a study in the civic power of classical architecture. The G+3 building occupies a prominent boulevard plot, its ground floor given over to arched retail colonnades that animate the street, while three upper floors of residential apartments rise above with a composed, symmetrical facade of articulated bays, wrought-iron balconies, and decorative cornicing. The classicism is neither pastiche nor nostalgia — it is a precise response to Bahria Town's neoclassical planning language, executed with material care and proportional discipline. The design's success was decisive: Bahria Town authorities, recognising the elevation's quality and its ability to give coherence to the streetscape, mandated it as the template for all subsequent buildings on the surrounding boulevard. Embassy Gardens thus became not merely a completed project but the architectural DNA of an entire neighbourhood — a rare honour and a testament to the enduring relevance of classically grounded design.",
//   "malir-jinnah-boulevard":
//     "Jinnah Boulevard in Malir, Karachi, is among the studio's most ambitious residential masterplans — eight apartment towers of varying heights arranged across a generous 4-acre gated site, creating a self-contained urban quarter. The compositional strategy deliberately resists uniformity: towers step up and down in section, creating a dynamic roofline that reads as a small skyline unto itself. The signature gesture is the bay window system — projecting volumes clad in a palette of warm, saturated colours that animate the otherwise white rendered facades. Red, teal, amber, and cream bays punctuate each elevation at irregular intervals, giving each apartment a distinct street identity and the overall complex a playful, residential warmth rarely achieved at this scale. At ground level, a commercial boulevard runs along the main entrance, providing retail and services that activate the public edge of the site. The interior of the complex is pedestrianised, landscaped, and fully amenitised — a secure, green world that contrasts with the density of the surrounding Malir urban fabric.",
//   "cyber-command-ahq":
//     "The PAF Cyber Command Complex presented a fundamentally different challenge from any other project in the studio's portfolio: not to design from scratch, but to unify. Two existing structures — independently constructed, formally inconsistent, and physically separated — had to be transformed into a single coherent institutional complex befitting Pakistan Air Force's premier cyber operations facility. The unifying strategy operated on two levels. Externally, a continuous cladding system of Aluminum Composite Panels — selected specifically to match the material language of the surrounding Air Headquarters campus — was applied across both buildings, erasing their previous individuality and binding them into one legible whole. A central courtyard was introduced between the two structures, providing both a physical connection and a civic breathing space within the complex. Internally, the transformation was equally ambitious. The Cyber Security Centre lobby — a double-height volume of rich timber cladding, polished marble, and blue-lit display screens — delivers an arrival experience of genuine institutional gravitas. The hexagonal ceiling of the main atrium, composed of dark timber coffers with integrated LED lighting in the Cyber Command's signature blue, directly references the unit's emblem and the geometry of the honeycomb glass entrance doors. The result is a building that reads as always having been a single, purposeful whole — and that carries, in its every detail, the technological identity of the force it serves.",
//   "gravity-tower-1":
//     "Gravity Tower 1 is the studio's most emphatic statement on the relationship between architecture and the sea. Rising G+21 floors on a prime 2,000 sq yard site near Dolmen Mall in Clifton, Karachi, the tower's three-sided glazed envelope was conceived as a continuous frame for the Arabian Sea — a building that does not simply stand near the water but is in permanent dialogue with it. Stepped terraces cascade up the facade at every third floor, breaking the sheer glass plane into a succession of generous outdoor spaces from which the sea is visible at every level. Internally, world-class finishes — marble, brushed brass, and dark-toned timber — give the office floors a weight and materiality that counterbalances the lightness of the all-glass exterior. The lower floors, given over to above-ground parking, posed the challenge of integration: a precisely detailed decorative metal screen wraps these levels, its pattern drawn from the tower's triangular plan geometry, transforming a utilitarian programme into a legible and elegant element of the building's public identity. The result is a tower that belongs to Karachi's seafront with the confidence of a civic landmark.",
//   "paf-chalet-resort":
//     "The PAF Chalet Mountain Resort at Kalabagh represents a fundamentally different typology from any other project in the studio's portfolio — not a single monumental building, but a dispersed community of lightweight structures woven into the forested hillside. The chalets are prefabricated metal structures, precision-manufactured and erected on site with minimal ground disturbance, their steeply pitched dark-steel rooflines and timber-clad walls echoing the geometry of the surrounding pine canopy. Each chalet — available in 2- and 3-bedroom configurations — is designed as a complete residence: full kitchen, spacious lounge, and generous terraces oriented deliberately toward the mountain panorama so that every room is framed by the landscape. The main building adopts a contrasting architectural language — a flowing, aerodynamic white form with a full-perimeter glazed restaurant volume that appears to float above the hillside. From within its dining rooms, the mountains of Kalabagh are the wallpaper. The construction sequence — steel frames rising among the pines — is itself a form of site poetry: lightweight, reversible, and respectful of the ecology it inhabits. The resort is a project about restraint as much as ambition; about building only as much as the mountain will permit, and making every square metre of it extraordinary.",
//   "paf-vfom-52-suites":
//     "The PAF PAFVOM 52 Suites complex in Malir, Karachi, is a hospitality project of unusual ambition: a low-rise, G+1 building that achieves a sense of grandeur not through height, but through proportion, landscape, and the careful orchestration of indoor and outdoor space. The traditional European façade — arched colonnades, symmetrically composed bays, and a hipped tiled roof — announces a building of deliberate elegance, one that draws from classical European precedent while remaining unmistakably of its place. The 52 suites are self-contained residences: each has a kitchen, a dining space, and a living area, enabling extended stays with the comforts of home and the service of a hotel. The building is organised around a series of private courtyards that serve a dual purpose — providing each suite with a sheltered outdoor space that opens directly off the rooms, and threading light and greenery deep into the building's plan. The fruit gardens that surround and penetrate the complex are not decorative afterthoughts; they are an integral part of the guest experience, providing shade, scent, and a living landscape that changes with the seasons. Beyond the suites, the complex is richly programmed: a fully equipped dining hall and professional kitchen serve group meals and events; multiple socialising spaces — lounges, terraces, and communal gardens — encourage gathering and repose; and gymnasium facilities ensure the complex functions as a complete, self-sufficient residential retreat. Completed and in use, PAFVOM is among the studio's most considered hospitality projects: a place of quiet generosity, where European formal discipline meets the lush informality of the subcontinent's garden tradition.",
//   "challet":
//     "The PAF PAFVOM 52 Suites complex in Malir, Karachi, is a hospitality project of unusual ambition: a low-rise, G+1 building that achieves a sense of grandeur not through height, but through proportion, landscape, and the careful orchestration of indoor and outdoor space. The traditional European façade — arched colonnades, symmetrically composed bays, and a hipped tiled roof — announces a building of deliberate elegance, one that draws from classical European precedent while remaining unmistakably of its place. The 52 suites are self-contained residences: each has a kitchen, a dining space, and a living area, enabling extended stays with the comforts of home and the service of a hotel. The building is organised around a series of private courtyards that serve a dual purpose — providing each suite with a sheltered outdoor space that opens directly off the rooms, and threading light and greenery deep into the building's plan. The fruit gardens that surround and penetrate the complex are not decorative afterthoughts; they are an integral part of the guest experience, providing shade, scent, and a living landscape that changes with the seasons. Beyond the suites, the complex is richly programmed: a fully equipped dining hall and professional kitchen serve group meals and events; multiple socialising spaces — lounges, terraces, and communal gardens — encourage gathering and repose; and gymnasium facilities ensure the complex functions as a complete, self-sufficient residential retreat. Completed and in use, PAFVOM is among the studio's most considered hospitality projects: a place of quiet generosity, where European formal discipline meets the lush informality of the subcontinent's garden tradition.",
//   "american":
//     "The PAF PAFVOM 52 Suites complex in Malir, Karachi, is a hospitality project of unusual ambition: a low-rise, G+1 building that achieves a sense of grandeur not through height, but through proportion, landscape, and the careful orchestration of indoor and outdoor space. The traditional European façade — arched colonnades, symmetrically composed bays, and a hipped tiled roof — announces a building of deliberate elegance, one that draws from classical European precedent while remaining unmistakably of its place. The 52 suites are self-contained residences: each has a kitchen, a dining space, and a living area, enabling extended stays with the comforts of home and the service of a hotel. The building is organised around a series of private courtyards that serve a dual purpose — providing each suite with a sheltered outdoor space that opens directly off the rooms, and threading light and greenery deep into the building's plan. The fruit gardens that surround and penetrate the complex are not decorative afterthoughts; they are an integral part of the guest experience, providing shade, scent, and a living landscape that changes with the seasons. Beyond the suites, the complex is richly programmed: a fully equipped dining hall and professional kitchen serve group meals and events; multiple socialising spaces — lounges, terraces, and communal gardens — encourage gathering and repose; and gymnasium facilities ensure the complex functions as a complete, self-sufficient residential retreat. Completed and in use, PAFVOM is among the studio's most considered hospitality projects: a place of quiet generosity, where European formal discipline meets the lush informality of the subcontinent's garden tradition.",
//   "cigar":
//     "The PAF PAFVOM 52 Suites complex in Malir, Karachi, is a hospitality project of unusual ambition: a low-rise, G+1 building that achieves a sense of grandeur not through height, but through proportion, landscape, and the careful orchestration of indoor and outdoor space. The traditional European façade — arched colonnades, symmetrically composed bays, and a hipped tiled roof — announces a building of deliberate elegance, one that draws from classical European precedent while remaining unmistakably of its place. The 52 suites are self-contained residences: each has a kitchen, a dining space, and a living area, enabling extended stays with the comforts of home and the service of a hotel. The building is organised around a series of private courtyards that serve a dual purpose — providing each suite with a sheltered outdoor space that opens directly off the rooms, and threading light and greenery deep into the building's plan. The fruit gardens that surround and penetrate the complex are not decorative afterthoughts; they are an integral part of the guest experience, providing shade, scent, and a living landscape that changes with the seasons. Beyond the suites, the complex is richly programmed: a fully equipped dining hall and professional kitchen serve group meals and events; multiple socialising spaces — lounges, terraces, and communal gardens — encourage gathering and repose; and gymnasium facilities ensure the complex functions as a complete, self-sufficient residential retreat. Completed and in use, PAFVOM is among the studio's most considered hospitality projects: a place of quiet generosity, where European formal discipline meets the lush informality of the subcontinent's garden tradition.",
//   "roof":
//     "The PAF PAFVOM 52 Suites complex in Malir, Karachi, is a hospitality project of unusual ambition: a low-rise, G+1 building that achieves a sense of grandeur not through height, but through proportion, landscape, and the careful orchestration of indoor and outdoor space. The traditional European façade — arched colonnades, symmetrically composed bays, and a hipped tiled roof — announces a building of deliberate elegance, one that draws from classical European precedent while remaining unmistakably of its place. The 52 suites are self-contained residences: each has a kitchen, a dining space, and a living area, enabling extended stays with the comforts of home and the service of a hotel. The building is organised around a series of private courtyards that serve a dual purpose — providing each suite with a sheltered outdoor space that opens directly off the rooms, and threading light and greenery deep into the building's plan. The fruit gardens that surround and penetrate the complex are not decorative afterthoughts; they are an integral part of the guest experience, providing shade, scent, and a living landscape that changes with the seasons. Beyond the suites, the complex is richly programmed: a fully equipped dining hall and professional kitchen serve group meals and events; multiple socialising spaces — lounges, terraces, and communal gardens — encourage gathering and repose; and gymnasium facilities ensure the complex functions as a complete, self-sufficient residential retreat. Completed and in use, PAFVOM is among the studio's most considered hospitality projects: a place of quiet generosity, where European formal discipline meets the lush informality of the subcontinent's garden tradition.",
//   "americanRes":
//     "The PAF PAFVOM 52 Suites complex in Malir, Karachi, is a hospitality project of unusual ambition: a low-rise, G+1 building that achieves a sense of grandeur not through height, but through proportion, landscape, and the careful orchestration of indoor and outdoor space. The traditional European façade — arched colonnades, symmetrically composed bays, and a hipped tiled roof — announces a building of deliberate elegance, one that draws from classical European precedent while remaining unmistakably of its place. The 52 suites are self-contained residences: each has a kitchen, a dining space, and a living area, enabling extended stays with the comforts of home and the service of a hotel. The building is organised around a series of private courtyards that serve a dual purpose — providing each suite with a sheltered outdoor space that opens directly off the rooms, and threading light and greenery deep into the building's plan. The fruit gardens that surround and penetrate the complex are not decorative afterthoughts; they are an integral part of the guest experience, providing shade, scent, and a living landscape that changes with the seasons. Beyond the suites, the complex is richly programmed: a fully equipped dining hall and professional kitchen serve group meals and events; multiple socialising spaces — lounges, terraces, and communal gardens — encourage gathering and repose; and gymnasium facilities ensure the complex functions as a complete, self-sufficient residential retreat. Completed and in use, PAFVOM is among the studio's most considered hospitality projects: a place of quiet generosity, where European formal discipline meets the lush informality of the subcontinent's garden tradition.",
//   "pafSchool":
//     "The PAF PAFVOM 52 Suites complex in Malir, Karachi, is a hospitality project of unusual ambition: a low-rise, G+1 building that achieves a sense of grandeur not through height, but through proportion, landscape, and the careful orchestration of indoor and outdoor space. The traditional European façade — arched colonnades, symmetrically composed bays, and a hipped tiled roof — announces a building of deliberate elegance, one that draws from classical European precedent while remaining unmistakably of its place. The 52 suites are self-contained residences: each has a kitchen, a dining space, and a living area, enabling extended stays with the comforts of home and the service of a hotel. The building is organised around a series of private courtyards that serve a dual purpose — providing each suite with a sheltered outdoor space that opens directly off the rooms, and threading light and greenery deep into the building's plan. The fruit gardens that surround and penetrate the complex are not decorative afterthoughts; they are an integral part of the guest experience, providing shade, scent, and a living landscape that changes with the seasons. Beyond the suites, the complex is richly programmed: a fully equipped dining hall and professional kitchen serve group meals and events; multiple socialising spaces — lounges, terraces, and communal gardens — encourage gathering and repose; and gymnasium facilities ensure the complex functions as a complete, self-sufficient residential retreat. Completed and in use, PAFVOM is among the studio's most considered hospitality projects: a place of quiet generosity, where European formal discipline meets the lush informality of the subcontinent's garden tradition.",
//   };
const SIZE_MAP: Record<string, string> = {
  "HighRise": "varies by tower",
  "Hospitality & Institutional": "_",
  "Educational": "—",
  "Retail & Commercial": "_",
  "Offices & IT Parks": "—",
  "Residential": "_",
};

// ─── Easing ───────────────────────────────────────────────────────────────────
const EASE_CINEMATIC = [0.76, 0, 0.24, 1] as const;
const EASE_SMOOTH    = [0.22, 1, 0.36, 1] as const;

// ─── Carousel variants ────────────────────────────────────────────────────────
const carouselVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%" }),
  center: { x: "0%" },
  exit:   (dir: number) => ({ x: dir > 0 ? "-100%" : "100%" }),
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function Divider({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <div
      className={className}
      style={{ borderTop: `0.5px solid ${light ? "rgba(255,255,255,0.15)" : "#e8e8e8"}`, width: "100%" }}
    />
  );
}

function FadeUp({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.9, delay, ease: EASE_SMOOTH }}
    >
      {children}
    </motion.div>
  );
}

function SlideUp({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 1, delay, ease: EASE_CINEMATIC }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function HeroParallax({ src, scrollYProgress }: { src: string; scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y, scale: 1.15 }}>
        <img
          src={src}
          alt="hero"
          className="w-full h-full object-cover"
          style={{ display: "block" }}
        />
      </motion.div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// Main component
// ═════════════════════════════════════════════════════════════════════════════
export function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [carouselDir, setCarouselDir] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState('');
  const [modalAlt, setModalAlt] = useState('');
  // const [planIdx, setPlanIdx] = useState(0);

  // Outer wrapper ref — serves as the positioned container for useScroll
  const containerRef = useRef<HTMLDivElement>(null);

  // Window-level scroll progress for the progress bar
  const { scrollYProgress } = useScroll({ container: containerRef });

  // Hero section ref — must be position:relative so Motion can correctly
  // calculate scroll offsets (non-static positioning requirement)
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    container: containerRef,
    offset: ["start start", "end start"],
  });

  const projectIndex = projects.findIndex((p) => p.id === id);
  const project = projects[projectIndex];

  if (!project) {
    return (
      <div className="h-screen bg-black flex items-center justify-center" style={{ fontFamily: SANS }}>
        <div className="text-center">
          <p className="m-0 mb-6 uppercase tracking-[0.25em]" style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>
            Project not found
          </p>
          <button
            onClick={() => navigate("/projects")}
            className="uppercase tracking-[0.15em] bg-transparent border-none cursor-pointer"
            style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", borderBottom: "0.5px solid rgba(255,255,255,0.3)", paddingBottom: 2 }}
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const nextProject = projects[(projectIndex + 1) % projects.length];
  const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length];

  const subtitle  = SUBTITLES[project.id] || project.category;
  // const quote     = QUOTES[project.id]    || { text: "Architecture is a social act.", author: "Gravity Studio", role: "Design Director" };
  // const concept   = CONCEPTS[project.id] || project.description;
  const size      = project.area || SIZE_MAP[project.category] || "—";
  // const yearEnd   = parseInt(project.year);
  // const timespan  = `${yearEnd - 2} — ${project.year}`;

  const galleryImages = [
    project.image,
    ...project.images,
  ].filter(Boolean) as string[];

  const galleryCapts = galleryImages.map((_, i) =>
    i === 0 ? `${project.title} — primary view` : `${project.title} — view ${i + 1} of ${galleryImages.length}`
  );

  // const floorPlans = [
  //   { label: "Site Plan",    img: STATIC.floorplan },
  //   { label: "Ground Floor", img: STATIC.floorplan },
  //   { label: "Typical Floor",img: STATIC.floorplan },
  // ];

  const infoItems = [
    // { label: "Time span",  value: timespan },
    { label: "Site area",  value: size },
    { label: "Status",     value: project.status || "Completed" },
    { label: "Location",   value: project.location },
    { label: "Type",       value: project.category },
  ];

  function goPrev() { setCarouselDir(-1); setCarouselIdx((i) => (i - 1 + galleryImages.length) % galleryImages.length); }
  function goNext() { setCarouselDir(1);  setCarouselIdx((i) => (i + 1) % galleryImages.length); }

  return (
    <div ref={containerRef} style={{ backgroundColor: "#fff", fontFamily: SANS, color: "#111", overflowX: "hidden", position: "relative" }}>

      {/* ── Scroll progress bar ───────────────────────────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[300] h-[1px]"
        style={{
          scaleX: scrollYProgress,
          transformOrigin: "left",
          background: "linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0.4))",
        }}
      />

      {/* ════════════════════════════════════════════════════════════════════
          HERO — fullscreen cinematic
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative" style={{ height: "100vh", minHeight: 640, overflow: "hidden" }} ref={heroRef}>

        {/* Background image with parallax */}
        <HeroParallax src={project.image} scrollYProgress={heroScrollProgress} />

        {/* Dark gradient overlay — heavy on left, fades right */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: "linear-gradient(105deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.72) 35%, rgba(0,0,0,0.38) 65%, rgba(0,0,0,0.18) 100%)",
          }}
        />

        {/* Vignette bottom */}
        <div
          className="absolute inset-x-0 bottom-0 z-[2]"
          style={{ height: "45%", background: "linear-gradient(to top, rgba(0,0,0,0.65), transparent)" }}
        />

        {/* Content */}
        <div className="absolute inset-0 z-[3] flex flex-col justify-between px-[clamp(28px,6vw,96px)] py-[clamp(100px,10vh,140px)]">

          {/* Top-left: category + year tag */}
          <motion.div
            className="flex items-center gap-5"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE_SMOOTH }}
          >
            <span
              className="uppercase tracking-[0.28em]"
              style={{ fontSize: 9, color: "rgba(255,255,255,0.45)", fontFamily: SANS, letterSpacing: "0.28em" }}
            >
              {project.category}
            </span>
            <span style={{ width: 28, height: "0.5px", background: "rgba(255,255,255,0.25)", display: "inline-block" }} />
            <span
              className="uppercase tracking-[0.22em]"
              style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", fontFamily: SANS }}
            >
              {project.location}
            </span>
          </motion.div>

          {/* Center-left: main title */}
          <div className="mt-auto" style={{ maxWidth: "clamp(320px, 60vw, 780px)" }}>
            {/* Subtitle line */}
            <div className="overflow-hidden mb-4">
              <motion.p
                className="m-0 uppercase tracking-[0.3em]"
                style={{ fontSize: "clamp(9px,0.85vw,11px)", color: "rgba(255,255,255,0.45)", fontFamily: SANS, letterSpacing: "0.3em" }}
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, delay: 0.5, ease: EASE_CINEMATIC }}
              >
                {subtitle}
              </motion.p>
            </div>

            {/* Project title — large serif */}
            <div className="overflow-hidden">
              <motion.h1
                className="m-0 p-0"
                style={{
                  fontSize: "clamp(52px, 9vw, 100px)",
                  fontWeight: 200,
                  lineHeight: 0.92,
                  letterSpacing: "-0.025em",
                  color: "#fff",
                  fontFamily: SERIF,
                }}
                initial={{ y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, delay: 0.65, ease: EASE_CINEMATIC }}
              >
                {project.title}
              </motion.h1>
            </div>

            {/* Year badge */}
            {/* <motion.div
              className="flex items-center gap-4 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1, ease: EASE_SMOOTH }}
            >
              <span
                style={{
                  display: "inline-block",
                  border: "0.5px solid rgba(255,255,255,0.25)",
                  color: "rgba(255,255,255,0.55)",
                  fontFamily: SANS,
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  padding: "6px 14px",
                  textTransform: "uppercase",
                  borderRadius: 2,
                }}
              >
                {project.year}
              </span>
            </motion.div> */}
          </div>

          {/* Bottom-right: scroll hint */}
          <motion.div
            className="self-end flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4, ease: EASE_SMOOTH }}
          >
            <span
              className="uppercase tracking-[0.25em]"
              style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", fontFamily: SANS }}
            >
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown size={11} color="rgba(255,255,255,0.3)" strokeWidth={1.5} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          INFO BAR — metadata strip
      ════════════════════════════════════════════════════════════════════ */}
      <FadeUp>
        <div style={{ borderBottom: "0.5px solid #e8e8e8" }}>
          <div
            className="flex flex-wrap"
            style={{ maxWidth: "100%" }}
          >
            {infoItems.map((item, i) => (
              <div
                key={item.label}
                className="flex-1"
                style={{
                  minWidth: 140,
                  padding: "28px clamp(24px,4vw,56px)",
                  borderRight: i < infoItems.length - 1 ? "0.5px solid #e8e8e8" : "none",
                }}
              >
                <p
                  className="m-0 mb-2 uppercase tracking-[0.25em]"
                  style={{ fontSize: 8, color: "#bbb", fontFamily: SANS }}
                >
                  {item.label}
                </p>
                <p
                  className="m-0"
                  style={{ fontSize: 13, color: "#1a1a1a", fontWeight: 400, fontFamily: SANS, letterSpacing: "0.01em" }}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>

      {/* ════════════════════════════════════════════════════════════════════
          OVERVIEW — two-column text block
      ════════════════════════════════════════════════════════════════════ */}
      <div
        className="px-[clamp(28px,6vw,96px)]"
        style={{ paddingTop: "clamp(80px,10vw,140px)", paddingBottom: "clamp(60px,8vw,100px)" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16 items-start">
          <div>
            <SlideUp>
              <p
                className="m-0 uppercase tracking-[0.28em]"
                style={{ fontSize: 8, color: "#bbb", fontFamily: SANS }}
              >
                Project Overview
              </p>
            </SlideUp>
            <SlideUp delay={0.08}>
              <h2
                className="m-0 mt-5"
                style={{
                  fontSize: "clamp(26px, 3.5vw, 46px)",
                  fontWeight: 300,
                  fontFamily: SERIF,
                  color: "#111",
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                }}
              >
                The Vision
              </h2>
            </SlideUp>
          </div>
          <FadeUp delay={0.1}>
            <p
              className="m-0"
              style={{
                fontSize: "clamp(14px, 1.3vw, 17px)",
                lineHeight: 1.88,
                color: "#555",
                fontWeight: 300,
                fontFamily: SANS,
                maxWidth: "68ch",
              }}
            >
              {project.description}
            </p>
          </FadeUp>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          FULL-BLEED IMAGE — first scroll reveal
      ════════════════════════════════════════════════════════════════════ */}
      {/* <motion.div
        className="relative overflow-hidden"
        style={{ height: "clamp(420px, 65vh, 800px)" }}
        initial={{ opacity: 0, scale: 1.04 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.3, ease: EASE_CINEMATIC }}
      >
        <img
          src={project.images[0]}
          alt={`${project.title} interior view`}
          className="w-full h-full object-cover"
          style={{ display: "block" }}
        />
        {/* Subtle dark overlay at bottom 
        <div
          className="absolute inset-x-0 bottom-0"
          style={{ height: "30%", background: "linear-gradient(to top, rgba(0,0,0,0.35), transparent)" }}
        />
        <div
          className="absolute bottom-0 left-0 px-[clamp(28px,6vw,96px)] pb-8"
        >
          <p
            className="m-0 uppercase tracking-[0.22em]"
            style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", fontFamily: SANS }}
          >
            {project.location} — {project.year}
          </p>
        </div>
      </motion.div>


      <div
        className="px-[clamp(28px,6vw,96px)]"
        style={{ paddingTop: "clamp(80px,10vw,140px)", paddingBottom: "clamp(60px,8vw,100px)" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16 items-start">
          <div>
            <SlideUp>
              <p
                className="m-0 uppercase tracking-[0.28em]"
                style={{ fontSize: 8, color: "#bbb", fontFamily: SANS }}
              >
                Design Concept
              </p>
            </SlideUp>
            <SlideUp delay={0.08}>
              <h2
                className="m-0 mt-5"
                style={{
                  fontSize: "clamp(26px, 3.5vw, 46px)",
                  fontWeight: 300,
                  fontFamily: SERIF,
                  color: "#111",
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                }}
              >
                Design<br />Intent
              </h2>
            </SlideUp>
          </div>
          <FadeUp delay={0.1}>
            <p
              className="m-0"
              style={{
                fontSize: "clamp(14px, 1.3vw, 17px)",
                lineHeight: 1.88,
                color: "#555",
                fontWeight: 300,
                fontFamily: SANS,
                maxWidth: "68ch",
              }}
            >
              {concept}
            </p>
          </FadeUp>
        </div>
      </div> */}

      {/* ════════════════════════════════════════════════════════════════════
          GALLERY CAROUSEL — cinematic sliding
      ════════════════════════════════════════════════════════════════════ */}
      <div className="px-[clamp(28px,6vw,96px)]" style={{ paddingBottom: "clamp(80px,10vw,140px)" }}>
        <FadeUp>
          {/* Track */}
          <div
            className="relative overflow-hidden"
            style={{
              aspectRatio: "16/9",
              maxHeight: 580,
              background: "#0a0a0a",
              borderRadius: 2,
            }}
          >
            <AnimatePresence initial={false} custom={carouselDir} mode="sync">
              <motion.img
                key={carouselIdx}
                src={galleryImages[carouselIdx]}
                alt={galleryCapts[carouselIdx]}
                custom={carouselDir}
                variants={carouselVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.8, ease: EASE_CINEMATIC }}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ willChange: "transform" }}
                onClick={() => {
                  setIsOpen(true);
                  setModalSrc(galleryImages[carouselIdx]);
                  setModalAlt(galleryCapts[carouselIdx]);
                }}
              />
            </AnimatePresence>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsOpen(false)}
                >
                  <motion.img
                    src={modalSrc}
                    alt={modalAlt}
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="max-w-[90vw] max-h-[90vh] object-contain cursor-zoom-out"
                    onClick={(e) => e.stopPropagation()}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Image counter overlay */}
            <div className="absolute top-6 right-6 z-10">
              <span
                style={{
                  fontFamily: SANS,
                  fontSize: 10,
                  color: "rgba(255,255,255,0.5)",
                  letterSpacing: "0.12em",
                  background: "rgba(0,0,0,0.3)",
                  padding: "4px 10px",
                  backdropFilter: "blur(8px)",
                  borderRadius: 1,
                }}
              >
                {String(carouselIdx + 1).padStart(2, "0")} / {String(galleryImages.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Controls row */}
          <div className="flex items-center justify-between mt-5">
            <p
              className="m-0"
              style={{ fontSize: 11, color: "#aaa", fontFamily: SANS, maxWidth: "55ch", letterSpacing: "0.02em" }}
            >
              {galleryCapts[carouselIdx]}
            </p>
            <div className="flex items-center gap-5 shrink-0 ml-8">
              <button
                onClick={goPrev}
                className="flex items-center justify-center bg-transparent border-none cursor-pointer transition-opacity hover:opacity-40 p-0"
                style={{ width: 36, height: 36, border: "0.5px solid #ddd", borderRadius: "50%" }}
                aria-label="Previous"
              >
                <ArrowLeft size={12} color="#555" strokeWidth={1.5} />
              </button>
              <button
                onClick={goNext}
                className="flex items-center justify-center bg-transparent cursor-pointer transition-opacity hover:opacity-40 p-0"
                style={{ width: 36, height: 36, background: "#111", borderRadius: "50%", border: "none" }}
                aria-label="Next"
              >
                <ArrowRight size={12} color="#fff" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </FadeUp>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          PULL QUOTE — full-width dark section
      ═══════════════════════════════════════════════════════════════════ */}
      {/* <div style={{ background: "#0a0a0a", padding: "clamp(80px,10vw,140px) clamp(28px,6vw,96px)" }}>
        <div style={{ maxWidth: "80ch" }}>
          <SlideUp>
            <p
              className="m-0"
              style={{
                fontSize: "clamp(22px, 2.8vw, 40px)",
                fontStyle: "italic",
                fontWeight: 300,
                lineHeight: 1.5,
                color: "rgba(255,255,255,0.88)",
                fontFamily: SERIF,
                letterSpacing: "0.005em",
              }}
            >
              "{quote.text}"
            </p>
          </SlideUp>
          <FadeUp delay={0.2}>
            <div className="flex items-center gap-6 mt-10">
              <div style={{ width: 32, height: "0.5px", background: "rgba(255,255,255,0.2)" }} />
              <div>
                <p
                  className="m-0"
                  style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontFamily: SANS, letterSpacing: "0.06em" }}
                >
                  {quote.author}
                </p>
                <p
                  className="m-0 mt-1"
                  style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", fontFamily: SANS, letterSpacing: "0.1em", textTransform: "uppercase" }}
                >
                  {quote.role}
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </div> */}

      {/* ════════════════════════════════════════════════════════════════════
          MATERIALS — editorial text
      ════════════════════════════════════════════════════════════════════ */}
      {/* <div
        className="px-[clamp(28px,6vw,96px)]"
        style={{ paddingTop: "clamp(80px,10vw,140px)", paddingBottom: "clamp(60px,8vw,100px)" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16 items-start">
          <div>
            <SlideUp>
              <p className="m-0 uppercase tracking-[0.28em]" style={{ fontSize: 8, color: "#bbb", fontFamily: SANS }}>
                Materials & Construction
              </p>
            </SlideUp>
            <SlideUp delay={0.08}>
              <h2
                className="m-0 mt-5"
                style={{
                  fontSize: "clamp(26px, 3.5vw, 46px)",
                  fontWeight: 300,
                  fontFamily: SERIF,
                  color: "#111",
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                }}
              >
                Built to<br />Last
              </h2>
            </SlideUp>
          </div>
          <FadeUp delay={0.1}>
            <p
              className="m-0"
              style={{ fontSize: "clamp(14px, 1.3vw, 17px)", lineHeight: 1.88, color: "#555", fontWeight: 300, fontFamily: SANS, maxWidth: "68ch" }}
            >
              The material palette was established early in the design process and remained
              unchanged throughout construction — a discipline that gave the building its
              coherence. Primary structure in exposed concrete; secondary elements in
              powder-coated steel; internal finishes in raw oak and polished limestone.
              No material appears in this project that cannot be seen, understood, and
              eventually returned to nature.
            </p>
          </FadeUp>
        </div>
      </div> */}

      {/* ════════════════════════════════════════════════════════════════════
          TWO-COLUMN IMAGE GRID — real project images
      ════════════════════════════════════════════════════════════════════ */}
      {project.images.length >= 2 && (
        <div className="px-[clamp(28px,6vw,96px)]" style={{ paddingBottom: "clamp(80px,10vw,10px)" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {project.images.slice(-2).map((src, i) => (
              <FadeUp key={src} delay={i * 0.15}>
                <motion.div
                  className="overflow-hidden"
                  style={{ height: "clamp(240px, 38vh, 460px)", borderRadius: 2 }}
                  initial={{ scale: 1.06, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 1.2, delay: i * 0.12, ease: EASE_CINEMATIC }}
                >
                  <img
                    src={src}
                    alt={`${project.title} — detail view ${i + 1}`}
                    className="w-full h-full object-cover"
                    style={{ display: "block" }}
                    onClick={() => {
                      setIsOpen(true);
                      setModalSrc(src);
                      setModalAlt(`${project.title} — detail view ${i + 1}`);
                    }}
                  />
                </motion.div>
                <p
                  className="m-0 mt-4"
                  style={{ fontSize: 11, color: "#aaa", fontFamily: SANS, letterSpacing: "0.02em" }}
                >
                  {project.title} — detail view {i + 1}
                </p>
              </FadeUp>
            ))}
          </div>
        </div>
      )}
      {project.construction.length >= 1 && (
        <div className="px-[clamp(28px,6vw,96px)]" style={{ paddingBottom: "clamp(80px,10vw,10px)" }}>
            <h2
                className="m-0 mb-3"
                style={{
                  fontSize: "clamp(26px, 3.5vw, 46px)",
                  fontWeight: 300,
                  fontFamily: SERIF,
                  color: "#111",
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                }}
              >
                Under Construction:
              </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {project.construction.slice(-2).map((src, i) => (
              <FadeUp key={src} delay={i * 0.15}>
                <motion.div
                  className="overflow-hidden"
                  style={{ height: "clamp(240px, 38vh, 460px)", borderRadius: 2 }}
                  initial={{ scale: 1.06, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 1.2, delay: i * 0.12, ease: EASE_CINEMATIC }}
                >
                  <img
                    src={src}
                    alt={`${project.title} — detail view ${i + 1}`}
                    className="w-full h-full object-cover"
                    style={{ display: "block" }}
                    onClick={() => {
                      setIsOpen(true);
                      setModalSrc(src);
                      setModalAlt(`${project.title} — detail view ${i + 1}`);
                    }}
                  />
                </motion.div>
                <p
                  className="m-0 mt-4"
                  style={{ fontSize: 11, color: "#aaa", fontFamily: SANS, letterSpacing: "0.02em" }}
                >
                  {project.title} — detail view {i + 1}
                </p>
              </FadeUp>
            ))}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════
          FLOOR PLANS
      ════════════════════════════════════════════════════════════════════ */}
      {/* <div
        className="px-[clamp(28px,6vw,96px)]"
        style={{ paddingBottom: "clamp(80px,10vw,140px)", borderTop: "0.5px solid #e8e8e8", paddingTop: "clamp(60px,8vw,100px)" }}
      >
        <FadeUp>
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="m-0 mb-3 uppercase tracking-[0.28em]" style={{ fontSize: 8, color: "#bbb", fontFamily: SANS }}>
                Technical Drawings
              </p>
              <h2
                className="m-0"
                style={{ fontSize: "clamp(22px, 2.8vw, 38px)", fontWeight: 300, fontFamily: SERIF, color: "#111", letterSpacing: "-0.01em" }}
              >
                Floor Plans
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setPlanIdx((i) => Math.max(0, i - 1))}
                className="bg-transparent cursor-pointer p-0 flex items-center justify-center transition-opacity"
                style={{
                  opacity: planIdx === 0 ? 0.2 : 1,
                  width: 34, height: 34,
                  border: "0.5px solid #ddd",
                  borderRadius: "50%",
                }}
                disabled={planIdx === 0}
                aria-label="Previous plan"
              >
                <ArrowLeft size={11} color="#555" strokeWidth={1.5} />
              </button>
              <span style={{ fontSize: 10, color: "#bbb", fontFamily: SANS, letterSpacing: "0.1em", minWidth: 48, textAlign: "center" }}>
                {String(planIdx + 1).padStart(2, "0")} / {String(floorPlans.length).padStart(2, "0")}
              </span>
              <button
                onClick={() => setPlanIdx((i) => Math.min(floorPlans.length - 1, i + 1))}
                className="cursor-pointer p-0 flex items-center justify-center transition-opacity"
                style={{
                  opacity: planIdx === floorPlans.length - 1 ? 0.2 : 1,
                  width: 34, height: 34,
                  background: "#111",
                  border: "none",
                  borderRadius: "50%",
                }}
                disabled={planIdx === floorPlans.length - 1}
                aria-label="Next plan"
              >
                <ArrowRight size={11} color="#fff" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {floorPlans.map((plan, i) => (
              <motion.div
                key={plan.label}
                animate={{ opacity: i === planIdx ? 1 : 0.28 }}
                transition={{ duration: 0.5 }}
                onClick={() => setPlanIdx(i)}
                style={{ cursor: "pointer" }}
              >
                <div
                  style={{
                    background: "#f4f4f4",
                    border: i === planIdx ? "0.5px solid #bbb" : "0.5px solid #eee",
                    overflow: "hidden",
                    borderRadius: 2,
                    transition: "border-color 0.4s",
                  }}
                >
                  <img
                    src={plan.img}
                    alt={plan.label}
                    className="w-full object-cover block"
                    style={{ height: 170, filter: "grayscale(30%) contrast(0.85)", transition: "filter 0.4s" }}
                  />
                </div>
                <p
                  className="m-0 mt-3 uppercase tracking-[0.2em]"
                  style={{
                    fontSize: 9,
                    color: i === planIdx ? "#555" : "#ccc",
                    fontFamily: SANS,
                    transition: "color 0.4s",
                  }}
                >
                  {plan.label}
                </p>
              </motion.div>
            ))}
          </div>
        </FadeUp>
      </div> */}

      {/* ══════════════════════════════════════════════════════���═════════════
          CLOSING FULL-BLEED IMAGE
      ════════════════════════════════════════════════════════════════════ */}
      {/* <motion.div
        className="relative overflow-hidden"
        style={{ height: "clamp(380px, 60vh, 700px)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.4, ease: EASE_CINEMATIC }}
      >
        <img
          src={STATIC.cathedral}
          alt="Architectural atmosphere"
          className="w-full h-full object-cover"
          style={{ display: "block" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)" }}
        />
        <div className="absolute bottom-8 left-[clamp(28px,6vw,96px)]">
          <p
            className="m-0 uppercase tracking-[0.22em]"
            style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", fontFamily: SANS }}
          >
            Gravity Architecture Studio — {project.year}
          </p>
        </div>
      </motion.div> */}

      {/* ════════════════════════════════════════════════════════════════════
          PROJECT NAVIGATION — prev / next
      ════════════════════════════════════════════════════════════════════ */}
      <div className="px-[clamp(28px,6vw,96px)]" style={{ paddingTop: 0 }}>
        <Divider className="mt-0" />
        <div className="flex justify-between items-center py-10">
          {/* Prev */}
          <motion.button
            className="group flex items-center gap-5 bg-transparent border-none cursor-pointer p-0 text-left"
            onClick={() => navigate(`/project/${prevProject.id}`)}
            whileHover={{ x: -5 }}
            transition={{ duration: 0.25, ease: EASE_SMOOTH }}
          >
            <div
              style={{
                width: 38, height: 38,
                border: "0.5px solid #ddd",
                borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.25s, border-color 0.25s",
              }}
              className="group-hover:bg-black group-hover:border-black transition-all"
            >
              <ArrowLeft size={13} strokeWidth={1.5} color="#999" className="group-hover:!text-white" />
            </div>
            <div>
              <p className="m-0 mb-1.5 uppercase tracking-[0.22em]" style={{ fontSize: 8, color: "#ccc", fontFamily: SANS }}>Previous</p>
              <p className="m-0" style={{ fontSize: 14, color: "#444", fontFamily: SERIF, fontWeight: 300, letterSpacing: "0.01em" }}>
                {prevProject.title}
              </p>
            </div>
          </motion.button>

          <Link
            to="/projects"
            className="no-underline uppercase tracking-[0.22em] transition-opacity hover:opacity-50"
            style={{ fontSize: 9, color: "#ccc", fontFamily: SANS }}
          >
            All Projects
          </Link>

          {/* Next */}
          <motion.button
            className="group flex items-center gap-5 bg-transparent border-none cursor-pointer p-0 text-right"
            onClick={() => navigate(`/project/${nextProject.id}`)}
            whileHover={{ x: 5 }}
            transition={{ duration: 0.25, ease: EASE_SMOOTH }}
          >
            <div className="text-right">
              <p className="m-0 mb-1.5 uppercase tracking-[0.22em]" style={{ fontSize: 8, color: "#ccc", fontFamily: SANS }}>Next</p>
              <p className="m-0" style={{ fontSize: 14, color: "#444", fontFamily: SERIF, fontWeight: 300, letterSpacing: "0.01em" }}>
                {nextProject.title}
              </p>
            </div>
            <div
              style={{
                width: 38, height: 38,
                background: "#111",
                borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "none",
                transition: "opacity 0.25s",
              }}
              className="group-hover:opacity-70"
            >
              <ArrowRight size={13} strokeWidth={1.5} color="#fff" />
            </div>
          </motion.button>
        </div>
        <Divider />
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          FOOTER CTA
      ════════════════════════════════════════════════════════════════════ */}
      <div
        className="flex flex-col items-center justify-center text-center"
        style={{ padding: "clamp(100px,14vw,180px) clamp(28px,6vw,96px)" }}
      >
        <SlideUp>
          <h2
            className="m-0"
            style={{
              fontSize: "clamp(36px, 5.5vw, 76px)",
              fontWeight: 300,
              fontFamily: SERIF,
              color: "#0a0a0a",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Start the conversation
          </h2>
        </SlideUp>
        <FadeUp delay={0.15}>
          <p
            className="m-0 mt-5"
            style={{ fontSize: "clamp(13px, 1.1vw, 15px)", color: "#aaa", fontWeight: 300, fontFamily: SANS, letterSpacing: "0.02em" }}
          >
            Every great building begins with a conversation
          </p>
        </FadeUp>
        <FadeUp delay={0.25} className="mt-10">
          <Link
            to="/contact"
            className="no-underline inline-flex items-center gap-4 uppercase tracking-[0.22em] transition-opacity hover:opacity-50"
            style={{
              fontSize: 10,
              color: "#111",
              fontFamily: SANS,
              borderBottom: "0.5px solid #111",
              paddingBottom: 3,
            }}
          >
            Get in touch
          </Link>
        </FadeUp>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════════════════════════════ */}
      <footer className="px-[clamp(28px,6vw,96px)] pb-10">
        <Divider className="mb-7" />
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="no-underline uppercase tracking-[0.2em] transition-opacity hover:opacity-40"
            style={{ fontSize: 10, color: "#888", fontFamily: SANS }}
          >
            Gravity
          </Link>
          <div className="flex items-center gap-8">
            {["Imprint", "Privacy"].map((label) => (
              <a
                key={label}
                href="#"
                className="no-underline uppercase tracking-[0.18em] transition-opacity hover:opacity-50"
                style={{ fontSize: 9, color: "#ccc", fontFamily: SANS }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}