import { BoxTitle } from "@/app/components/Box/BoxTitle";
import { base_url } from "@/app/components/global";
import { ItemSong2 } from "@/app/components/ItemSong/ItemSong2";
import { Title } from "@/app/components/Title/Title";
import { Metadata } from "next";
import { useEffect, useState } from "react";
import parse from 'html-react-parser';
import { LyricSong } from "@/app/components/LyricSong/LyricSong";

export const metadata: Metadata = {
  title: "Chi tiết bài hát",
  description: "Mô tả chi tiết bài hát, ca sĩ, lời bài hát",
};

export const DetailSong = (props:any) => {

  const slugSong = props.data;

  const [dataSec1, setData] = useState(null);
  const [dataSec2, setData2] = useState(null);
  useEffect(() => {
    // lay ra chi tiet bai hat
    async function fetchDataSong() {
      let dataFinal :any
      await fetch(`${base_url}/songs/detail/${slugSong}`)
      .then(res=> res.json())
      .then((data => {
        dataFinal = data;
        setData(data);
        console.log(dataFinal.topicSlug);
      }));
      //Lay ra bai hat cung topic
      const topicSlug : any = dataFinal.topicSlug;
      await fetch(`${base_url}/topics/${topicSlug}`)
        .then(res=> res.json())
        .then((data => {
          setData2(data);
        }))
    }
    fetchDataSong();
  }, []);

  const dataFinal: any = dataSec1;
  const dataFinal2: any = dataSec2;
  let dataBoxHead = {};
  let listSongs: any[] = [];
  let lyric = "";
  if(dataSec1 && dataSec2){
    const song = dataFinal.songCurrent;
    dataBoxHead = {
      img: song.avatar,
      title: song.title,
      des: song.description,
      listenNumber: song.listenNumber
    }
    lyric = `${song.lyrics?song.lyrics:"Chưa cập nhật lời bài hát!"}`;

    for (const item of dataFinal2.listSongs) {
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

  // listSongs = [
  //   {
  //     songName: "Cô Phòng",
  //     singers: "Hồ Quang Hiếu, Huỳnh Văn",
  //     timeSong: "4:32",
  //     img: "/assets/imgs/img-2.jpg"
  //   },
  //   {
  //     songName: "Cô Phòng",
  //     singers: "Hồ Quang Hiếu, Huỳnh Văn",
  //     timeSong: "4:32",
  //     img: "/assets/imgs/img-2.jpg"
  //   },
  //   {
  //     songName: "Cô Phòng",
  //     singers: "Hồ Quang Hiếu, Huỳnh Văn",
  //     timeSong: "4:32",
  //     img: "/assets/imgs/img-2.jpg"
  //   }
  // ]

  return (
    <>
     {/* Section-1 */}
     <BoxTitle data = {dataBoxHead}/>
      {/* Section-2 */}
      <Title text="Lời Bài Hát"/>
      {/* <div className="rounded-[15px] bg-[#212121] p-[20px] whitespace-pre-line">
        {parse(lyric)}
      </div> */}
      {/* <LyricSong lyric={lyric}/> */}
      {lyric && <LyricSong lyric={lyric}/>}
      {/* Section-3 */}
      <Title text="Bài Hát Cùng Danh Mục"/>
      <div className="grid grid-cols-1 gap-y-[10px]">
        {listSongs && listSongs.map((item, index) => (
          <ItemSong2 data={item} key={index}/>
        ))}
      </div>
    </>
  )
}