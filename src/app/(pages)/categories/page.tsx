import { CardItem } from "@/app/components/Card/CardItem";
import { base_url } from "@/app/components/global";
import { Title } from "@/app/components/Title/Title";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Danh mục bài hát",
  description: "Các bài hát theo danh mục",
};


export default async function CategoriesPage() {
  let data:any = await fetch(`${base_url}/topics`);
  data = await data.json();

  const dataSection3 = data.map((item:any) => {
    return {
      title: item.title,
      image: item.avatar,
      description: item.description,
      slug: item.slug
    }
  });

  return (
    <>
      <div className="mt-[30px]">
        <Title text="Danh Mục Bài Hát"/>
        <div className="grid grid-cols-3 gap-[15px] xl:grid-cols-5 xl:gap-[20px] lg:grid-cols-4 lg:gap-[10px] md:grid-cols-2 md:gap-[15px] mt-[20px]">
          {dataSection3.map((item : any, index : number) => (
            <Link href={`/categories/${item.slug}`} key={index}>
              <CardItem data={item} key={index}/>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}