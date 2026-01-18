# AllPilar Web Solutions

## Tech Stack

| Category           | Technology              |
| ------------------ | ----------------------- |
| Framework          | Next.js 15              |
| Language           | TypeScript              |
| Styling            | Tailwind CSS            |
| Database           | MongoDB Atlas           |
| ORM                | Mongoose                |
| Authentication     | Auth.js                 |
| Data Visualization | Recharts                |
## Architecture

Allpilar follows a **Backend-for-Frontend (BFF)** architecture.

The client interacts exclusively with server-side logic through encrypted Server Actions. These actions handle all communication with external APIs and the database, ensuring:

* Improved security by keeping secrets server-only
* Reduced client complexity
* Better performance through controlled data fetching and caching

---

## Developer Principles and Best Practices

Allpilar was built with a strong focus on professional engineering standards:

* **Type Safety**
  Full TypeScript coverage across models, components, and server logic.

* **Security**
  All credentials and API tokens are handled strictly on the server. Authentication follows current OAuth and OpenID Connect best practices.

* **Performance**
  Optimized database access using Mongoose connection pooling and Next.js caching strategies.

* **User Experience**
  Fully responsive interface with accessible UI components, meaningful loading states, and clear data presentation.