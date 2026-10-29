export interface Item {
  id: number;
  name: string;
  quantity: number;
  purchased: boolean;
  createdAt: string; 
}

export interface CreateItemInput {
  name: string;
  quantity?: number;  
  purchased?: boolean; 
}