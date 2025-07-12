"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import type { User } from "@supabase/supabase-js";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obtener usuario actual
    const sessionUser = supabase.auth.getUser();

    sessionUser.then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    // Escuchar cambios de sesión (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}
