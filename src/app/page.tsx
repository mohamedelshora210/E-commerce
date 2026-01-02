import Brands from "@/components/HomePage/Brands/Brands";
import Categories from "@/components/HomePage/Categories/Categories";
import Header from "@/components/HomePage/Header/Header";
import InfoHome from "@/components/HomePage/InfoHome/InfoHome";
import InfoHomeTwo from "@/components/HomePage/InfoHome/InfoHometwo";
import InfoServices from "@/components/HomePage/InfoHome/InfoServices";

export const metadata = {
  title: "Home",
};
 export default async function Home() {

  return (
   <>
   
    
    <Header/>
    <InfoHome/>
    <Categories/>
    <InfoHomeTwo/>
    <Brands/>
    <InfoServices/>
   </>
  );
}
