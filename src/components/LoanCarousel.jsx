// import Autoplay from "embla-carousel-autoplay";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { cn } from "@/lib/utils";

// import img1 from "@/assets/carousel-1.jpg";
// import img2 from "@/assets/carousel-2.jpg";
// import img3 from "@/assets/carousel-3.jpg";
// import img4 from "@/assets/carousel-4.jpg";
// import img5 from "@/assets/carousel-5.jpg";
// import img6 from "@/assets/carousel-6.jpg";
// import img7 from "@/assets/carousel-7.jpg";
// import img8 from "@/assets/carousel-8.jpg";
// import img9 from "@/assets/carousel-9.jpg";
// import img10 from "@/assets/carousel-10.jpg";
// import img11 from "@/assets/carousel-11.jpg";
// import img12 from "@/assets/carousel-12.jpg";
// import img13 from "@/assets/carousel-13.jpg";
// import img14 from "@/assets/carousel-14.jpg";
// import img15 from "@/assets/carousel-15.jpg";

// const slides = [
//   { src: img1, alt: "LoanManage carousel - new home keys for home loan" },
//   { src: img2, alt: "LoanManage carousel - new car for vehicle loan" },
//   { src: img3, alt: "LoanManage carousel - studying for education loan" },
//   { src: img4, alt: "LoanManage carousel - budgeting for personal loan" },
//   { src: img5, alt: "LoanManage carousel - home renovation planning" },
//   { src: img6, alt: "LoanManage carousel - meeting loan officer in modern office" },
//   { src: img7, alt: "LoanManage carousel - mobile banking dashboard app" },
//   { src: img8, alt: "LoanManage carousel - credit card secure payment on laptop" },
//   { src: img9, alt: "LoanManage carousel - mortgage signing with house keys" },
//   { src: img10, alt: "LoanManage carousel - premium car interior new purchase" },
//   { src: img11, alt: "LoanManage carousel - graduate celebrating near university" },
//   { src: img12, alt: "LoanManage carousel - savings growth piggy bank and coins" },
//   { src: img13, alt: "LoanManage carousel - loan approval stamp on paperwork" },
//   { src: img14, alt: "LoanManage carousel - family unpacking in new home" },
//   { src: img15, alt: "LoanManage carousel - entrepreneur reviewing funding plan" },
// ];

// const LoanCarousel = () => {
//   return (
//     <section aria-label="Featured loan stories" className="container mx-auto px-4 py-6 md:py-10 animate-fade-in">
//       <h2 className="sr-only">Featured loans</h2>
//       <Carousel
//         opts={{ align: "start", loop: true, slidesToScroll: 1 }}
//         plugins={[Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: false })]}
//         className="w-full"
//       >
//         <CarouselContent>
//           {slides.map((slide, idx) => (
//             <CarouselItem key={idx} className="basis-1/2">
//               <div className="p-1 md:p-2">
//                 <img
//                   src={slide.src}
//                   alt={slide.alt}
//                   loading="lazy"
//                   className={cn(
//                     "w-full h-48 md:h-[28rem] object-cover rounded-lg shadow-banking"
//                   )}
//                 />
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         <CarouselPrevious className="hidden md:flex" />
//         <CarouselNext className="hidden md:flex" />
//       </Carousel>
//     </section>
//   );
// };

// export default LoanCarousel;



import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

import img1 from "@/assets/carousel-1.jpg";
import img2 from "@/assets/carousel-2.jpg";
import img3 from "@/assets/carousel-3.jpg";
import img4 from "@/assets/carousel-4.jpg";
import img5 from "@/assets/carousel-5.jpg";
import img6 from "@/assets/carousel-6.jpg";
import img7 from "@/assets/carousel-7.jpg";
import img8 from "@/assets/carousel-8.jpg";
import img9 from "@/assets/carousel-9.jpg";
import img10 from "@/assets/carousel-10.jpg";
import img11 from "@/assets/carousel-11.jpg";
import img12 from "@/assets/carousel-12.jpg";
import img13 from "@/assets/carousel-13.jpg";
import img14 from "@/assets/carousel-14.jpg";
import img15 from "@/assets/carousel-15.jpg";

const slides = [
  { src: img1, alt: "LoanManage carousel - new home keys for home loan" },
  { src: img2, alt: "LoanManage carousel - new car for vehicle loan" },
  { src: img3, alt: "LoanManage carousel - studying for education loan" },
  { src: img4, alt: "LoanManage carousel - budgeting for personal loan" },
  { src: img5, alt: "LoanManage carousel - home renovation planning" },
  { src: img6, alt: "LoanManage carousel - meeting loan officer in modern office" },
  { src: img7, alt: "LoanManage carousel - mobile banking dashboard app" },
  { src: img8, alt: "LoanManage carousel - credit card secure payment on laptop" },
  { src: img9, alt: "LoanManage carousel - mortgage signing with house keys" },
  { src: img10, alt: "LoanManage carousel - premium car interior new purchase" },
  { src: img11, alt: "LoanManage carousel - graduate celebrating near university" },
  { src: img12, alt: "LoanManage carousel - savings growth piggy bank and coins" },
  { src: img13, alt: "LoanManage carousel - loan approval stamp on paperwork" },
  { src: img14, alt: "LoanManage carousel - family unpacking in new home" },
  { src: img15, alt: "LoanManage carousel - entrepreneur reviewing funding plan" },
];

const LoanCarousel = () => {
  return (
    <section aria-label="Featured loan stories" className="container mx-auto px-4 py-6 md:py-10 animate-fade-in">
      <h2 className="sr-only">Featured loans</h2>
      <Carousel
        opts={{ align: "start", loop: true, slidesToScroll: 1 }}
        plugins={[Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: false })]}
        className="w-full"
      >
        <CarouselContent>
          {slides.map((slide, idx) => (
            <CarouselItem key={idx} className="basis-1/2">
              <div className="p-1 md:p-2">
                <img
                  src={slide.src}
                  alt={slide.alt}
                  loading="lazy"
                  className={cn(
                    "w-full h-48 md:h-[28rem] object-cover rounded-lg shadow-banking"
                  )}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </section>
  );
};

export default LoanCarousel;
