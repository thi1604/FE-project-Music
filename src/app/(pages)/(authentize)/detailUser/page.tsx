import { Metadata } from "next";
import { DetailUser } from "./detailUser";


export const metadata: Metadata = {
  title: "Chi tiết tài khoản",
  description: "Trang chi tiết tài khoản",
};

export default function detailUserPage(){

  return(
    <>
      <DetailUser/>
    </>
  )
}