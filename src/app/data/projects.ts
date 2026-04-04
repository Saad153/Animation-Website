import jinnahAerial from "@/assets/fe7c436dbcda8afd381392cfcd6639d0c94349bc.png";
import jinnahNight   from "@/assets/5d5179836a3dc3bd68c1c31ea82c64911df76586.png";
import jinnahSite    from "@/assets/7614ccce12f7d22c2945bf816a70004963816937.png";

import pearlNight    from "@/assets/6add05817dfda4fcb1eea94226150f85fa6f8aaf.png";
import pearlGate     from "@/assets/d904eb6644b26f621312f75f1150adba64e4e1cd.png";
import pearlAerial   from "@/assets/e56d2a8702d733d2b164803518778164319747e6.png";
import pearlMaster   from "@/assets/c6a16e0c36127968de196da5db374fbaaf2e578f.png";

import dhaSunset     from "@/assets/e0034d139ea3b04423620fccffb2677d5d20d566.png";
import dhaBirdsEye   from "@/assets/bb13b321df0cdaa668c1ee46fcfb0248f3ac2d0e.png";
import dhaSite       from "@/assets/b1ad32a761afe98f2e3c93b14abb88c87455bfe7.png";

// Project 4 — G+14 Askari Block 130
import askariRender  from "@/assets/a35c08468163fa9dc0d1871006cc1e08bcb48f9e.png";
import askariPhoto   from "@/assets/81fd1d357b221b52c6a9f17d0df5f6c5d8721018.png";

// Project 5 — DHA Enclave Highrise
import dhaEnclaveHero from "@/assets/09d0d22780ebe0c3ad49ef060d2aca3119dc4bb7.png";

// Project 6 — G+18 Askari Block 18A
import askari18aFront  from "@/assets/ef1bca31f3087b65b1c6af961c22229a30517c5c.png";
import askari18aStreet from "@/assets/4859b3b2f408f91a882e750efbe3cc87609bc2af.png";

// Project 7 — G+18 Askari Block 7 & 11
import askari711Render from "@/assets/2e8c9d3309b8e3e58d8d00faa794f7f65a636784.png";

// Project 8 — G+18 Askari Block 10 & 12
import askari1012Evening  from "@/assets/df217dc95983a8b88bf39091e14445fe0cc52434.png";
import askari1012Site1    from "@/assets/396cec0da9cbf8450efb61578e8273316673af68.png";
import askari1012Night    from "@/assets/1aa6d0725f65e00cc9d0b255dfbc2352cbeb0ea3.png";
import askari1012Site2    from "@/assets/68bf9918a70e88f2507fd991344ff8aa0babcb5f.png";

// Project 9 — Embassy Gardens G+3
import embassyCompleted   from "@/assets/a8b07d4d7114f6131ebaa11e8c1371701fa94a93.png";
import embassyConstruction from "@/assets/f70e153bdb1a364f964c480487c807305713281b.png";

// Project 10 — Malir G+14 Jinnah Boulevard
import malirAerial        from "@/assets/27dcbce900ba5c921a3bf91389d0ea1597fc7542.png";
import malirConstruction  from "@/assets/ad25a5b0ce14e7dbc2bb669caa37a1981c672522.png";

// Project 11 — Cyber Command, Air Headquarters
import cyberExterior      from "@/assets/fdca48499e55dcb74fa40cbb5f9bee2494dbad9d.png";
import cyberRender        from "@/assets/632fcbe2413eb2351b52bbf8b44a4956615066ba.png";
import cyberLobby         from "@/assets/0ba821698482d0a8f11cd01056a5597811171651.png";
import cyberAtrium        from "@/assets/137dd2a9779e1d9657cb57203ef12250661cea74.png";
import cyberConstruction  from "@/assets/3221dfd860f2581c3b61802235c4366e3931227e.png";

// Project 12 — Gravity Tower 1 G+21
import gravityTower1Night       from "@/assets/6d7e66940bebc0cab8a432d5e6707b65e1a5c8ae.png";
import gravityTower1Construction from "@/assets/7791e506d5a18a0753ad8380f4432effc5b2828c.png";
import gravityTower1Day         from "@/assets/15e205cbe59271f70ac142f75736004114a026ba.png";

// Project 13 — PAF Chalet Mountain Resort
import pafChaletExterior      from "@/assets/020fc8f9c34c12665429860cbdef1feb0c1a555d.png";
import pafChaletInterior      from "@/assets/9c012596a4e5f2c06ae5f781849d297a575425bf.png";
import pafChaletHillside      from "@/assets/3e1a3d4e73b598fd8d58ed65309af26183b92660.png";
import pafChaletConstruction  from "@/assets/febff86619dda63e27ce2a5f71979b193f1452d2.png";
import pafChaletRestaurant    from "@/assets/89c70f4bea1afeac8168cb2d157428484c70695f.png";

// Project 14 — PAF PAFVOM 52 Suites
import pafVfomAerial    from "@/assets/89f81c652f2e9f13876e822dd6938385b3bb96b2.png";
import pafVfomEntrance  from "@/assets/a69fcac697524958699441c33414e8339ff97c50.png";
import pafVfomFront     from "@/assets/52bc6d7b4898187277b1fbc9dbe83b10faa34b6f.png";
import pafVfomLobby     from "@/assets/5cad965d2ab39db9383cd6eca476d0c240180897.png";

export interface Project {
  id: string;
  title: string;
  location: string;
  year: string;
  category: string;
  status: string;
  area: string;
  image: string;
  description: string;
  images: string[];
  tileStyle: {
    width: number;
    height: number;
    top: string;
    left: string;
    rotate: number;
  };
}

export const projects: Project[] = [
  {
    id: "jinnah-askari-ii",
    title: "G+24 Jinnah Askari II Apartment Towers",
    location: "Karachi, Pakistan",
    year: "2025",
    category: "High Rise Buildings",
    status: "Under Construction",
    area: "1 Acre",
    image: jinnahAerial,
    description:
      "Built on a narrow and long plot, this apartment building consists of four towers. The buildings consist of high and low towers, giving them a unique identity. The building has world class amenities and generous parking both above and below ground.",
    images: [jinnahNight, jinnahSite],
    tileStyle: { width: 280, height: 200, top: "8%", left: "5%", rotate: -2 },
  },
  {
    id: "pearl-towers",
    title: "Pearl Towers G+29",
    location: "Lahore, Pakistan",
    year: "2025",
    category: "High Rise Buildings",
    status: "Under Construction",
    area: "70 Kanal",
    image: pearlNight,
    description:
      "This 6-tower complex in Lahore consists of 4 and 3 bed apartments, with a central communal garden and a mosque. It has several amenities like gyms, swimming pools, pharmacy, and salon built into its podium. A large steel winged form gate greets visitors into this beautiful complex.",
    images: [pearlGate, pearlAerial, pearlMaster],
    tileStyle: { width: 260, height: 220, top: "12%", left: "48%", rotate: 1.5 },
  },
  {
    id: "dha4-islamabad",
    title: "G+15 Apartment Towers DHA-4",
    location: "Islamabad, Pakistan",
    year: "2025",
    category: "High Rise Buildings",
    status: "Under Construction",
    area: "76.78 Kanal",
    image: dhaSunset,
    description:
      "These oval residential towers in Islamabad are designed to be built on a cliff edge, with dramatic views of the valley below. The fluid, organic form of each tower responds to the natural topography, curving gently to maximise the panoramic vistas across Islamabad's hills.",
    images: [dhaBirdsEye, dhaSite],
    tileStyle: { width: 270, height: 210, top: "5%", left: "72%", rotate: -1 },
  },
  {
    id: "askari-block-130",
    title: "G+14 Askari Block 130 Apartment Towers",
    location: "Karachi, Pakistan",
    year: "2024",
    category: "High Rise Buildings",
    status: "Completed",
    area: "Askari 5",
    image: askariRender,
    description:
      "Built in Askari 5 Karachi on an odd-shaped plot, this tower is a study in customised design — each apartment layout is unique and individual, shaped by the geometry of the land. The apartments are spacious, offering residents every facility of a home, with generous floor areas, space and light.",
    images: [askariPhoto],
    tileStyle: { width: 260, height: 195, top: "10%", left: "22%", rotate: 1 },
  },
  {
    id: "dha-enclave-highrise",
    title: "DHA Enclave Highrise",
    location: "Karachi, Pakistan",
    year: "2026",
    category: "High Rise Buildings",
    status: "Upcoming Project",
    area: "—",
    image: dhaEnclaveHero,
    description:
      "A landmark mixed-use development composed of four towers — two residential sea-facing and two commercial — all currently in the design phase. The complex is set to redefine Karachi's waterfront skyline with a bold architectural language of curved glazed facades and cascading green terraces.",
    images: [dhaEnclaveHero],
    tileStyle: { width: 290, height: 215, top: "8%", left: "60%", rotate: -1.5 },
  },
  {
    id: "askari-block-18a",
    title: "G+18 Askari Block 18A Apartment Tower",
    location: "Karachi, Pakistan",
    year: "2025",
    category: "High Rise Buildings",
    status: "Under Construction",
    area: "Askari 5",
    image: askari711Render,
    description:
      "A very angular small plot provided an exciting opportunity for a luxury 3-bed apartment design, with 2 apartments per floor, each overlooking the verdant Askari Park. The tower's sharp geometric form is a direct response to the site's boundaries, turning constraint into character.",
    images: [askari18aFront],
    tileStyle: { width: 255, height: 200, top: "9%", left: "35%", rotate: -0.5 },
  },
  {
    id: "askari-block-7-11",
    title: "G+18 Askari Block 7 & 11 Apartment Towers",
    location: "Karachi, Pakistan",
    year: "2025",
    category: "High Rise Buildings",
    status: "Under Construction",
    area: "Askari 5",
    image: askari18aStreet,
    description:
      "These two towers with similar footprints are built on a narrow triangular site, accommodating three spacious 3-bed apartments per floor. Each apartment enjoys generous terraces wrapping all around, flooding every room with light and open sky. The twin towers share a bold central latticed core that becomes the development's defining architectural signature.",
    images: [askari18aStreet],
    tileStyle: { width: 275, height: 210, top: "6%", left: "80%", rotate: 1 },
  },
  {
    id: "askari-block-10-12",
    title: "G+18 Askari Block 10 & 12 Apartment Towers",
    location: "Lahore, Pakistan",
    year: "2025",
    category: "High Rise Buildings",
    status: "Under Construction",
    area: "Askari 11",
    image: askari1012Evening,
    description:
      "These two towers with similar floor plans rise majestically in Askari 11, at the heart of Lahore. Their envelope is designed to accommodate an enviable suite of resident amenities — swimming pool, gym, and lounges — all woven seamlessly into the building's vertical fabric, delivering a self-sufficient urban lifestyle in one of Lahore's most prestigious addresses.",
    images: [askari1012Night, askari1012Site1, askari1012Site2],
    tileStyle: { width: 270, height: 205, top: "7%", left: "15%", rotate: -1.5 },
  },
  {
    id: "embassy-gardens",
    title: "Embassy Gardens G+3",
    location: "Bahria Town, Islamabad",
    year: "2023",
    category: "Residential",
    status: "Completed",
    area: "Bahria Town",
    image: embassyCompleted,
    description:
      "This classic low-rise building in Bahria Town, Islamabad, features retail on the ground floor with three floors of apartments above. Its elegantly composed classical facade — arched colonnades at the base, articulated bays with wrought-iron balconies above — proved so compelling that Bahria Town authorities mandated its elevation as the design template for all neighbouring buildings along the boulevard.",
    images: [embassyConstruction],
    tileStyle: { width: 260, height: 200, top: "8%", left: "45%", rotate: 0.5 },
  },
  {
    id: "malir-jinnah-boulevard",
    title: "Malir G+14 Jinnah Boulevard",
    location: "Karachi, Pakistan",
    year: "2026",
    category: "High Rise Buildings",
    status: "Under Construction",
    area: "4 Acres",
    image: malirAerial,
    description:
      "A complex of eight apartment towers of varying heights set within a 4-acre gated site in Malir, Karachi. Playful coloured bay windows punctuate the white facades, giving the development a vibrant, residential character unlike the typical high-rise. A full suite of amenities is woven into the complex, with commercial frontage anchoring the main entrance boulevard.",
    images: [malirConstruction],
    tileStyle: { width: 300, height: 215, top: "5%", left: "55%", rotate: -1 },
  },
  {
    id: "cyber-command-ahq",
    title: "Cyber Command at Air Headquarters",
    location: "Islamabad, Pakistan",
    year: "2024",
    category: "Commercial Buildings",
    status: "Completed",
    area: "AHQ Complex",
    image: cyberExterior,
    description:
      "Originally two separate structures, the PAF Cyber Command Complex was unified through a strategic facade redesign and the addition of a central courtyard. Clad in Aluminum Composite Panels to match the surrounding Air Headquarters, the building integrates seamlessly into the existing institutional landscape while delivering a bold, technologically expressive interior.",
    images: [cyberRender, cyberLobby, cyberAtrium, cyberConstruction],
    tileStyle: { width: 280, height: 210, top: "8%", left: "30%", rotate: 0.5 },
  },
  {
    id: "gravity-tower-1",
    title: "Gravity Tower 1 G+21",
    location: "Clifton, Karachi",
    year: "2026",
    category: "Commercial Buildings",
    status: "Under Construction",
    area: "2000 Sq Yards",
    image: gravityTower1Night,
    description:
      "Standing in the heart of the city, this three-sided glass office tower features stepped terraces and expansive windows offering stunning sea views. The building boasts world-class finishes and architecture, while a decorative metal screen seamlessly integrates into the elevation to disguise the above-ground parking levels.",
    images: [gravityTower1Day, gravityTower1Construction],
    tileStyle: { width: 265, height: 215, top: "6%", left: "68%", rotate: -1 },
  },
  {
    id: "paf-chalet-resort",
    title: "PAF Chalet Mountain Resort",
    location: "Kalabagh, Pakistan",
    year: "2026",
    category: "Hospitality",
    status: "Under Construction",
    area: "4 Acres",
    image: pafChaletHillside,
    description:
      "This beautiful resort has chalets that are prefab metal structures, erected at site. The main buildings house the restaurants while the chalets are 2- and 3-bedroom buildings with full kitchen, lounge and terraces to enjoy the breathtaking mountain views.",
    images: [pafChaletExterior, pafChaletInterior, pafChaletRestaurant, pafChaletConstruction],
    tileStyle: { width: 285, height: 210, top: "7%", left: "42%", rotate: 1.5 },
  },
  {
    id: "paf-vfom-52-suites",
    title: "PAF PAFVOM 52 Suites",
    location: "Malir, Karachi",
    year: "2024",
    category: "Hospitality",
    status: "Completed",
    area: "—",
    image: pafVfomFront,
    description:
      "A G+1 hospitality complex featuring 52 self-contained suites with kitchens and dining spaces, set amidst lush fruit gardens and private courtyards. The traditional European façade, colonnaded entrance portico, and serene internal courtyards create a retreat of quiet elegance within Karachi.",
    images: [pafVfomAerial, pafVfomEntrance, pafVfomLobby],
    tileStyle: { width: 280, height: 205, top: "9%", left: "25%", rotate: -1 },
  },
];