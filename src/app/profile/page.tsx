// app/profile/page.tsx
"use client";
import { useUser } from "@clerk/nextjs";

export default function ProfilePage() {
  const { user } = useUser();

  if (!user) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Welcome, {user.firstName}!</h2>
      <p>Email: {user.emailAddresses[0].emailAddress}</p>
    </div>
  );
}
