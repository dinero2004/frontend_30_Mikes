import ObjViewer from "@/components/three/ObjViewer";

export default function Page() {
  return (
    <section className="relative min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <h1 className="text-4xl font-bold mb-10">Enemy Prototypes</h1>

        {/* MODELS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="h-[400px] rounded-xl overflow-hidden border border-white/10">
            <ObjViewer />
          </div>
        </div>

        <p className="mt-8 text-gray-400 max-w-xl">
          Rotate and inspect each enemy unit using your mouse.
        </p>
      </div>
    </section>
  );
}
