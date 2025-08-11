import { useAuth } from '../lib/auth';

export default function Profile() {
  const { user, signOut } = useAuth();
  if (!user) return <div>Please sign in</div>;
  return (
    <div>
      <p>{user.handle}</p>
      <button onClick={signOut}>Sign out</button>
    </div>
  );
}
