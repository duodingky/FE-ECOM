export default async function SearchPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div className="flex flex-col gap-6">
      
       Result for : {slug}
    </div>
  );
}

