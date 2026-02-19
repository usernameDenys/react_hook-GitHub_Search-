import { useState } from "react";
import { GitHubUser } from "./GitHubUsers";

export function FindeUser() {
  const [userName, setUsername] = useState("");

  return (
    <div className="search-section">
      <h1>GitHub Search</h1>
      <input
        className="search-input"
        type="text"
        placeholder="Enter username..."
        onChange={(event) => setUsername(event.target.value)}
      />
      {userName ? (
        <GitHubUser userName={userName} />
      ) : (
        <p className="search-hint">Type a username to find a profile</p>
      )}
    </div>
  );
}
