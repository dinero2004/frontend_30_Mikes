export default function AboutPage() {
  return (
    <section className="
      min-h-screen h-full
      bg-[url('/images/background.png')]
      bg-no-repeat mx-auto px-8 py-16 space-y-12">
      {/* TITLE */}
      <h1 className="text-4xl font-bold text-white">Our Team</h1>

      {/* TEAM IMAGE */}
      <div className="flex justify-center">
        <img
          src="/images/about_us_image.jpeg"
          alt="Our team group photo"
          className="w-full max-w-3xl rounded-lg shadow-lg"
        />
      </div>
      <div className="flex justify-center">
        <img
          src="/images/about_us_image2.jpg"
          alt="Our team group photo"
          className="w-full max-w-3xl rounded-lg shadow-lg"
        />
      </div>

      {/* TEXT CONTENT */}
      <div className="space-y-10">
        {/* GOAL */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Goal</h2>
          <p className="text-sm text-muted-foreground max-w-2xl">
            8 Slice Games is a small indie studio consisting of seven students
            (two programmers, three artists, and two web developers). We formed
            this group for our bachelor's project. By discussing games and
            ideas, we realized that we think similarly and can create something
            special.
          </p>
          <p className="text-sm text-muted-foreground max-w-2xl mt-2">
            Our long-term goal is to evolve 30 Mikes Till Extraction into a
            community-driven tactical experience.
          </p>
        </div>

        {/* VISION */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Vision</h2>
          <p className="text-sm text-muted-foreground max-w-2xl">
            We aim to create immersive cooperative shooters that challenge
            communication and strategy, while fostering teamwork and long-term
            player engagement.
          </p>
        </div>

        {/* PHILOSOPHY */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Philosophy</h2>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Our goal is to create games that we enjoy playing and share with the
            world. We believe that we shouldn't be held back by uncertainties
            and should always give our projects our all, regardless of the
            deadline.
          </p>
        </div>
      </div>
    </section>
  );
}
