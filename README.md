# IT Wars

**Survive the Service Desk. Climb the IT ladder. Make your coworkers regret logging in.**

IT Wars is a multiplayer browser-based game inspired by the chaos of working in IT support.

Players begin their career as a **Service Desk Analyst**, handling incoming tickets to earn Credits and Career XP. Promotions eventually unlock specialist career paths in **Networking, Systems, and Security**.

But IT Wars isn't just a ticket simulator.

Players can resolve tickets, route work to other resolver teams, dump tickets into other players' queues, make catastrophically bad escalation decisions, go bankrupt, get demoted, and compete for the top of the IT department.

The basic rule is simple:

> **Resolve your tickets, route them correctly, and try not to become somebody else's problem.**

---

## 🎮 How It Works

Every player has their own ticket queue.

Tickets automatically arrive while the player is active and contain:

- A title and description
- A hidden resolver team
- A severity
- A maximum Credit value
- A Career XP reward
- A continuously decreasing Credit value
- Success and failure outcomes

The longer a ticket sits in your queue, the less it is worth.

A ticket can eventually reach:

```text
0 CR
```

It can still be resolved for Career XP, but the Credit reward is gone.

Leave tickets sitting around for too long and things get considerably worse.

---

## 🎫 Resolve or Bounce

When a ticket lands in your queue, you have two choices.

### Resolve

Think the ticket belongs to your resolver group?

Resolve it.

A correct resolution earns:

- Credits
- Career XP
- Progress toward promotion
- Resolved ticket statistics
- Lifetime earnings

You may even receive confirmation that, against all expectations, you successfully performed your job.

An incorrect resolution closes the ticket as failed and costs Credits.

---

### Bounce

Think somebody else should deal with it?

Of course you do.

Tickets can be transferred directly to another player.

The ticket category is hidden, so the player must use the ticket description and the receiving player's role to decide where it belongs.

Correct routing can earn:

- A percentage of the ticket's remaining value
- Career XP
- Correct routing statistics

Bad routing costs Credits.

And most importantly:

**The ticket still transfers.**

The receiving player now has to deal with your mistake.

Welcome to IT.

---

## ⚠️ Ownership Warnings

Players are expected to take ownership of tickets they are capable of resolving.

If you transfer a ticket that both you and the receiving player could resolve, you receive an:

**Ownership Warning**

Your personal ticket intake is slowed for five minutes.

You can either:

- Accept the five-minute slowdown
- Pay Credits to immediately restore normal queue priority

The penalty only affects your personal queue.

This prevents players from endlessly dumping their own work onto somebody else just because they can.

---

## 🔄 Specialist → Service Desk Handoffs

Specialists can still resolve Service Desk tickets.

However, specialists are also allowed to return Service Desk work to an actual Service Desk player.

For example:

```text
Network Engineer
      ↓
Receives Service Desk Ticket
      ↓
Sends to Service Desk Analyst
      ↓
No penalty
```

The specialist receives:

```text
0 CR
0 XP
No queue slowdown
```

The Service Desk player receives the work and has another opportunity to earn XP toward promotion.

Everybody wins.

Except the Service Desk Analyst.

---

## ⏱️ Ticket Queue

Tickets are delivered automatically rather than manually pulled.

The exact next-ticket timer is intentionally hidden from the player. Tickets simply arrive while the player is active, making the queue feel less predictable and closer to a real Service Desk.

Ticket generation is tied to the player's current session and queue state. Delivery pacing is dynamic: work arrives quickly when the queue is empty and slows as the queue grows, with additional modifiers from ownership warnings and PvP effects.

Queue management is an important part of the game because ticket value continuously decreases while work remains untouched.

---

## 🎲 Ticket Variety and Pacing

The ticket catalogue is stored as reusable templates in PostgreSQL and seeded from `src/data/ticket-templates.json`. The catalogue contains Service Desk, Networking, Systems, and Security work rather than relying on a tiny hard-coded pool.

Normal ticket selection also suppresses recently delivered ticket titles where possible. This reduces obvious repetition while still allowing common incidents to return naturally later. Mail Queue Backlog bursts use the same suppression so a burst does not normally contain duplicate templates.

Queue pacing is intentionally variable. An empty queue receives work quickly, while a growing backlog increases the delay before another normal ticket arrives. Ownership warnings slow personal intake and Poison effects can modify delivery speed.

The player is not shown an exact countdown. The queue simply indicates that more work is coming.

---

## ☠️ Abandoned Tickets

Ignoring a ticket does not make it disappear.

Eventually, neglected tickets breach their allowed time and are considered abandoned.

An abandoned ticket:

- Is automatically closed
- Costs Credits
- Counts against the player
- Can contribute toward bankruptcy

So technically ignoring your queue is a strategy.

It is simply not a very good one.

---

## 📈 Career Progression

Every player begins on the Service Desk.

```text
Service Desk Analyst
        ↓
Service Desk Analyst II
        ↓
Senior Service Desk Analyst
        ↓
Choose a Specialisation
```

At Level 4, players unlock specialist career paths.

### 🌐 Networking

```text
Network Engineer
        ↓
Senior Network Engineer
        ↓
Network Specialist
```

Networking players specialise in network-related tickets.

---

### 🖥️ Systems

```text
Systems Engineer
        ↓
Senior Systems Engineer
        ↓
Systems Specialist
```

Systems players specialise in infrastructure and systems-related tickets.

---

### 🔐 Security

```text
Security Analyst
        ↓
Security Engineer
        ↓
Security Specialist
```

Security players specialise in security-related incidents.

---

## 🌎 Dynamic Resolver Teams

The available ticket pool changes based on the players currently active in the game.

If the active IT department contains only Service Desk players, the game primarily generates Service Desk work.

As specialists come online, their ticket categories can enter circulation.

For example:

```text
Active Players

2 × Service Desk
1 × Network Engineer
1 × Security Analyst

        ↓

Available Ticket Pool

Service Desk
Networking
Security
```

This means the game naturally becomes more complex as the active IT department grows.

A specialist logging in can effectively introduce an entirely new category of problems into the environment.

Very realistic.

---

## 🟢 Active Players

The game tracks currently active players using their authenticated sessions.

Players can see who is currently online along with information such as:

- Username
- Career role
- Level
- Current queue size
- Online status

This information is important when deciding where to route tickets.

Sending a ticket to the correct resolver team is useful.

Sending it to somebody with twelve tickets already sitting in their queue is funnier.

---

## 💰 Credits

Credits are both the game's currency and a measure of whether your IT career is currently financially viable.

Credits are earned through:

- Correct ticket resolutions
- Correct ticket routing
- Career progression activities

Credits can be lost through:

- Incorrect resolutions
- Incorrect routing
- Abandoned tickets
- Queue penalty buyouts

Future mechanics will provide considerably more irresponsible ways to spend them.

---

## 💸 Bankruptcy

Reach **0 Credits** and your glorious IT career comes to an abrupt end.

Bankruptcy resets the player back to:

```text
Service Desk Analyst

Level:   1
XP:      0
Credits: Starting balance
```

The player's specialist career is removed and they must climb the IT ladder again.

Lifetime statistics remain.

So everyone can still see what happened.

---

## ⚔️ PvP

IT Wars is designed around turning ordinary IT processes into multiplayer weapons.

Ticket bouncing already allows players to affect other players' queues.

The PvP system expands this considerably. Players can purchase Poison Tickets and send disruptive incidents directly to another player.

For example:

```text
Buy Security Incident
        ↓
Choose Victim
        ↓
Send Ticket
        ↓
Their Queue Gets Worse
        ↓
Pretend It Wasn't You
```

The goal is to make the ticket queue itself the PvP battlefield.

---

## 💀 PvP Kills

Bankruptcy is also intended to become part of the PvP system.

Players who successfully cause another player's financial collapse through game mechanics can earn PvP statistics.

Player profiles currently track:

```text
Kills
Bankruptcies
```

PvP kills and bankruptcies contribute to lifetime competitive statistics.

---

## 🏆 Leaderboard

IT Wars includes a competitive leaderboard for comparing players across the IT department.

Leaderboard scoring can incorporate performance such as:

- Tickets resolved
- Correct routing
- Lifetime Credits earned
- PvP kills
- Bankruptcies

The goal is to reward players who perform well across the entire game rather than simply hoarding Credits.

Because apparently even fictional IT departments need KPIs.

---

## 👥 Player Directory

Players can view the wider IT department and see information about other players.

The player directory includes information such as:

```text
Username
Online Status
Career
Level
XP
Queue Size
Credits
Tickets Resolved
Correct Routes
Incorrect Routes
```

This provides useful information for routing decisions and future PvP mechanics.

It also lets you see exactly who has been avoiding their queue all afternoon.

---

## 📊 Player Statistics

IT Wars focuses its statistics on lifetime performance so bankruptcy resets the current career without erasing the player's history.

Examples include:

- Tickets resolved
- Correct ticket routes
- Incorrect ticket routes
- Lifetime Credits earned
- PvP kills
- Bankruptcies

Lifetime statistics survive bankruptcy so a player's complete history of questionable IT decisions remains visible.

---

## 🚧 Current Development Status

IT Wars is under active development.

### Implemented

```text
Authentication
      ↓
Player Accounts
      ↓
Automatic Ticket Delivery
      ↓
Ticket Value Decay
      ↓
Resolve / Bounce
      ↓
Credits + Career XP
      ↓
Ownership Penalties
      ↓
Ticket Abandonment
      ↓
Bankruptcy
      ↓
Promotions
      ↓
Career Specialisation
      ↓
Dynamic Ticket Categories
      ↓
Active Players
      ↓
Player Directory
      ↓
Leaderboard
      ↓
PvP Poison Tickets
      ↓
Career Abilities
      ↓
Dynamic Queue Pacing
      ↓
Recent-Ticket Variety Suppression
```

---

## 🔨 Planned Features

Major systems still planned or being expanded include:

- Continued PvP balancing and additional attack types
- Specialist demand incentives and career-path balancing
- Optional specialist switching / retraining mechanics
- More ticket severities and consequences
- Continued ticket-template expansion and polish
- Expanded leaderboard and lifetime statistics
- Economy and progression balancing
- Improved onboarding and username moderation
- Continued mobile interface polish
- Production deployment
- Administration tools
- Seasonal or long-term progression systems

And, inevitably, whatever terrible ideas appear during testing.

---

## 🛠️ Tech Stack

IT Wars is currently built with:

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **PostgreSQL**
- **Prisma**
- **Better Auth**
- **Docker**

The game is designed to be self-hosted.

---

## 🧠 Game Philosophy

IT Wars takes normal IT support concepts and turns them into game mechanics.

```text
Ticket Queues       → Resource Management
Escalations         → Strategy
Resolver Groups     → Character Classes
Career Progression  → Levelling
Credits             → Economy
Bad Routing         → PvP
Backlogs            → Pressure
Bankruptcy          → Death
Service Desk        → Spawn Point
```

The mechanics are intentionally inspired by recognisable IT support situations without trying to become a serious IT simulator.

IT Wars should feel familiar to somebody who has worked in IT while still being understandable to somebody who hasn't.

---

## 💡 Why IT Wars?

IT Wars started from a simple idea:

> **What if all the annoying parts of working on an IT Service Desk were game mechanics?**

Ticket queues become progression.

Ticket bouncing becomes PvP.

Escalations become strategy.

Resolver teams become character classes.

Bankruptcy becomes death.

Getting sent back to Service Desk becomes respawning.

And getting promoted actually unlocks something.

---

## 📜 License

This project is currently a personal development project.

License information will be added before public release.