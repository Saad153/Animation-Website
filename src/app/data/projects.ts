export interface Project {
  id: string;
  title: string;
  location: string;
  year: string;
  category: string;
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
    id: "villa-nova",
    title: "Villa Nova",
    location: "Rotterdam, Netherlands",
    year: "2024",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1699791910411-6c9ea7f47b3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBidWlsZGluZyUyMGZhY2FkZXxlbnwxfHx8fDE3NzQ4Nzg5OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "A striking residential complex that redefines urban living through bold geometric forms and sustainable design principles. The building's facade features a dynamic interplay of glass and concrete, creating a landmark presence in Rotterdam's evolving skyline.",
    images: [
      "https://images.unsplash.com/photo-1699791910411-6c9ea7f47b3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBidWlsZGluZyUyMGZhY2FkZXxlbnwxfHx8fDE3NzQ4Nzg5OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1602872029708-84d970d3382b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBhcmNoaXRlY3R1cmUlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzQ3ODQxMTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    tileStyle: { width: 280, height: 200, top: "8%", left: "5%", rotate: -2 },
  },
  {
    id: "the-edge",
    title: "The Edge",
    location: "Amsterdam, Netherlands",
    year: "2023",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1602872029708-84d970d3382b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBhcmNoaXRlY3R1cmUlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzQ3ODQxMTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "An innovative office building recognized as the world's most sustainable workspace. The Edge harnesses natural light and smart technology to create an environment that adapts to its occupants.",
    images: [
      "https://images.unsplash.com/photo-1602872029708-84d970d3382b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBhcmNoaXRlY3R1cmUlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzQ3ODQxMTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1662075024396-9f9348262b8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGFyY2hpdGVjdHVyZSUyMHNreXNjcmFwZXJ8ZW58MXx8fHwxNzc0ODk2MjE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    tileStyle: { width: 220, height: 320, top: "5%", left: "30%", rotate: 1 },
  },
  {
    id: "sky-tower",
    title: "Sky Tower",
    location: "Dubai, UAE",
    year: "2025",
    category: "Mixed Use",
    image: "https://images.unsplash.com/photo-1662075024396-9f9348262b8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGFyY2hpdGVjdHVyZSUyMHNreXNjcmFwZXJ8ZW58MXx8fHwxNzc0ODk2MjE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "A soaring mixed-use tower that combines luxury residences, office spaces, and a public sky garden. The building's twisting form reduces wind load while maximizing panoramic views of the city.",
    images: [
      "https://images.unsplash.com/photo-1662075024396-9f9348262b8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGFyY2hpdGVjdHVyZSUyMHNreXNjcmFwZXJ8ZW58MXx8fHwxNzc0ODk2MjE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1744148621897-5fb0b6323543?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwY29uY3JldGUlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzc0ODgyOTYxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    tileStyle: { width: 240, height: 180, top: "2%", left: "60%", rotate: -1 },
  },
  {
    id: "concrete-pavilion",
    title: "Concrete Pavilion",
    location: "Tokyo, Japan",
    year: "2023",
    category: "Cultural",
    image: "https://images.unsplash.com/photo-1744148621897-5fb0b6323543?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwY29uY3JldGUlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzc0ODgyOTYxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "A meditative cultural pavilion carved from raw concrete, blending Japanese minimalism with Dutch precision. Light enters through carefully calculated openings, creating an ever-changing interior landscape.",
    images: [
      "https://images.unsplash.com/photo-1744148621897-5fb0b6323543?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwY29uY3JldGUlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzc0ODgyOTYxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1520073220816-469094c16514?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwZGV0YWlsJTIwZ2VvbWV0cmljfGVufDF8fHx8MTc3NDg5NjIyMHww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    tileStyle: { width: 300, height: 220, top: "40%", left: "2%", rotate: 2 },
  },
  {
    id: "geometric-house",
    title: "Geometric House",
    location: "Copenhagen, Denmark",
    year: "2024",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1520073220816-469094c16514?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwZGV0YWlsJTIwZ2VvbWV0cmljfGVufDF8fHx8MTc3NDg5NjIyMHww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "A private residence that explores the tension between orthogonal and organic forms. The home's angular exterior conceals fluid, open interiors that flow seamlessly into a landscaped courtyard.",
    images: [
      "https://images.unsplash.com/photo-1520073220816-469094c16514?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwZGV0YWlsJTIwZ2VvbWV0cmljfGVufDF8fHx8MTc3NDg5NjIyMHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1758448756880-01dbaf85597d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXNpZGVuY2UlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzc0ODk2MjIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    tileStyle: { width: 200, height: 280, top: "35%", left: "35%", rotate: -1.5 },
  },
  {
    id: "lakeside-retreat",
    title: "Lakeside Retreat",
    location: "Zurich, Switzerland",
    year: "2022",
    category: "Hospitality",
    image: "https://images.unsplash.com/photo-1758448756880-01dbaf85597d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXNpZGVuY2UlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzc0ODk2MjIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "A luxury hotel nestled along the shores of Lake Zurich, where architecture dissolves into nature. Floor-to-ceiling glazing frames alpine views while the building's low profile respects the landscape.",
    images: [
      "https://images.unsplash.com/photo-1758448756880-01dbaf85597d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXNpZGVuY2UlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzc0ODk2MjIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1685352212233-76a91e443bb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNldW0lMjBhcmNoaXRlY3R1cmUlMjBtb2Rlcm58ZW58MXx8fHwxNzc0Nzc5MDc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    tileStyle: { width: 260, height: 190, top: "38%", left: "65%", rotate: 1.5 },
  },
  {
    id: "arts-center",
    title: "Arts Center",
    location: "Oslo, Norway",
    year: "2024",
    category: "Cultural",
    image: "https://images.unsplash.com/photo-1685352212233-76a91e443bb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNldW0lMjBhcmNoaXRlY3R1cmUlMjBtb2Rlcm58ZW58MXx8fHwxNzc0Nzc5MDc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "A contemporary arts center that challenges convention with its bold cantilevers and subterranean galleries. The building serves as both museum and public plaza, inviting the city inside.",
    images: [
      "https://images.unsplash.com/photo-1685352212233-76a91e443bb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNldW0lMjBhcmNoaXRlY3R1cmUlMjBtb2Rlcm58ZW58MXx8fHwxNzc0Nzc5MDc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1651644949986-bf52159f77b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMGJ1aWxkaW5nJTIwYXJjaGl0ZWN0dXJlJTIwbmlnaHR8ZW58MXx8fHwxNzc0ODk2MjIxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    tileStyle: { width: 250, height: 340, top: "55%", left: "25%", rotate: -2 },
  },
  {
    id: "glass-tower",
    title: "Glass Tower",
    location: "London, UK",
    year: "2025",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1651644949986-bf52159f77b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMGJ1aWxkaW5nJTIwYXJjaGl0ZWN0dXJlJTIwbmlnaHR8ZW58MXx8fHwxNzc0ODk2MjIxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "A crystalline office tower that reimagines the commercial high-rise as a transparent, breathable structure. Double-skin facades regulate temperature naturally while providing unobstructed city views.",
    images: [
      "https://images.unsplash.com/photo-1651644949986-bf52159f77b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMGJ1aWxkaW5nJTIwYXJjaGl0ZWN0dXJlJTIwbmlnaHR8ZW58MXx8fHwxNzc0ODk2MjIxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1769283979195-d418a41ae2ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicnV0YWxpc3QlMjBhcmNoaXRlY3R1cmUlMjBjb25jcmV0ZXxlbnwxfHx8fDE3NzQ3NzcyOTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    tileStyle: { width: 230, height: 170, top: "60%", left: "58%", rotate: 2.5 },
  },
  {
    id: "brutalist-library",
    title: "Brutalist Library",
    location: "Berlin, Germany",
    year: "2023",
    category: "Public",
    image: "https://images.unsplash.com/photo-1769283979195-d418a41ae2ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicnV0YWxpc3QlMjBhcmNoaXRlY3R1cmUlMjBjb25jcmV0ZXxlbnwxfHx8fDE3NzQ3NzcyOTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "A monumental public library that pays homage to brutalist masters while introducing contemporary warmth through timber-lined reading rooms and abundant natural light from deep-set skylights.",
    images: [
      "https://images.unsplash.com/photo-1769283979195-d418a41ae2ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicnV0YWxpc3QlMjBhcmNoaXRlY3R1cmUlMjBjb25jcmV0ZXxlbnwxfHx8fDE3NzQ3NzcyOTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1758509362549-df81e9e779c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBhcmNoaXRlY3R1cmUlMjBjYWJpbiUyMG1vZGVybnxlbnwxfHx8fDE3NzQ4OTYyMjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    tileStyle: { width: 270, height: 200, top: "70%", left: "5%", rotate: -1 },
  },
  {
    id: "forest-cabin",
    title: "Forest Cabin",
    location: "Helsinki, Finland",
    year: "2022",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1758509362549-df81e9e779c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBhcmNoaXRlY3R1cmUlMjBjYWJpbiUyMG1vZGVybnxlbnwxfHx8fDE3NzQ4OTYyMjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "A timber retreat that emerges from a Finnish forest like a natural formation. Cross-laminated timber construction minimizes environmental impact while creating warm, protective interiors against the Nordic climate.",
    images: [
      "https://images.unsplash.com/photo-1758509362549-df81e9e779c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBhcmNoaXRlY3R1cmUlMjBjYWJpbiUyMG1vZGVybnxlbnwxfHx8fDE3NzQ4OTYyMjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1699791910411-6c9ea7f47b3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBidWlsZGluZyUyMGZhY2FkZXxlbnwxfHx8fDE3NzQ4Nzg5OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    tileStyle: { width: 210, height: 300, top: "65%", left: "80%", rotate: 1 },
  },
];
