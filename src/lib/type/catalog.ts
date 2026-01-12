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