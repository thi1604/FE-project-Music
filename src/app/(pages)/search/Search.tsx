import { base_url } from "@/app/components/global";
import { ItemSong2 } from "@/app/components/ItemSong/ItemSong2";
import { Title } from "@/app/components/Title/Title";
import { Metadata } from "next";
import {useEffect, useState } from "react";

export const metadata: Metadata = {
  title: "Kết quả tìm kiếm",
  description: "Các kết quả tìm kiếm",
};

export const SearchResult = (props: any) => {
  const keyword = props.data;
  // console.log("1");
  const [data, setData] = useState(null);
  useEffect(() => {
    // Lay du lieu bai hat tu keyword
    async function fetchDataSearch() {
      await fetch(`${base_url}/songs/search/${keyword}`)
      .then(res=> res.json())
      .then((data => {
    
      setData(data);
      }));
    }
    fetchDataSearch();
  }, [keyword]);

  const dataFinal: any = data;
  let listSongs: any[] = [];
  // let lyric = "";
  if(data){
    for (const item of dataFinal) {
      const dataSong = {
          songName: item.title,
          timeSong: item.totalTime,
          img: item.avatar,
          singers: item.singers,
          listenNumber: item.listenNumber,
          like: item.like,
          audio: item.audio,
          lyrics: item.lyrics,
          slug: item.slug
        }

      listSongs.push(dataSong);  
    }
  }
  return (
    <>
      <Title text={`Kết Quả Tìm Kiếm: ${keyword}`}/>
      <div className="grid grid-cols-1 gap-y-[10px]">
        {listSongs.length > 0 ? 
          listSongs.map((item, index) => (
          <ItemSong2 data={item} key={index}/>))
        :
          <div className="text-[16px] font-[300] text-[#FFFFFF] italic">
            Danh sách trống!
          </div>
        }
      </div>
    </>
  )
}