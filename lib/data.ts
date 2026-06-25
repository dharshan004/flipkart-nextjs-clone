import { Category, Product } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'mobiles',
    name: 'Mobiles',
    icon: 'smartphone',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'fashion',
    name: 'Fashion',
    icon: 'checkroom',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'electronics',
    name: 'Electronics',
    icon: 'laptop_mac',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'appliances',
    name: 'Appliances',
    icon: 'kitchen',
    image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'grocery',
    name: 'Grocery',
    icon: 'shopping_basket',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'toys',
    name: 'Toys & More',
    icon: 'toys',
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=150&auto=format&fit=crop&q=80'
  }
];

export const BANNERS = [
  {
    id: '1',
    title: 'Big Billion Days Sale - Up to 80% Off',
    subtitle: 'On Flagship Smartphones & Laptops',
    bg: 'from-[#0056c3] to-[#1f6feb]',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&auto=format&fit=crop&q=80',
    tag: 'LIMITED TIME DEAL'
  },
  {
    id: '2',
    title: 'Fashion Mega Wardrobe Rush',
    subtitle: 'Top Brands starting @ ₹499',
    bg: 'from-[#0b6b1d] to-[#2e8534]',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=80',
    tag: 'MIN 60% OFF'
  },
  {
    id: '3',
    title: 'Smart Home & QLED TVs',
    subtitle: 'No Cost EMI + Exchange Offers',
    bg: 'from-[#695f00] to-[#dbc90a]',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format&fit=crop&q=80',
    tag: 'NEW LAUNCH'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'iphone-15-pro-max',
    title: 'Apple iPhone 15 Pro Max (256 GB) - Natural Titanium',
    category: 'mobiles',
    rating: 4.8,
    reviewsCount: 14250,
    price: 148900,
    originalPrice: 159900,
    discount: 6,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    fastDelivery: true,
    assured: true,
    badge: 'Bestseller',
    highlights: [
      '256 GB ROM | A17 Pro Chip with 6-core GPU',
      '17.02 cm (6.7 inch) Super Retina XDR Display',
      '48MP + 12MP + 12MP | 12MP Front Camera',
      'Aerospace-grade Titanium Design',
      'USB-C with USB 3 support for 20x faster transfers'
    ],
    specs: {
      'Brand': 'Apple',
      'Model Name': 'iPhone 15 Pro Max',
      'Color': 'Natural Titanium',
      'Operating System': 'iOS 17',
      'Cellular Technology': '5G'
    },
    description: 'Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever. Experience ProMotion technology and All-Day battery life.'
  },
  {
    id: 'samsung-s24-ultra',
    title: 'Samsung Galaxy S24 Ultra 5G (512 GB) - Titanium Gray',
    category: 'mobiles',
    rating: 4.7,
    reviewsCount: 8940,
    price: 129999,
    originalPrice: 139999,
    discount: 7,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    fastDelivery: true,
    assured: true,
    badge: 'Top Rated',
    highlights: [
      '512 GB ROM | 12 GB RAM | Snapdragon 8 Gen 3',
      '17.27 cm (6.8 inch) QHD+ Dynamic AMOLED 2X Display',
      '200MP + 50MP + 12MP + 10MP | 12MP Front Camera',
      'Integrated S Pen with Live Translate & Circle to Search',
      '5000 mAh Battery with Super Fast Charging'
    ],
    specs: {
      'Brand': 'Samsung',
      'Model Name': 'Galaxy S24 Ultra',
      'Color': 'Titanium Gray',
      'Processor': 'Snapdragon 8 Gen 3',
      'Display Resolution': '3120 x 1440 Pixels'
    },
    description: 'Welcome to the era of mobile AI. With Galaxy S24 Ultra in your hands, you can unleash whole new levels of creativity, productivity and possibility — starting with the most important device in your life.'
  },
  {
    id: 'sony-wh1000xm5',
    title: 'Sony WH-1000XM5 Wireless Active Noise Cancelling Headphones',
    category: 'electronics',
    rating: 4.6,
    reviewsCount: 5320,
    price: 26990,
    originalPrice: 34990,
    discount: 22,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    fastDelivery: true,
    assured: true,
    badge: 'Deal of the Day',
    highlights: [
      'Industry Leading Noise Cancellation with 8 microphones',
      'Auto NC Optimizer automatically optimizes noise cancelling based on wearing conditions',
      'Up to 30-hour battery life with quick charging (3 min charge for 3 hours of playback)',
      'Ultra comfortable, lightweight design with soft fit leather'
    ],
    specs: {
      'Brand': 'Sony',
      'Headphone Type': 'Over the Ear',
      'Connectivity': 'Bluetooth 5.2 / Wired',
      'Battery Life': '30 Hours'
    },
    description: 'The WH-1000XM5 headphones rewrite the rules for distraction-free listening. Two processors control 8 microphones for unprecedented noise cancellation and exceptional call quality.'
  },
  {
    id: 'oneplus-nord-ce4',
    title: 'OnePlus Nord CE 4 5G (8GB RAM, 128GB Storage) - Celadon Marble',
    category: 'mobiles',
    rating: 4.4,
    reviewsCount: 3890,
    price: 24999,
    originalPrice: 26999,
    discount: 7,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    fastDelivery: true,
    assured: true,
    highlights: [
      'Qualcomm Snapdragon 7 Gen 3 Processor',
      '100W SUPERVOOC Fast Charging (1-100% in 29 mins)',
      '5500 mAh Monster Battery',
      '120Hz AMOLED Display with Aqua Touch'
    ],
    specs: {
      'Brand': 'OnePlus',
      'RAM': '8 GB',
      'Storage': '128 GB',
      'Battery': '5500 mAh'
    },
    description: 'All power. All day. Powered by Snapdragon 7 Gen 3 and massive 5500 mAh battery with 100W charging.'
  },
  {
    id: 'nike-air-max-270',
    title: 'Nike Air Max 270 Men Running Shoes - Black/White',
    category: 'fashion',
    rating: 4.3,
    reviewsCount: 2110,
    price: 8995,
    originalPrice: 12995,
    discount: 30,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    fastDelivery: true,
    assured: true,
    badge: 'Special Price',
    highlights: [
      'Max Air 270 unit delivers unrivaled, all-day comfort',
      'Woven and synthetic fabric on upper provides lightweight fit',
      'Foam midsole feels soft and comfortable',
      'Stretchy inner sleeve creates a personalized fit'
    ],
    specs: {
      'Brand': 'Nike',
      'Type': 'Running Shoes',
      'Outer Material': 'Mesh / Synthetic',
      'Sole Material': 'Rubber'
    },
    description: 'Legendary Nike cushioning meets slick modern streetwear aesthetic. Built for athletic performance and daily casual comfort.'
  },
  {
    id: 'mi-x-series-4k-tv',
    title: 'Mi X Series 126 cm (50 inch) Ultra HD (4K) LED Smart Android TV with Dolby Vision',
    category: 'appliances',
    rating: 4.5,
    reviewsCount: 6840,
    price: 31999,
    originalPrice: 44999,
    discount: 28,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    fastDelivery: false,
    assured: true,
    highlights: [
      'Resolution: Ultra HD (4K) 3840 x 2160 Pixels | 60Hz',
      'Sound Output: 30W Dolby Audio & DTS-X',
      'Smart TV Features: Google TV, Built-in Chromecast, PatchWall',
      'Connectivity: 3 HDMI Ports, 2 USB Ports, Dual Band Wi-Fi'
    ],
    specs: {
      'Brand': 'Mi',
      'Screen Size': '50 Inch',
      'Resolution': '4K Ultra HD',
      'Smart TV': 'Yes (Google TV)'
    },
    description: 'Immerse yourself in cinematic visuals with vivid 4K Dolby Vision screen and punchy 30W stereo acoustics.'
  },
  {
    id: 'asus-rog-zephyrus',
    title: 'ASUS ROG Zephyrus G14 Gaming Laptop (Ryzen 9 Octa Core, 16GB, 1TB SSD, RTX 4060)',
    category: 'electronics',
    rating: 4.8,
    reviewsCount: 1190,
    price: 145990,
    originalPrice: 189990,
    discount: 23,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    fastDelivery: true,
    assured: true,
    highlights: [
      'AMD Ryzen 9 Octa Core 7940HS Processor',
      'NVIDIA GeForce RTX 4060 (8GB GDDR6)',
      '14-inch ROG Nebula Display QHD+ 165Hz',
      'AniMe Matrix LED Lid & Liquid Metal Cooling'
    ],
    specs: {
      'Brand': 'ASUS',
      'Series': 'ROG Zephyrus',
      'RAM': '16 GB DDR5',
      'Storage': '1 TB PCIe 4.0 SSD'
    },
    description: 'Ultra slim, ultra lightweight powerhouse designed for hardcore gaming and intensive creative workflows on the move.'
  },
  {
    id: 'puma-motorsport-jacket',
    title: 'Puma BMW M Motorsport Men Full Sleeve Zip Jacket',
    category: 'fashion',
    rating: 4.2,
    reviewsCount: 840,
    price: 3499,
    originalPrice: 6999,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80'
    ],
    inStock: true,
    fastDelivery: true,
    assured: false,
    badge: '50% OFF',
    highlights: [
      'Official BMW M Motorsport branding branding insignia',
      'Regular fit with full zip closure and stand-up collar',
      'Moisture-wicking dryCELL technology',
      'Dual side zip pockets'
    ],
    specs: {
      'Brand': 'Puma',
      'Fabric': 'Polyester',
      'Sleeve': 'Full Sleeve',
      'Fit': 'Regular'
    },
    description: 'Rev up your street style with this authentic BMW M Motorsport track jacket engineered for speed enthusiasts.'
  }
];
