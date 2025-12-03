export default function Features() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-20 text-center">
      <h2 className="text-[28px] font-semibold text-[#00441B]">
        Powerful Features for Filmmakers
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-[#4D4D4D]">
        Everything you need to manage your film festival submissions efficiently.
      </p>

      <div className="mt-10 grid gap-10 md:grid-cols-3">
        {/* Feature 1 */}
        <div className="flex flex-col items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-white border border-[#EDEDED]">
            {/* AI Icon */}
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="#00441B" strokeWidth="2" />
              <path
                d="M8 12h8M12 8v8"
                stroke="#26A65B"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h3 className="mt-4 text-sm font-semibold text-[#00441B]">
            AI-Powered Matching
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-[#4D4D4D]">
            Personalized festival recommendations with compatibility scores.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-white border border-[#EDEDED]">
            {/* Tracking Icon */}
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 18V6l8-3 8 3v12l-8 3-8-3z"
                stroke="#00441B"
                strokeWidth="2"
              />
              <path
                d="M9 11l3 3 5-5"
                stroke="#26A65B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="mt-4 text-sm font-semibold text-[#00441B]">
            Submission Tracking
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-[#4D4D4D]">
            One place for statuses and analytics.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-white border border-[#EDEDED]">
            {/* Awards Icon */}
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3l3 6h6l-4.5 4 2 7-6.5-4-6.5 4 2-7L3 9h6l3-6z"
                stroke="#00441B"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="11" r="2" fill="#26A65B" />
            </svg>
          </div>
          <h3 className="mt-4 text-sm font-semibold text-[#00441B]">
            Awards Management
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-[#4D4D4D]">
            Track wins and laurels in a portfolio.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="flex flex-col items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-white border border-[#EDEDED]">
            {/* Globe Icon */}
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="#00441B" strokeWidth="2" />
              <path
                d="M3 12h18M12 3c3 4 3 14 0 18M12 3c-3 4-3 14 0 18"
                stroke="#26A65B"
                strokeWidth="2"
              />
            </svg>
          </div>
          <h3 className="mt-4 text-sm font-semibold text-[#00441B]">
            Global Festival Database
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-[#4D4D4D]">
            Thousands of festivals with key data.
          </p>
        </div>

        {/* Feature 5 */}
        <div className="flex flex-col items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-white border border-[#EDEDED]">
            {/* Clock Icon */}
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="#00441B" strokeWidth="2" />
              <path
                d="M12 7v5l3 3"
                stroke="#26A65B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="mt-4 text-sm font-semibold text-[#00441B]">
            Deadline Reminders
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-[#4D4D4D]">
            Automatic notifications for deadlines.
          </p>
        </div>

        {/* Feature 6 */}
        <div className="flex flex-col items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-white border border-[#EDEDED]">
            {/* Analytics Icon */}
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 17V9M10 17V5M15 17v-6M20 17v-3"
                stroke="#00441B"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M4 20h16"
                stroke="#26A65B"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h3 className="mt-4 text-sm font-semibold text-[#00441B]">
            Performance Analytics
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-[#4D4D4D]">
            Insights on success and reach.
          </p>
        </div>
      </div>
    </section>
  );
}