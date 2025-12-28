export interface Product {
  id: string;
  name: string;
  category: 'Repellents' | 'Syrups' | 'Oils';
  price: number;
  image: string;
  description: string;
  benefits?: string[];
  ingredients?: string[];
  isNew?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export type OrderStatus = 'Placed' | 'Packed' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  paymentMethod: 'UPI' | 'Card' | 'COD';
  paymentId?: string;
  trackingId?: string;
  deliveryPartner?: string;
  estimatedDelivery?: string;
}

export interface Testimonial {
  id: number;
  text: string;
  author: string;
  role: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
}

export interface JobPosition {
  id: number;
  title: string;
  type: string;
  location: string;
}