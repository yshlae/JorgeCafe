import { Button } from "./ui/button";
import logo from 'figma:asset/54a245a40a00312bdeda65ad54763a27dcf53e44.png';
import heroBackground from 'figma:asset/d0c5904e201c42fd283d718d4f73fd1fa74bc899.png';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <img
          src={heroBackground}
          alt="Jorge's Cafe interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#D97D55]/60" />
      </div>
      
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Jorge's Cafe Logo" className="h-32 w-auto" />
        </div>
        <h1 className="mb-6">Jorge's Cafe</h1>
        <p className="mb-8 max-w-2xl mx-auto">
          Experience the perfect blend of artisanal coffee, fresh pastries, and warm hospitality. 
          Your neighborhood cafe where every cup tells a story.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            View Menu
          </Button>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-white">
            Visit Us
          </Button>
        </div>
      </div>
    </section>
  );
}