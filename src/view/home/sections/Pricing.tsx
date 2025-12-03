export default function Pricing() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-20 text-center">
      <h2 className="text-[28px] font-semibold text-[#00441B]">
        Simple, Transparent Pricing
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-[#4D4D4D]">
        Choose the plan that fits your filmmaking journey.
      </p>

      <div className="mt-10 grid gap-8 md:grid-cols-2 text-left">
        <div className="rounded-[10px] border border-[#EDEDED] bg-white p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-[#00441B]">Free</h3>
          <p className="mt-1 text-xs text-[#4D4D4D]">$0/month</p>
          <ul className="mt-4 space-y-2 text-xs text-[#4D4D4D]">
            <li><span className="text-[#26A65B]">✓</span> Up to 3 film submissions</li>
            <li><span className="text-[#26A65B]">✓</span> Basic AI recommendations</li>
            <li><span className="text-[#26A65B]">✓</span> Submission tracking</li>
            <li><span className="text-[#26A65B]">✓</span> Festival database access</li>
          </ul>
          <a
            href="#get-started"
            className="mt-5 inline-flex h-10 items-center justify-center rounded-md px-5 text-xs font-medium text-[#00441B] bg-white border border-[#00441B] hover:bg-[#00441B] hover:text-white transition"
          >
            Get Started Free
          </a>
        </div>

        <div className="relative rounded-[10px] border border-[#00441B] bg-white p-6 shadow-sm">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#26A65B] px-3 py-1 text-[10px] font-semibold text-white shadow-sm">
            Popular
          </div>
          <h3 className="text-sm font-semibold text-[#00441B]">Pro</h3>
          <p className="mt-1 text-xs text-[#4D4D4D]">$9.99/month</p>
          <ul className="mt-4 space-y-2 text-xs text-[#4D4D4D]">
            <li><span className="text-[#26A65B]">✓</span> Unlimited film submissions</li>
            <li><span className="text-[#26A65B]">✓</span> Advanced AI matching</li>
            <li><span className="text-[#26A65B]">✓</span> Priority support & notifications</li>
            <li><span className="text-[#26A65B]">✓</span> Detailed analytics & insights</li>
            <li><span className="text-[#26A65B]">✓</span> Custom submission strategies</li>
            <li><span className="text-[#26A65B]">✓</span> Awards portfolio management</li>
          </ul>
          <a
            href="#upgrade"
            className="mt-5 inline-flex h-10 items-center justify-center rounded-md px-5 text-xs font-medium text-white bg-[#00441B] border border-[#00441B] hover:bg-[#0A5B28] transition"
          >
            Upgrade to Pro
          </a>
        </div>
      </div>
    </section>
  );
}