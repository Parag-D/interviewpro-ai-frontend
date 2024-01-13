"use client";

import AuthApi from "@/api/auth";
import { removeAccessToken, setAccessToken } from "@/helpers/token";
import { UserResponse } from "@/types/auth";
import userStore from "@/store/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";

const Navbar = () => {
  const router = useRouter();
  const { isLoading, setIsLoading, setUser, user } = userStore();

  const logout = useCallback(() => {
    removeAccessToken();
    setUser(undefined);
    router.replace("/login");
  }, []);

  useEffect(() => {
    async function getProfile() {
      setIsLoading(true);
      try {
        const data = await AuthApi.getUserProfile();
        if (data.success) {
          setUser(data.data as UserResponse);
          if (data.data.token?.access_token) {
            setAccessToken(data.data.token.access_token);
          }
          router.replace("/");
        } else {
          logout();
        }
      } catch (error) {
        logout();
      } finally {
        setIsLoading(false);
      }
    }

    getProfile();
  }, []);

  return (
    <nav className="flex justify-between py-3 px-10">
      <Link href="/">Home</Link>
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <p>{user.name}</p>
            <Button onClick={logout}>
              <LogOutIcon /> Logout
            </Button>
          </>
        ) : (
          <>
            <Link href="/register">Register</Link>
            <Link href="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
