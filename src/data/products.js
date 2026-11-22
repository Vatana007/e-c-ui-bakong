export const PRODUCTS = [
  {
    id: 1,
    name: "Sony WH-1000XM5",
    fullName: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    category: "Audio",
    price: 349.00,
    rating: 4.9,
    reviewsCount: 128,
    tag: "Popular",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    description: "Industry-leading noise cancellation with 30-hour battery life.",
    specs: ["30h Battery", "Auto NC Optimizer", "Multipoint Audio"],
    stock: 14,
    colors: [
      { name: "Silver", hex: "#E2E8F0" },
      { name: "Matte Black", hex: "#1E293B" }
    ]
  },
  {
    id: 2,
    name: "Apple Watch Ultra 2",
    fullName: "Apple Watch Ultra 2 GPS + Cellular 49mm Titanium",
    category: "Wearables",
    price: 799.00,
    rating: 4.8,
    reviewsCount: 94,
    tag: "Featured",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80",
    description: "Rugged 49mm titanium case with precision dual-frequency GPS.",
    specs: ["49mm Titanium", "100m Water Resistant", "3000-nit Display"],
    stock: 6,
    colors: [
      { name: "Natural Titanium", hex: "#94A3B8" },
      { name: "Ocean Orange", hex: "#F97316" },
      { name: "Trail Green", hex: "#15803D" }
    ]
  },
  {
    id: 3,
    name: "Fujifilm X100VI",
    fullName: "Fujifilm X100VI Digital Camera with 23mm f/2 Lens",
    category: "Cameras",
    price: 1599.00,
    rating: 5.0,
    reviewsCount: 215,
    tag: "Limited Stock",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80",
    description: "40.2MP compact sensor with 20 built-in film simulations.",
    specs: ["40.2MP CMOS 5 HR", "6.2K/30p Video", "6.0-stop IBIS"],
    stock: 3,
    colors: [
      { name: "Classic Silver", hex: "#CBD5E1" },
      { name: "Solid Black", hex: "#0F172A" }
    ]
  },
  {
    id: 4,
    name: "Keychron Q1 Pro",
    fullName: "Keychron Q1 Pro Wireless Custom Mechanical Keyboard",
    category: "Keyboards",
    price: 198.00,
    rating: 4.7,
    reviewsCount: 76,
    tag: "Sale",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80",
    description: "Full CNC aluminum body with hot-swappable tactile switches.",
    specs: ["Full Aluminum CNC", "QMK/VIA Support", "Bluetooth 5.1"],
    stock: 19,
    colors: [
      { name: "Carbon Black", hex: "#18181B" },
      { name: "Retro Silver", hex: "#E4E4E7" }
    ]
  }
];

export const EXCHANGE_RATE_KHR = 4100;

export const formatUSD = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
};

export const formatKHR = (amount) => {
  const khr = Math.round(amount * EXCHANGE_RATE_KHR);
  return '៛' + khr.toLocaleString('en-US');
};
