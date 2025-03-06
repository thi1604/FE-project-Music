import { Metadata } from "next";
import Register from "./Register";
export const metadata: Metadata = {
  title: "Đăng kí",
  description: "Trang đăng kí",
};


export default function RegisterPage() {
  
  return (
    <>
      <Register/>
    </>
  )
}