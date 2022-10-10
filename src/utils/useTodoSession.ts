import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'

const useTodoSession = () => {
  const session = useSession();
  const [userId, setUserId] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (session.status === "loading") return;
    if (session.status === "unauthenticated") router.push("/login");
    setUserId(session.data?.user?.id || "");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return {
    userId,
    authenticated: session.status === "authenticated",
    sendToApp: () => router.push("/"),
    sendToLogout: () => router.push("/logout")
  }
}

export default useTodoSession