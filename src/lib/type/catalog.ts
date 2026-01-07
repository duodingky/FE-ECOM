export type pCategory = Record<string, unknown> & {
  id?: string | number;
  categoryName: string;
  imageUrl: string;
  parentId: string;
};

export type pProducts= {
  id: string;
  productName: string;
  categoryName : string;
  brandName: string;
  imageUrl: string;
  shortDesc:  string;
  longDesc:  string;
  parentId: string;
  price: number
};