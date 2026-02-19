import useGitHub from "../hooks/useGitHub";

export function GitHubUser({ userName }: { userName: string }) {
  const { user, loading, error } = useGitHub(userName);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!user) return null;

  const created = new Date(user.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="user-card">
      <img className="avatar" src={user.avatar_url} alt={user.name} />
      <span className="user-name">{user.name}</span>
      {user.bio && <p className="user-bio">{user.bio}</p>}
      <div className="user-info">
        <div className="info-row">
          <span className="label">Location</span>
          <span className="value">{user.location ?? "N/A"}</span>
        </div>
        <div className="info-row">
          <span className="label">Blog</span>
          <span className="value">
            {user.blog ? (
              <a href={user.blog} target="_blank" rel="noreferrer">
                {user.blog.replace(/^https?:\/\//, "")}
              </a>
            ) : (
              "N/A"
            )}
          </span>
        </div>
        <div className="info-row">
          <span className="label">Public repos</span>
          <span className="value">{user.public_repos}</span>
        </div>
        <div className="info-row">
          <span className="label">Joined</span>
          <span className="value">{created}</span>
        </div>
      </div>
    </div>
  );
}
