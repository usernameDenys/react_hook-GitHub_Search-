# GitHub User Search

A minimal React application that lets you search for any GitHub profile by username and displays their public information in real time.

## What It Does

Type a GitHub username into the input field and the app instantly fetches and renders the user's profile data from the GitHub REST API — no button click required. It shows:

- Avatar
- Name and bio
- Location
- Blog / website link
- Number of public repositories
- Account creation date

## Project Structure

```
src/
├── hooks/
│   └── useGitHub.ts        # Custom hook — all data-fetching logic lives here
├── components/
│   ├── FindeUser.tsx        # Search input + conditional rendering
│   └── GitHubUsers.tsx      # Profile card that consumes the hook
└── App.tsx                  # Root component
```

## Custom Hook — `useGitHub`

**File:** `src/hooks/useGitHub.ts`

The hook encapsulates every concern related to fetching a GitHub user profile:

```ts
const useGitHub = (userName: string) => { ... }
```

### Parameters

| Parameter  | Type     | Description                    |
|------------|----------|--------------------------------|
| `userName` | `string` | The GitHub username to look up |

### Returns

| Value     | Type                | Description                                     |
|-----------|---------------------|-------------------------------------------------|
| `user`    | `UserTypes \| null` | Parsed user object on success, `null` otherwise |
| `loading` | `boolean`           | `true` while the request is in flight           |
| `error`   | `string \| null`    | Human-readable error message, or `null`         |

### How It Works

1. `useEffect` runs every time `userName` changes.
2. If `userName` is an empty string the effect exits early — no unnecessary requests are made.
3. The hook calls `https://api.github.com/users/{userName}`.
4. Specific HTTP status codes are translated into friendly messages:
   - **404** → `"User not found. Check the username and try again."`
   - **403** → `"API rate limit exceeded. Please wait a minute and try again."`
5. The result (`user`, `loading`, `error`) is returned as a plain object and consumed by the `GitHubUser` component.


## Tech Stack

- **React 19** with TypeScript
- **Vite** — build tool and dev server
- GitHub REST API (public, no auth token required for basic profile lookups)

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173` and start typing a GitHub username.
