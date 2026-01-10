import {getCategories} from "@/lib/API/categories";
import Link from "next/link";
import Image from 'next/image'
export async function  CategoriesList({parent }: { parent: string  }) {
  const categories =  await getCategories(parent);
  const NumEmptyBox = 3 - categories.length  % 3;
  
  const renderEmptyBoxes =(count: number) => {
  const boxes = [];
  for (let i = 0; i < count; i++) {
    boxes.push(<div key={i}>
      <div>
         <Image
            src="/images/emptyCategory.png"
            width={500}
            height={500}
            alt="empty Category"
        />
      </div>
    </div>);
  }
  return boxes;
}

  return ( 
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {
         typeof categories === 'object' && categories.map((c) => (
          <div  key={c.id}>
            
              <Link
                key={c.categoryName}
                href={`/category/${c.categoryName}`}
                className="w-full inline-flex h-9 items-center rounded-md border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-800 hover:bg-zinc-50"
              >
                {c.categoryName}
              </Link>
            
              <Link
                href={`/category/${c.categoryName}`}
              >
                 <Image
                  src={c.imageUrl}
                  width={500}
                  height={500}
                  alt={c.categoryName}
                />
              </Link>
           </div>
        ))
       }

       {renderEmptyBoxes(NumEmptyBox)}

    </div>
  );
}

