# IT Wars

**Survive the Service Desk. Climb the IT ladder. Make your coworkers regret logging in.**

IT Wars is a multiplayer browser game inspired by the chaos of working in IT support.

Players start as a **Service Desk Analyst**, handle incoming tickets, earn Credits and Career XP, get promoted, specialise into IT career paths, and interfere with other players through ticket routing and PvP.

> **Resolve your tickets, route them correctly, and try not to become somebody else's problem.**

---

## 🎮 Gameplay

Every player has their own ticket queue.

Tickets automatically arrive while the player is active and include:

- Title and description
- Hidden resolver team
- Severity
- Credit value
- Career XP reward
- Success and failure outcomes

Ticket value decreases as the ticket gets older.

Eventually a ticket can reach:

```text
0 CR
```

It can still be resolved for XP, but the Credit reward is gone.

Leave tickets for too long and they can become abandoned, costing Credits.

---

## 🎫 Resolve or Bounce

Players can either **Resolve** a ticket or **Bounce** it to another player.

Correct resolutions earn:

- Credits
- Career XP
- Resolution statistics

Correct routing can also earn Credits and XP.

Incorrect decisions cost Credits.

Most importantly, bounced tickets actually move into the other player's queue.

Welcome to IT.

---

## ⚠️ Ownership Warnings

Players are expected to resolve work they are capable of handling.

Bouncing a ticket that you could have resolved can trigger an **Ownership Warning**, temporarily slowing your personal ticket intake.

Players can wait for the warning to expire or pay Credits to remove it.

Specialists can return Service Desk work to Service Desk players without receiving this penalty.

---

## ⏱️ Dynamic Ticket Queue

Tickets arrive automatically while players are active.

The exact delivery timer is hidden.

Queue pacing changes depending on the player's workload:

```text
Empty Queue
     ↓
Faster Delivery
     ↓
Growing Queue
     ↓
Slower Delivery
```

Ownership warnings and PvP effects can also influence ticket delivery.

Ticket templates are stored in PostgreSQL and include work across Service Desk, Networking, Systems, and Security.

Recent-ticket suppression helps prevent the same tickets appearing repeatedly.

---

## 📈 Career Progression

Every player starts on the Service Desk.

```text
Service Desk Analyst
        ↓
Service Desk Analyst II
        ↓
Senior Service Desk Analyst
        ↓
Choose a Specialisation
```

At Level 4, players can specialise into:

### 🌐 Networking

```text
Network Engineer
→ Senior Network Engineer
→ Network Specialist
```

### 🖥️ Systems

```text
Systems Engineer
→ Senior Systems Engineer
→ Systems Specialist
```

### 🔐 Security

```text
Security Analyst
→ Security Engineer
→ Security Specialist
```

Specialists gain access to their own ticket categories and career abilities as they progress.

---

## 🌎 Dynamic Resolver Teams

The available ticket categories depend on which specialists are currently active.

For example:

```text
2 × Service Desk
1 × Network
1 × Security

        ↓

Service Desk Tickets
Network Tickets
Security Tickets
```

A specialist coming online can therefore introduce a new category of problems into the game.

Very realistic.

---

## ⚔️ PvP

IT Wars turns the ticket queue into the PvP battlefield.

Players can purchase **Poison Tickets** and target other players with disruptive incidents.

```text
Buy Poison
     ↓
Choose Victim
     ↓
Attack
     ↓
Their Queue Gets Worse
```

Ticket bouncing also allows players to deliberately send work into another player's queue.

PvP statistics include **Kills** and **Bankruptcies**.

---

## 💰 Credits & Bankruptcy

Credits are earned through successful ticket handling and lost through mistakes, abandoned tickets, penalties and PvP.

Reach **0 Credits** and the player goes bankrupt.

Bankruptcy resets the current career:

```text
Level:   1
XP:      0
Career:  Service Desk
Credits: Starting Balance
```

Lifetime statistics remain.

So everyone can still see what happened.

---

## 🏆 Leaderboard & Players

IT Wars includes a leaderboard based on lifetime performance.

Players can also view the IT department to see information including:

- Username
- Online status
- Career
- Level
- XP
- Queue size
- Credits
- Ticket statistics

This information can help with legitimate ticket routing.

Or choosing who to annoy.

---

## 💬 Feedback & Administration

Players can submit feedback directly through IT Wars.

Administrators have a protected administration area for managing:

- Players
- Tickets
- Ticket templates
- PvP
- Feedback

This allows the game to be managed without directly modifying the database.

---

## 🚧 Current Features

```text
Authentication
Player Accounts
Automatic Ticket Delivery
Dynamic Queue Pacing
Ticket Value Decay
Resolve / Bounce
Credits + Career XP
Ownership Warnings
Ticket Abandonment
Bankruptcy
Career Progression
Career Specialisation
Career Abilities
Dynamic Ticket Categories
Active Players
Player Directory
Leaderboard
PvP Poison Tickets
Ticket Variety Suppression
Feedback System
Administration Tools
```

IT Wars is under active development.

---

## 🛠️ Tech Stack

IT Wars is built with:

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **PostgreSQL**
- **Prisma**
- **Better Auth**
- **Docker**

The game is self-hosted.

---

## 🧠 The Idea

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

It started from one question:

> **What if all the annoying parts of working on an IT Service Desk were game mechanics?**

Apparently, the answer was IT Wars.

---

## 📜 License

IT Wars is currently a personal development project.

License information will be added if the project is publicly released.