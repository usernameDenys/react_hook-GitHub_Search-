import { useEffect, useState } from "react";
interface UserTypes {
  avatar_url: string;
  name: string;
  bio: string | null;
  location: string | null;
  blog: string | null;
  public_repos: number;
  created_at: string;
}
const useGitHub = (userName: string) => {
  const [user, setUser] = useState<UserTypes | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userName) return;

    const url = `https://api.github.com/users/${userName}`;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("User not found. Check the username and try again.");
          }
          if (response.status === 403) {
            throw new Error("API rate limit exceeded. Please wait a minute and try again.");
          }
          throw new Error(`GitHub error: ${response.status}`);
        }

        const userData: UserTypes = await response.json();
        setUser(userData);
        setLoading(false);
        console.log(userData);
      } catch (error) {
        setError((error as Error).message);
        setLoading(false);
      }
    };
    fetchData();
  }, [userName]);

  return { user, error, loading };
};

export default useGitHub;
