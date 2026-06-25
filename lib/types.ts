export interface Product {
  id: string;
  title: string;
  category: string;
  rating: number;
  reviewsCount: number;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  images: string[];
  inStock: boolean;
  fastDelivery: boolean;
  assured: boolean;
  highlights: string[];
  specs: { [key: string]: string };
  description: string;
  badge?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FilterState {
  sortBy: 'popularity' | 'price-asc' | 'price-desc' | 'rating';
  category?: string;
  minRating?: number;
  assuredOnly?: boolean;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  pincode: string;
  locality: string;
  addressLine: string;
  city: string;
  state: string;
  type: 'HOME' | 'WORK';
  isDefault?: boolean;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  isPlusMember: boolean;
  superCoins: number;
  addresses: Address[];
}

export interface OrderItem {
  product: Product;
  quantity: number;
  priceAtPurchase: number;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  totalAmount: number;
  discountAmount: number;
  paymentMethod: 'UPI' | 'CARD' | 'NET_BANKING' | 'COD';
  paymentId: string;
  deliveryAddress: Address;
  status: 'ORDERED' | 'PACKED' | 'SHIPPED' | 'DELIVERED';
  expectedDelivery: string;
}
