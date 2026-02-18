import Carousel from "@/components/carousel/carousel";
import { ImageContainer } from "@/components/ui/image/image";
import { Button } from "@/components/ui/button/button";

export default function Home() {
  return (
    <>
      <section className="relative min-h-screen w-full overflow-hidden">
        {/* HERO BACKGROUND */}
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/30_Mikes_Trailer.mp4" type="video/mp4" />
        </video>
        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/50 -z-10" />
        {/* HERO CONTENT */}
        <div className="relative z-10 flex flex-col items-center justify-end min-h-screen text-center px-6 pb-32">
          {/* CTA BUTTONS */}
          <div className="flex gap-4">
            <a
              href="https://store.steampowered.com/app/4329510/30_Mikes_Til_Extraction_Demo/?beta=0"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button label="PLAY NOW" />
            </a>
            <Button label="LEARN MORE" variant="secondary" />
          </div>
        </div>
        {/* BOTTOM STRIP */}
        <div className="absolute bottom-0 w-full bg-black py-5">
          <p className="text-center text-white font-bold tracking-widest">
            SURVIVE. &nbsp; FORTIFY. &nbsp; EXTRACT.
          </p>
        </div>
      </section>

      {/* SECTION 2 */}

      <section className="relative min-h-screen w-full overflow-hidden">
        {/* SECTION BACKGROUND */}
        <ImageContainer
          src="/images/section2.png"
          alt="Soldier shooting against robot enemy"
          className="absolute inset-0 -z-10 object-cover"
        />
      </section>
        {/* SECTION DIVIDER / STORY */}
      <section className="relative w-full py-32 bg-black flex items-center justify-center">
        {/* subtle divider line */}
        <div className="absolute top-0 w-full h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute bottom-0 w-full h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

        <div className="max-w-3xl px-8 text-center space-y-6">
           <p className="text-left text-white font-semibold tracking-wide">
            30 Mikes 'Til Extraction is a single-player looter shooter with
            horror elements. You are a scavenger trying to survive in a
            destroyed ghost town on the modern border between Germany and
            Switzerland. You go from building to building, trying to find food
            and other resources to survive. However, while the ghost town is
            almost empty of life, something else lurks within it: Robots that
            created this whole mess.
          </p>
        </div>
      </section>

      {/* SECTION 3 */}

      <section className="relative min-h-screen w-full overflow-hidden">
        {/* SECTION BACKGROUND */}
        <ImageContainer
          src="/images/section3.png"
          alt="dark industrial brutalism city"
          className="absolute inset-0 -z-10 object-cover"
        />
      </section>
  <section className="relative w-full py-32 bg-black flex items-center justify-center">
        {/* subtle divider line */}
        <div className="absolute top-0 w-full h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute bottom-0 w-full h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

        <div className="max-w-3xl px-8 text-center space-y-6">
             <p className="text-left text-white font-semibold tracking-wide">
            Stranded in enemy territory, your unit has lost all contact with HQ.
            Your objective is clear: secure a structure, fortify your position,
            and survive until extraction arrives. Supplies are limited, threats
            are constant, and every decision you make could mean the difference
            between escape and annihilation.
          </p>
        </div>
      </section>
      {/* SECTION ENEMIES */}

      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        {/* BACKGROUND */}
        <ImageContainer
          src="/images/section4.png"
          alt="Abandoned office battlefield"
          className="absolute inset-0 object-cover -z-20"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/70 -z-10" />

        {/* ENEMIES */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl w-full px-8">
          {[
            {
              name: "Sturmknecht-39",
              src: "/images/Sturmknecht_39.png",
              alt: "Rifleman enemy",
            },
            {
              name: "Stahlritter-42",
              src: "/images/SR-42_thin.png",
              alt: "Machine Gunner enemy",
            },
            {
              name: "Eisenfaust-45",
              src: "/images/EF-45_thin.png",
              alt: "Commando enemy",
            },
          ].map((enemy) => (
            <div key={enemy.name} className="flex flex-col items-center gap-4">
              {/* IMAGE CARD */}
              <div className="relative w-64 h-96 bg-black/40 border border-white/10 rounded-lg overflow-hidden">
                <ImageContainer
                  src={enemy.src}
                  alt={enemy.alt}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* LABEL */}
              <div className="w-64 bg-black/70 py-3 rounded-md text-center">
                <p className="text-white text-sm font-semibold tracking-widest uppercase">
                  {enemy.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION DIVIDER / STORY */}
      <section className="relative w-full py-32 bg-black flex items-center justify-center">
        {/* subtle divider line */}
        <div className="absolute top-0 w-full h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute bottom-0 w-full h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

        <div className="max-w-3xl px-8 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-wide text-white">
            Adapt or Die
          </h2>

          <p className="text-white leading-relaxed">
            The enemy is relentless. Every unit you encounter is designed to
            overwhelm, suppress, and eliminate. Understanding their strengths is
            the first step to surviving the extraction.
          </p>

          <p className="text-white text-sm tracking-widest uppercase">
            Know your enemy · Choose your weapon
          </p>
        </div>
      </section>

      {/* SECTION WEAPONS */}

      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        {/* BACKGROUND */}
        <ImageContainer
          src="/images/section5.png"
          alt="30 Mike's Weapons Background"
          className="absolute inset-0 -z-20"
        />
          <Carousel
            slides={[
              {
                image: "/images/30_Mikes_Pistol.png",
                title: "Pistol",
                description: "Reliable sidearm for close-quarters combat.",
              },
              {
                image: "/images/30_Mikes_auto_rifle.png",
                title: "Auto Rifle",
                description: "Fully automatic rifle with high fire rate.",
              },
              {
                image: "/images/30_Mikes_heavy_rifle.png",
                title: "Heavy Rifle",
                description: "High-caliber weapon built for armored targets.",
              },
            ]}
          />
      </section>
    </>
  );
}
