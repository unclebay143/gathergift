export interface WishlistItem {
    title: string;
    description?: string;
    image_url?: string;
    target_amount: number;
    contributed_amount?: number;
    status: 'open' | 'completed' | 'closed';
  }
  
  export interface Wishlist {
    user_id: string;
    name: string;
    occasion: string;
    items: WishlistItem[];
  }
  