"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import vtexlogo from "@/assets/vtexlogo .png";
import Image from "next/image";
import { useAuthStore } from "@/store/authStore";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  // Get state and actions from the Zustand store
  const { isAuthenticated, isAuthInitialized, initializeAuth, logout } =
    useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const handleLogout = async () => {
    await logout();
    router.push("/auth/login");
  };

  return (
    <div className="border-b-1 border-[#0C5070] w-screen fixed top-8 z-50 px-8 h-[72px] [@media(min-width:1750px)]:h-[90px] bg-[#003F5C] text-white flex flex-row justify-between items-center">
      {/* Logo */}
      <div>
        <Link href={isAuthenticated ? "/customer-dashboard" : "/"}>
          {" "}
          {/* Link logo to dashboard if logged in */}
          <div className="ml-2 md:ml-4 cursor-pointer">
            <Image src={vtexlogo} alt="Vtex.AI" height={20} width={65} />
          </div>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex flex-row justify-center items-center gap-6 text-lg [@media(min-width:1750px)]:text-[24px] font-poppins">
        {/* Public Links */}
        <Link href="/">
          <div
            className={`cursor-pointer py-1 ${
              pathname === "/" ? "text-teal-400 font-bold" : "text-[#FFFFFF]"
            } hover:text-teal-300 transition`}
          >
            Home
          </div>
        </Link>
        <Link href="/offering">
          <div
            className={`cursor-pointer py-1 ${
              pathname === "/offering"
                ? "text-teal-400 font-bold"
                : "text-[#FFFFFF]"
            } hover:text-teal-300 transition`}
          >
            Our offerings
          </div>
        </Link>
        <Link href="/blogs">
          <div
            className={`cursor-pointer py-1 ${
              pathname === "/flexpick-plan"
                ? "text-teal-400 font-bold"
                : "text-[#FFFFFF]"
            } hover:text-teal-300 transition`}
          >
            FlexPick Marketplace
          </div>
        </Link>
        <Link href="/about-us">
          <div
            className={`cursor-pointer py-1 ${
              pathname === "/about-us"
                ? "text-teal-400 font-bold"
                : "text-[#FFFFFF]"
            } hover:text-teal-300 transition`}
          >
            About Us
          </div>
        </Link>
        <Link href="/partners">
          <div
            className={`cursor-pointer py-1 ${
              pathname === "/partners"
                ? "text-teal-400 font-bold"
                : "text-[#FFFFFF]"
            } hover:text-teal-300 transition`}
          >
            Partners
          </div>
        </Link>
        <Link href="/blogs">
          <div
            className={`cursor-pointer py-1 ${
              pathname === "/blogs"
                ? "text-teal-400 font-bold"
                : "text-[#FFFFFF]"
            } hover:text-teal-300 transition`}
          >
            Blogs
          </div>
        </Link>
        {/* Protected Links - Show only if authenticated */}
        {isAuthenticated && (
          <>
            <Link href="/flexpick-plan">
              <div
                className={`cursor-pointer py-1 ${
                  pathname === "/flexpick-plan"
                    ? "text-teal-400 font-bold"
                    : "text-[#FFFFFF]"
                } hover:text-teal-300 transition`}
              >
                FlexPick Plan
              </div>
            </Link>

            <Link href="/customer-dashboard">
              {/* Ensure correct path checking */}
              <div
                className={`cursor-pointer py-1 ${
                  pathname === "/customer-dashboard"
                    ? "text-teal-400 font-bold"
                    : "text-[#FFFFFF]"
                } hover:text-teal-300 transition`}
              >
                Dashboard
              </div>
            </Link>
          </>
        )}

        {/* Authentication Buttons - Conditional rendering */}
        <div className="ml-4">
          {!isAuthInitialized ? (
            // Optional: Show a loading state while checking auth
            <Button variant="custom" disabled className="font-medium p-5">
              Loading...
            </Button>
          ) : isAuthenticated ? (
            // Show Logout button if authenticated
            <Button
              variant="custom"
              onClick={handleLogout}
              className="font-medium p-5 cursor-pointer bg-red-600 hover:bg-red-700" // Example styling for logout
            >
              LOGOUT
            </Button>
          ) : (
            // Show Login button if not authenticated
            <Link href="/auth/login">
              <Button
                variant="custom"
                className="font-medium p-5 cursor-pointer"
              >
                LOGIN
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Navigation Trigger */}
      <div className="lg:hidden">
        <Sidebar
          isAuthenticated={isAuthenticated}
          isAuthInitialized={isAuthInitialized}
        />
      </div>
    </div>
  );
};

export default Navbar;
