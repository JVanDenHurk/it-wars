import Link from "next/link";

export default function HowToPlayPage() {
  return (
    <main className="min-h-screen bg-black px-4 py-10 text-white md:px-6">

      <div className="mx-auto max-w-5xl">

        {/* ============================
            HEADER
            ============================ */}
        <div className="flex flex-wrap items-start justify-between gap-4">

          <div>

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
              New Starter Induction
            </p>

            <h1 className="mt-2 text-4xl font-black md:text-5xl">
              How to Play
            </h1>

            <p className="mt-3 max-w-2xl text-zinc-400">
              Survive the Service Desk, climb the IT ladder,
              and make everyone else&apos;s queue worse.
            </p>

          </div>

          <Link
            href="/"
            className="border border-zinc-700 px-4 py-2 text-sm font-bold hover:bg-zinc-900"
          >
            Back
          </Link>

        </div>

        {/* ============================
            CORE RULE
            ============================ */}
        <div className="mt-8 border border-zinc-700 bg-zinc-950 p-6">

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
            The Rule
          </p>

          <p className="mt-2 text-xl font-black">
            Resolve your tickets, route them correctly,
            and try not to become somebody else&apos;s problem.
          </p>

        </div>

        {/* ============================
            BASIC GAMEPLAY
            ============================ */}
        <div className="mt-4 grid gap-4 md:grid-cols-2">

          {/* Work queue */}
          <div className="border border-zinc-800 bg-zinc-950 p-5">

            <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
              01 — Work Your Queue
            </p>

            <h2 className="mt-2 text-xl font-black">
              Tickets arrive automatically
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Your queue receives work while you&apos;re active.
              Ticket arrival times vary depending on how busy your
              queue already is.
            </p>

          </div>

          {/* Resolve / bounce */}
          <div className="border border-zinc-800 bg-zinc-950 p-5">

            <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
              02 — Resolve or Route
            </p>

            <h2 className="mt-2 text-xl font-black">
              Make the right call
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Resolve tickets your team can handle or bounce them
              to another player who belongs to the correct resolver team.
            </p>

          </div>

          {/* Hidden resolver */}
          <div className="border border-zinc-800 bg-zinc-950 p-5">

            <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
              03 — Hidden Resolver Team
            </p>

            <h2 className="mt-2 text-xl font-black">
              Read the ticket carefully
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              The correct resolver category is hidden intentionally.
              You need to work out whether the issue belongs to
              Service Desk, Network, Systems, or Security.
            </p>

          </div>

          {/* Credits */}
          <div className="border border-zinc-800 bg-zinc-950 p-5">

            <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
              04 — Earn Credits & XP
            </p>

            <h2 className="mt-2 text-xl font-black">
              Good work pays
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Correct resolutions and routing earn Career XP and Credits.
              A ticket&apos;s Credit value drops while it remains unresolved.
            </p>

          </div>

          {/* Promotions */}
          <div className="border border-zinc-800 bg-zinc-950 p-5">

            <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
              05 — Climb the Ladder
            </p>

            <h2 className="mt-2 text-xl font-black">
              Get promoted
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Everyone begins as a Service Desk Analyst.
              Earn Career XP to move through the Service Desk ranks
              and unlock specialist careers.
            </p>

          </div>

          {/* Specialist */}
          <div className="border border-zinc-800 bg-zinc-950 p-5">

            <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
              06 — Specialise
            </p>

            <h2 className="mt-2 text-xl font-black">
              Choose your career
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              At Level 4, choose Network, Systems, or Security.
              Specialist careers unlock new ticket types and unique abilities.
            </p>

          </div>

        </div>

        {/* ============================
            CAREERS & ABILITIES
            ============================ */}
        <div className="mt-10">

          <div className="text-center">

            <p className="text-xs font-bold uppercase tracking-[0.22em] text-zinc-500">
              Career Paths
            </p>

            <h2 className="mt-2 text-3xl font-black">
              Careers & Abilities
            </h2>

            <p className="mx-auto mt-2 max-w-2xl text-sm text-zinc-400">
              Your specialist career changes the kind of work
              you can handle and gives you unique passive and active abilities.
            </p>

          </div>

          {/* Career progression */}
          <div className="mt-5 grid gap-3 md:grid-cols-2">

            <div className="border border-zinc-800 bg-zinc-950 p-4">

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
                Level 4
              </p>

              <h3 className="mt-1 text-lg font-black">
                Choose a Specialist Career
              </h3>

              <p className="mt-2 text-sm text-zinc-400">
                Select Network, Systems, or Security and immediately gain
                that career&apos;s passive ability.
              </p>

            </div>

            <div className="border border-zinc-800 bg-zinc-950 p-4">

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
                Level 6
              </p>

              <h3 className="mt-1 text-lg font-black">
                Unlock Active Ability
              </h3>

              <p className="mt-2 text-sm text-zinc-400">
                Reach Level 6 to unlock your career&apos;s active ability.
                Active abilities have cooldowns and can change how you
                manage your queue.
              </p>

            </div>

          </div>

          {/* Career cards */}
          <div className="mt-4 grid gap-4 lg:grid-cols-3">

            {/* Network */}
            <div className="border border-sky-900 bg-sky-950/10 p-5">

              <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-500">
                🌐 Network
              </p>

              <h3 className="mt-2 text-xl font-black text-sky-200">
                Network Engineer
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                A routing-focused career built around moving tickets
                between teams and reducing the risk of bad escalation decisions.
              </p>

              <div className="mt-5 border-t border-sky-900/50 pt-4">

                <p className="text-xs font-bold uppercase tracking-wide text-sky-500">
                  Passive — Routing Specialist
                </p>

                <p className="mt-2 text-sm text-zinc-300">
                  Wrong-bounce penalties are reduced by 25%.
                </p>

              </div>

              <div className="mt-4 border-t border-sky-900/50 pt-4">

                <p className="text-xs font-bold uppercase tracking-wide text-sky-500">
                  Active — Route Flap
                </p>

                <p className="mt-2 text-sm text-zinc-300">
                  Move a ticket to another player without triggering
                  the normal wrong-routing penalty, ownership warning,
                  or DNS bounce failure.
                </p>

                <p className="mt-2 text-xs text-zinc-500">
                  Unlocks at Level 6.
                </p>

              </div>

            </div>

            {/* Systems */}
            <div className="border border-blue-900 bg-blue-950/10 p-5">

              <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-500">
                🖥️ Systems
              </p>

              <h3 className="mt-2 text-xl font-black text-blue-200">
                Systems Engineer
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                A queue-control career focused on keeping valuable work alive
                and buying more time during busy periods.
              </p>

              <div className="mt-5 border-t border-blue-900/50 pt-4">

                <p className="text-xs font-bold uppercase tracking-wide text-blue-500">
                  Passive — Automation
                </p>

                <p className="mt-2 text-sm text-zinc-300">
                  Normal ticket Credit value decays 25% slower.
                </p>

              </div>

              <div className="mt-4 border-t border-blue-900/50 pt-4">

                <p className="text-xs font-bold uppercase tracking-wide text-blue-500">
                  Active — Maintenance Window
                </p>

                <p className="mt-2 text-sm text-zinc-300">
                  Freeze SLA ageing and Credit decay on up to
                  2 tickets for 5 minutes.
                </p>

                <p className="mt-2 text-xs text-zinc-500">
                  Unlocks at Level 6.
                </p>

              </div>

            </div>

            {/* Security */}
            <div className="border border-cyan-900 bg-cyan-950/10 p-5">

              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-500">
                🔐 Security
              </p>

              <h3 className="mt-2 text-xl font-black text-cyan-200">
                Security Analyst
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                A defensive career built around surviving PvP pressure
                and removing dangerous Poison Tickets.
              </p>

              <div className="mt-5 border-t border-cyan-900/50 pt-4">

                <p className="text-xs font-bold uppercase tracking-wide text-cyan-500">
                  Passive — Incident Hardened
                </p>

                <p className="mt-2 text-sm text-zinc-300">
                  Poison-related Credit penalties are reduced by 25%.
                </p>

              </div>

              <div className="mt-4 border-t border-cyan-900/50 pt-4">

                <p className="text-xs font-bold uppercase tracking-wide text-cyan-500">
                  Active — Quarantine
                </p>

                <p className="mt-2 text-sm text-zinc-300">
                  Remove a Poison Ticket from your queue without
                  earning Credits or Career XP.
                </p>

                <p className="mt-2 text-xs text-zinc-500">
                  Unlocks at Level 6.
                </p>

              </div>

            </div>

          </div>

          {/* In demand */}
          <div className="mt-4 border border-yellow-900 bg-yellow-950/10 p-5">

            <p className="text-xs font-black uppercase tracking-[0.18em] text-yellow-500">
              ⚡ In Demand
            </p>

            <h3 className="mt-2 text-lg font-black text-yellow-200">
              The IT department needs balance
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              The least represented specialist path may be marked as{" "}
              <span className="font-bold text-yellow-300">
                In Demand
              </span>
              . Choosing an In Demand career grants a bonus and helps
              keep the multiplayer ticket pool balanced.
            </p>

            <p className="mt-3 text-xs text-zinc-500">
              Specialist careers also affect which Network, Systems,
              and Security tickets can enter circulation while players
              are online.
            </p>

          </div>

        </div>

        {/* ============================
            PVP
            ============================ */}
        <div className="mt-10">

          <div className="text-center">

            <p className="text-xs font-bold uppercase tracking-[0.22em] text-purple-500">
              Player vs Player
            </p>

            <h2 className="mt-2 text-3xl font-black">
              Poison the Competition
            </h2>

            <p className="mx-auto mt-2 max-w-2xl text-sm text-zinc-400">
              IT WARS turns the ticket queue itself into the PvP battlefield.
            </p>

          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">

            <div className="border border-purple-900 bg-purple-950/10 p-5">

              <p className="text-xs font-black uppercase tracking-[0.18em] text-purple-500">
                07 — Buy Attacks
              </p>

              <h3 className="mt-2 text-xl font-black text-purple-200">
                ☣ Poison Store
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Spend Credits to attack another active player.
                Poison attacks can create dangerous tickets or modify
                how their entire queue behaves.
              </p>

            </div>

            <div className="border border-purple-900 bg-purple-950/10 p-5">

              <p className="text-xs font-black uppercase tracking-[0.18em] text-purple-500">
                Queue Warfare
              </p>

              <h3 className="mt-2 text-xl font-black text-purple-200">
                Make their shift worse
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Poison effects can increase queue speed, accelerate
                Credit decay, hide SLA warnings, disrupt bouncing,
                increase penalties, or create ticket bursts.
              </p>

            </div>

          </div>

          <div className="mt-4 border border-purple-900 bg-purple-950/10 p-5">

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-500">
              Risk vs Reward
            </p>

            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              PvP attacks cost Credits. Spending heavily can cripple
              another player, but every Credit spent also pushes you
              closer to bankruptcy.
            </p>

          </div>

        </div>

        {/* ============================
            BANKRUPTCY
            ============================ */}
        <div className="mt-10 border border-red-900 bg-red-950/10 p-6">

          <p className="text-xs font-black uppercase tracking-[0.18em] text-red-500">
            08 — Bankruptcy
          </p>

          <h2 className="mt-2 text-2xl font-black text-red-200">
            Don&apos;t hit 0 CR
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400">
            Credits are both currency and survival.
            Incorrect work, abandoned tickets, and PvP pressure can
            drain your Credits.
          </p>

          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400">
            Reach 0 Credits and your current career ends.
            You are demoted back to the Service Desk and must climb
            the IT ladder again.
          </p>

          <p className="mt-3 text-sm font-bold text-red-300">
            Your lifetime statistics remain.
          </p>

        </div>

        {/* ============================
            QUICK TIPS
            ============================ */}
        <div className="mt-4 border border-zinc-800 bg-zinc-950 p-6">

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
            Quick Tips
          </p>

          <div className="mt-4 grid gap-3 text-sm text-zinc-400 md:grid-cols-2">

            <p>
              • Don&apos;t bounce everything just because you can.
              Ownership penalties can slow your personal queue.
            </p>

            <p>
              • Watch ticket severity and age.
              Abandoned tickets can cost a lot of Credits.
            </p>

            <p>
              • Other players&apos; careers matter.
              They determine which resolver teams are available.
            </p>

            <p>
              • Spending Credits on PvP makes you more dangerous,
              but also more vulnerable.
            </p>

            <p>
              • Poison Tickets provide no normal Credit or Career XP reward.
              Sometimes removing the threat is the reward.
            </p>

            <p>
              • Your Credit balance is uncapped.
              Build a fortune if you can survive long enough.
            </p>

          </div>

        </div>

        {/* ============================
            CTA
            ============================ */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">

          <Link
            href="/register"
            className="bg-white px-6 py-3 font-black text-black hover:bg-zinc-200"
          >
            Create Account
          </Link>

          <Link
            href="/"
            className="border border-zinc-700 px-6 py-3 font-black hover:bg-zinc-900"
          >
            Back to Login
          </Link>

        </div>

      </div>

    </main>
  );
}