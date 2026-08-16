# IT Wars

**Survive the Service Desk. Climb the IT ladder. Make your coworkers regret logging in.**

IT Wars is a multiplayer, browser-based game inspired by life working in IT support.

Players start their career as a **Service Desk Analyst**, working incoming tickets to earn Credits and XP. As they progress, they receive promotions and eventually specialise into career paths such as **Networking, Systems, or Security**.

But this isn't just a ticket simulator.

Players can bounce tickets to other players, make bad routing decisions, overload other queues, and eventually spend Credits to send higher-level problems to other teams.

The goal is to turn the chaos of working in IT support into a competitive multiplayer game.

---

## 🎮 How It Works

Tickets automatically arrive in your personal queue.

Each ticket has:

- A description
- A hidden resolver team
- A maximum Credit value
- An XP reward
- A continuously decreasing value

The longer a ticket sits in your queue, the less it is worth.

Eventually, a neglected ticket can be worth:

```text
0 CR
```

You can still resolve it for XP, but you've lost the financial reward.

---

## 🎫 Resolve or Bounce

When a ticket arrives, you have a decision to make.

### Resolve

If you believe the ticket belongs to your team, resolve it.

Correct resolutions earn:

- Credits
- XP
- Career progression

Incorrect resolutions result in a penalty.

### Bounce

Think another team owns the problem?

Send it to another player.

Correct routing can earn rewards, but sending a ticket to the wrong team can cost you Credits.

The ticket still transfers — the receiving team is just angry that you've dumped something into their queue that doesn't belong there.

---

## ⚠️ Ownership Warnings

Service Desk players can also transfer Service Desk tickets to other Service Desk players.

However, if you transfer something that you could have resolved yourself, you'll receive an:

**Ownership Warning**

Your personal ticket intake is slowed for five minutes because you failed to take ownership of your work.

You can either:

- Accept the slowdown
- Pay Credits to immediately restore your queue priority

The penalty only affects your queue, not every Service Desk player.

---

## ⏱️ Ticket Queue

Tickets are delivered automatically rather than manually pulled.

Players can see when their next ticket is expected:

```text
NEXT TICKET

01:24
```

Queue management is an important part of the game.

Leaving tickets sitting around causes their Credit value to decay, and future mechanics will make overloaded queues increasingly difficult to manage.

---

## 📈 Career Progression

Everyone begins on the Service Desk.

```text
Service Desk Analyst
        ↓
Service Desk Analyst II
        ↓
Senior Service Desk Analyst
        ↓
Choose a Specialisation
```

Players can eventually specialise into:

### 🌐 Networking

```text
Network Engineer
Senior Network Engineer
Network Specialist
```

### 🖥️ Systems

```text
Systems Engineer
Senior Systems Engineer
Systems Specialist
```

### 🔐 Security

```text
Security Analyst
Security Engineer
Security Specialist
```

XP earned from handling tickets drives career progression.

---

## 💰 Credits

Credits are both the game's currency and an important part of surviving IT Wars.

Credits can be earned by correctly handling tickets and lost through poor decisions.

Planned uses for Credits include:

- Removing queue penalties
- Purchasing specialist tickets
- Sending tickets to other players
- PvP mechanics
- Career-related upgrades and bonuses

---

## ⚔️ PvP

IT Wars is being designed as a multiplayer game rather than just a ticket simulator.

One of the major planned mechanics allows players to spend Credits to purchase tickets belonging to specialist resolver teams and assign them to other players.

For example:

```text
Buy Security Incident
        ↓
Send to another player
        ↓
Their queue gets bigger
        ↓
They must resolve or route it
```

The idea is to weaponise the ticket queue.

---

## 🏆 Planned Features

IT Wars is currently under active development.

Planned features include:

- Automatic timed ticket delivery
- Queue backlog penalties
- Promotion bonuses
- Network career progression
- Systems career progression
- Security career progression
- Player-vs-player ticket attacks
- Purchasable specialist tickets
- Bankruptcy mechanics
- PvP kills
- Leaderboards
- Player statistics
- Queue pressure
- Mobile-friendly interface
- Improved game balancing
- Production deployment

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

The game is designed to eventually be self-hosted.

---

## 🚧 Development Status

**IT Wars is currently a work in progress.**

Core systems currently being developed and tested include:

```text
Authentication
      ↓
Player Account
      ↓
Timed Ticket Queue
      ↓
Resolve / Bounce
      ↓
Credits + XP
      ↓
Promotions
      ↓
Career Specialisation
      ↓
PvP
```

Game mechanics, XP requirements, Credit rewards, ticket timings, penalties, and progression are subject to change while balancing continues.

---

## 💡 Why IT Wars?

IT Wars started from a simple idea:

> What if all the annoying parts of working on an IT Service Desk were game mechanics?

Ticket queues become progression.

Ticket bouncing becomes PvP.

Escalations become strategy.

Resolver teams become character classes.

And getting promoted actually unlocks something.

---

## 📜 License

This project is currently a personal development project.

License information will be added before public release.