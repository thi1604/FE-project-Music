import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { base_url } from "./app/components/global";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("userToken"); // Lấy token từ cookie
  const res = NextResponse.redirect(new URL("/register", req.url));
  res.headers.set('Cache-Control', 'no-store');
  res.cookies.set("showAlert", "true");
  if(token){
    await fetch(`${base_url}/user/authenToken`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify(token)
    })
    .then(res => res.json())
    .then(data => {
      if(data.code == 200){
        return NextResponse.next().headers.set('Cache-Control', 'no-store');
      }
      else{
        return res;
      }
    })
  }
  else{
    return res;
  }
}

// 🛠 Chỉ áp dụng middleware cho một số route cụ thể
export const config = {
  matcher: ["/loveSongs", "/detailUser"], // Middleware chỉ chạy trên /loveSongs/*
};