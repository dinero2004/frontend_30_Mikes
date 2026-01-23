import { ImageContainer } from "@/components/ui/image/image";
import { Button } from "@/ui/button/button";

export default function Home() {
  return (
    <>
      <section className="relative min-h-screen w-full overflow-hidden">
        {/* HERO BACKGROUND */}
        <ImageContainer
          src="/images/hero-Image.png"
          alt="Hero background"
          className="absolute inset-0 -z-10 object-cover"
        />
        {/* TITLE BANNER */}
        {/* using img because the ImageContainer uses objectFit cover that is not
      suitable for the logo on the hero section */}
        <img
          src="/images/primary-logo.png"
          alt="Primary logo"
          className="absolute top-[30%] left-1/2
             h-[15vh] max-h-40px
             w-auto
             -translate-x-1/2 -translate-y-1/2"
        />
        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/50 -z-10" />
        {/* HERO CONTENT */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6">
          {/* CTA BUTTONS */}
          <div className="flex gap-4">
            <Button label="PLAY NOW" />
            <Button label="LEARN MORE" variant="secondary" />
          </div>
        </div>
        {/* BOTTOM STRIP */}
        <div className="absolute bottom-0 w-full bg-amber-950 py-5">
          <p className="text-center text-white font-bold tracking-widest">
            SURVIVE. &nbsp; FORTIFY. &nbsp; EXTRACT.
          </p>
        </div>
      </section>

      {/* SECTION 2 */}

      <section className="relative min-h-screen w-full overflow-hidden">
        {/* SECTION BACKGROUND */}
        <ImageContainer
          src="/images/section2-Image.png"
          alt="Soldier shooting against robot enemy"
          className="absolute inset-0 -z-10 object-cover"
        />

        {/* BLURRED TEXT PANEL */}
        <div
          className="absolute bottom-12  -translate-x1/2
                max-w-3xl w-[90%]
                backdrop-blur-s bg-white/20
                px-8 py-6
                border border-white/10
                shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
        >
          <p className="text-center text-white font-semibold tracking-wide">
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
          src="/images/town2.png"
          alt="dark industrial brutalism city"
          className="absolute inset-0 -z-10 object-cover"
        />

        {/* BLURRED TEXT PANEL */}
        <div
          className="absolute bottom-0
                max-w h-40
                backdrop-blur-s bg-white/20
                px-8 py-6
                border border-white/10
                shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
        >
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
          src="/images/office.png"
          alt="Abandoned office battlefield"
          className="absolute inset-0 -z-20 object-cover"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-gray-700 -z-10" />

        {/* ENEMIES */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl w-full px-8">
          {/* Riflemen */}
          <div className="flex flex-col items-center">
            <div className="relative w-64 h-96 bg-black/30 border border-white/10 flex items-center justify-center">
              <ImageContainer
                src="/images/rifleman.png"
                alt="Rifleman enemy"
                className="w-44 h-auto"
              />
            </div>
            <div className="w-64 bg-black/60 py-3 text-center">
              <p className="text-white font-medium tracking-wide">Riflemen</p>
            </div>
          </div>

          {/* Machine Gunners */}
          <div className="flex flex-col items-center">
            <div className="relative w-64 h-96 bg-black/30 border border-white/10 flex items-center justify-center">
              <ImageContainer
                src="/images/machine-gunner.png"
                alt="Machine Gunner enemy"
                className="w-44 h-auto"
              />
            </div>
            <div className="w-64 bg-black/60 py-3 text-center">
              <p className="text-white font-medium tracking-wide">
                Machine Gunners
              </p>
            </div>
          </div>

          {/* Commandos */}
          <div className="flex flex-col items-center">
            <div className="relative w-64 h-96 bg-black/30 border border-white/10 flex items-center justify-center">
              <ImageContainer
                src="/images/heavy-machine-gunner.png"
                alt="Commando enemy"
                className="w-44 h-auto"
              />
            </div>
            <div className="w-64 bg-black/60 py-3 text-center">
              <p className="text-white font-medium tracking-wide">Commandos</p>
            </div>
          </div>
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
    src="/images/background_weapons.png"
    alt="30 Mike's Weapons Background"
    className="absolute inset-0 -z-20 object-cover"
  />

  {/* DARK OVERLAY */}
  <div className="absolute inset-0 bg-gray-700/80 -z-10" />

  {/* WEAPONS */}
  <div className="relative z-10 grid grid-cols-1 xl:grid-rows-3 gap-10 w-full px-2">

    {/* Pistol */}
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-2xl aspect-square bg-black/30 border border-white/10 flex items-center justify-center">
        <ImageContainer
          src="/images/30_Mikes_Pistol.png"
          alt="compact pistol"
          className="w-full h-full object-contain scale-90"
        />
      </div>
      <div className="w-full max-w-2xl  bg-black/60 py-3 text-center mt-3">
        <p className="text-white font-medium tracking-wide">Pistol</p>
      </div>
    </div>

    {/* Automatic Rifle */}
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-2xl  aspect-square bg-black/30 border border-white/10 flex items-center justify-center">
        <ImageContainer
          src="/images/30_Mikes_auto_rifle.png"
          alt="automatic rifle"
          className="w-full h-full object-contain scale-90"
        />
      </div>
      <div className="w-full max-w-2xl  bg-black/60 py-3 text-center mt-3">
        <p className="text-white font-medium tracking-wide">Automatic Rifle</p>
      </div>
    </div>

    {/* Heavy Shotgun */}
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-2xl  aspect-square bg-black/30 border border-white/10 flex items-center justify-center">
        <ImageContainer
          src="/images/30_Mikes_heavy_rifle.png"
          alt="heavy shotgun"
          className="w-full h-full object-contain scale-90"
        />
      </div>
      <div className="w-full max-w-2xl bg-black/60 py-3 text-center mt-3">
        <p className="text-white font-medium tracking-wide">Heavy Shotgun</p>
      </div>
    </div>

  </div>
</section>



    </>
  );
}
