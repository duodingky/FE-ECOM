export type pCategory = Record<string, unknown> & {
  id?: string | number;
  categoryName: string;
  imageUrl: string;
  parentId: string;
  children: []
};


export type Category = {
  id?: string | number;
  categoryName: string;
  imageUrl: string;
  parentId: string;
  children: []
};

export type pProducts= {
  id: string;
  sku?: string;
  productName: string;
  categoryName : string;
  brandName: string;
  imageUrl: string;
  shortDesc:  string;
  longDesc:  string;
  parentId: string;
  price: number
};

export type BannerImg= {
  formats : {
     "large":{url:string},
     "medium":{url:string},
     "small":{url:string},
  }

}

export type HomePageBanners= {
  id: string;
  link: string;
  shortDesc : string;
  bannerImg: BannerImg;
};

export type pBrand = {
  id: string;
  link: string;
  brandName : string;
  shortDesc : string;
  bannerImg: BannerImg;
};

export type CartProducts= {
    amount: number ;
    brandId:string
    brandName: string;  
    categoryId: string;
    categoryName: string;
    id  :number;  
    price: number;
    productId: string;
    productName : string;
    quantity: number;
    sku: string;
    unitPrice: number
    shortDesc: string;
    imageUrl: string;
};