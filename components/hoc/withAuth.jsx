"use client";

import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation"; // For routing
import { useEffect } from "react";

const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const router = useRouter();
    const hasHydrated = useAuthStore.persist.hasHydrated();
    console.log(isAuthenticated);
    console.log(hasHydrated);
    useEffect(() => {
      if (hasHydrated && !isAuthenticated) {
        router.push("/login"); // Redirect if not authenticated
      }
    }, [isAuthenticated, hasHydrated, router]);

    // If not authenticated, return null (avoids flashing unprotected content)
    if (!hasHydrated) return null;

    // Render the wrapped component if authenticated
    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  return AuthenticatedComponent;
};

export default withAuth;
