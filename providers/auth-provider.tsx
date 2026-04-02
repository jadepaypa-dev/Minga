import { AuthContext } from "@/hooks/use-auth-context";
import { supabase } from "@/lib/supabase";
import { PropsWithChildren, useEffect, useState } from "react";

export default function AuthProvider({ children }: PropsWithChildren) {
  const [claims, setClaims] = useState<
    Record<string, any> | undefined | null
  >();
  const [profile, setProfile] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchClaims = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.auth.getClaims();

      if (error) console.error("Error fetching claims:", error);

      setClaims(data?.claims ?? null);
      // 👇 Don't set isLoading false here — let fetchProfile do it
    };

    fetchClaims();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, _session) => {
      setIsLoading(true);

      if (_event === "SIGNED_OUT") {
        setClaims(null);
        setProfile(null);
        setIsLoading(false);
        return;
      }

      const { data } = await supabase.auth.getClaims();
      const newClaims = data?.claims ?? null;
      setClaims(newClaims);

      if (!newClaims) {
        setProfile(null);
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch profile when claims change
  useEffect(() => {
    const fetchProfile = async () => {
      // 👇 Only fetch if claims is resolved (not undefined)
      if (claims === undefined) return;

      setIsLoading(true);

      if (claims) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", claims.sub)
          .single();

        setProfile(data);
      } else {
        setProfile(null);
      }

      setIsLoading(false); // ✅ Only set false after profile is fetched
    };

    fetchProfile();
  }, [claims]);

  return (
    <AuthContext.Provider
      value={{
        claims,
        isLoading,
        profile,
        isLoggedIn: !!claims,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
