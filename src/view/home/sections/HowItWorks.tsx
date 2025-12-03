export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-16">
      <h2 className="text-[28px] font-semibold text-[#00441B] text-center">
        How It Works
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-[#4D4D4D] text-center">
        Three simple steps to get your film in front of the right festivals.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-[10px] border border-[#EDEDED] bg-white p-6 shadow-sm">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#00441B] text-white text-sm font-semibold">
            1
          </div>
          <h3 className="mt-4 text-sm font-semibold text-[#00441B] text-center">
            Submit Your Film
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-[#4D4D4D] text-center">
            Upload your film details including genre, duration, production info, and assets. All major formats supported.
          </p>
        </div>
        <div className="rounded-[10px] border border-[#EDEDED] bg-white p-6 shadow-sm">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#00441B] text-white text-sm font-semibold">
            2
          </div>
          <h3 className="mt-4 text-sm font-semibold text-[#00441B] text-center">
            AI Matches Festivals
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-[#4D4D4D] text-center">
            AI finds the best matches based on your film’s characteristics, deadlines, and goals.
          </p>
        </div>
        <div className="rounded-[10px] border border-[#EDEDED] bg-white p-6 shadow-sm">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#00441B] text-white text-sm font-semibold">
            3
          </div>
          <h3 className="mt-4 text-sm font-semibold text-[#00441B] text-center">
            Track & Celebrate
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-[#4D4D4D] text-center">
            Monitor statuses, get reminders, and celebrate acceptances and awards.
          </p>
        </div>
      </div>
    </section>
  );
}