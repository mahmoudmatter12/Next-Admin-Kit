"use client";

import { useUser } from "@/contexts/userContext";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  GraduationCap,
  Library,
  NotebookPen,
  Shield,
  UserCheck,
  CheckCircle,
  LogIn,
  LogOut,
  RefreshCw,
} from "lucide-react";
import { SignOutButton } from "@/components/auth/SignOutButton";

interface AdminAuthGuardProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireSuperAdmin?: boolean;
  requireOwner?: boolean;
  skipAnimations?: boolean;
}

// Loading screen component for AdminAuthGuard
function AuthLoadingScreen({
  message,
  skipAnimations = false,
}: {
  message: string;
  skipAnimations?: boolean;
}) {
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(skipAnimations);

  useEffect(() => {
    if (skipAnimations) {
      setShowContent(true);
      setProgress(100);
      return;
    }

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 2;
      });
    }, 200);

    // Show content after a brief delay
    const timeout = setTimeout(() => {
      setShowContent(true);
    }, 300);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [skipAnimations]);

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-setup-primary p-4">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -left-[20%] -top-[20%] h-[60%] w-[60%] rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -right-[20%] -bottom-[20%] h-[60%] w-[60%] rounded-full bg-slate-700/20 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {showContent && (
          <>
            {skipAnimations ? (
              <div className="mb-8 flex flex-col items-center">
                <Shield className="h-16 w-16 text-blue-400" />
                <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                  <span className="bg-linear-to-r from-blue-400 to-slate-200 bg-clip-text text-transparent">
                    Admin Portal
                  </span>
                </h1>
                <p className="mt-4 max-w-2xl text-lg text-slate-300">
                  {message}
                </p>
              </div>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-8 flex flex-col items-center"
                >
                  <motion.div
                    animate={{
                      rotate: [0, 15, -15, 0],
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                  >
                    <Shield className="h-16 w-16 text-blue-400" />
                  </motion.div>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
                  >
                    <span className="bg-linear-to-r from-blue-400 to-slate-200 bg-clip-text text-transparent">
                      Admin Portal
                    </span>
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-4 max-w-2xl text-lg text-slate-300"
                  >
                    {message}
                  </motion.p>
                </motion.div>

                {/* Progress bar */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="mt-8 w-full max-w-md"
                >
                  <div className="mb-2 flex justify-between text-sm text-slate-300">
                    <span>Verifying permissions...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-700">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                      className="h-full bg-linear-to-r from-blue-500 to-blue-300"
                    />
                  </div>
                </motion.div>
              </>
            )}
          </>
        )}

        {/* Floating security icons */}
        {!skipAnimations &&
          [...Array(6)].map((_, i) => {
            const icons = [
              Shield,
              UserCheck,
              GraduationCap,
              BookOpen,
              Library,
              NotebookPen,
            ];
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={i}
                animate={{
                  opacity: [0, 0.4, 0],
                  y: [0, -40],
                  rotate: [0, 180],
                }}
                transition={{
                  duration: 3 + Math.random() * 4,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute text-blue-400/30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              >
                <Icon className="h-6 w-6" />
              </motion.div>
            );
          })}

        {/* Grid pattern */}
        <div className="absolute inset-0 -z-10 overflow-hidden opacity-10">
          <div className="absolute inset-0 bg-radial-gradient(circle_at_center,_var(--tw-gradient-stops)) from-transparent via-transparent to-blue-500/10"></div>
          <div className="h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2 transform bg-linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px) size-[40px_40px]"></div>
        </div>
      </div>

      {/* Light effects */}
      <div className="absolute top-0 left-0 right-0 h-1/4 bg-linear-gradient-to-b from-white/5 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-linear-gradient-to-t from-white/5 to-transparent"></div>
    </div>
  );
}

// Access granted success screen
function AccessGrantedScreen({
  role,
  skipAnimations = false,
}: {
  role: string;
  skipAnimations?: boolean;
}) {
  const [showContent, setShowContent] = useState(skipAnimations);

  useEffect(() => {
    if (skipAnimations) {
      setShowContent(true);
      return;
    }

    const timeout = setTimeout(() => {
      setShowContent(true);
    }, 300);

    return () => clearTimeout(timeout);
  }, [skipAnimations]);

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden  p-4">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -left-[20%] -top-[20%] h-[60%] w-[60%] rounded-full bg-green-500/20 blur-3xl" />
        <div className="absolute -right-[20%] -bottom-[20%] h-[60%] w-[60%] rounded-full bg-slate-700/20 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {showContent &&
          (skipAnimations ? (
            <div className="mb-8 flex flex-col items-center">
              <CheckCircle className="h-16 w-16 text-green-400" />
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                <span className="bg-linear-to-r from-green-400 to-slate-200 bg-clip-text text-transparent">
                  Access Granted
                </span>
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-slate-300">
                Welcome to the Admin Portal. You have {role.toLowerCase()}{" "}
                privileges.
              </p>
              <div className="mt-6">
                <div className="flex items-center space-x-2 text-green-400">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm">Authentication successful</span>
                </div>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-8 flex flex-col items-center"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              >
                <CheckCircle className="h-16 w-16 text-green-400" />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
              >
                <span className="bg-linear-to-r from-green-400 to-slate-200 bg-clip-text text-transparent">
                  Access Granted
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-4 max-w-2xl text-lg text-slate-300"
              >
                Welcome to the Admin Portal. You have {role.toLowerCase()}{" "}
                privileges.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-6"
              >
                <div className="flex items-center space-x-2 text-green-400">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm">Authentication successful</span>
                </div>
              </motion.div>
            </motion.div>
          ))}

        {/* Grid pattern */}
        <div className="absolute inset-0 -z-10 overflow-hidden opacity-10">
          <div className="absolute inset-0 bg-radial-gradient(circle_at_center,_var(--tw-gradient-stops)) from-transparent via-transparent to-green-500/10"></div>
          <div className="h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2 transform bg-linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px) size-[40px_40px]"></div>
        </div>
      </div>

      {/* Light effects */}
      <div className="absolute top-0 left-0 right-0 h-1/4 bg-linear-gradient-to-b from-white/5 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-linear-gradient-to-t from-white/5 to-transparent"></div>
    </div>
  );
}

// Access denied screen component with login/logout button
function AccessDeniedScreen({
  title,
  message,
  isGuestUser = false,
  isSignedIn = false,
  errorMessage,
  onRecheck,
  skipAnimations = false,
}: {
  title: string;
  message: string;
  isGuestUser?: boolean;
  isSignedIn?: boolean;
  errorMessage?: string;
  onRecheck?: () => void;
  skipAnimations?: boolean;
}) {
  const router = useRouter();
  const [isRechecking, setIsRechecking] = useState(false);

  const handleLogin = () => {
    router.push("/login");
  };

  const handleRecheck = async () => {
    if (onRecheck) {
      setIsRechecking(true);
      try {
        await onRecheck();
      } finally {
        // Keep loading state for a bit to show feedback
        setTimeout(() => setIsRechecking(false), 500);
      }
    }
  };

  // Use error message if provided, otherwise use the default message
  const displayMessage = errorMessage || message;

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-setup-primary p-4">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -left-[20%] -top-[20%] h-[60%] w-[60%] rounded-full bg-red-500/20 blur-3xl" />
        <div className="absolute -right-[20%] -bottom-[20%] h-[60%] w-[60%] rounded-full bg-slate-700/20 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {skipAnimations ? (
          <div className="mb-8 flex flex-col items-center">
            <Shield className="h-16 w-16 text-red-400" />
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              <span className="bg-linear-to-r from-red-400 to-slate-200 bg-clip-text text-transparent">
                {title}
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-300">
              {displayMessage}
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              {isSignedIn ? (
                <>
                  {/* Show recheck button for guest users */}
                  {isGuestUser && onRecheck && (
                    <button
                      onClick={handleRecheck}
                      disabled={isRechecking}
                      className="flex items-center space-x-2 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <RefreshCw
                        className={`h-5 w-5 ${isRechecking ? "animate-spin" : ""}`}
                      />
                      <span>
                        {isRechecking ? "Checking..." : "Recheck Admin Access"}
                      </span>
                    </button>
                  )}
                  {/* Show logout button if user is already signed in (to prevent redirect loops) */}
                  <SignOutButton>
                    <button className="flex items-center space-x-2 rounded-lg bg-red-600 px-6 py-3 text-white hover:bg-red-700 transition-colors duration-200">
                      <LogOut className="h-5 w-5" />
                      <span>Log out</span>
                    </button>
                  </SignOutButton>
                </>
              ) : (
                // Show login button only if user is not signed in
                <button
                  onClick={handleLogin}
                  className="flex items-center space-x-2 rounded-lg bg-red-600 px-6 py-3 text-white hover:bg-red-700 transition-colors duration-200"
                >
                  <LogIn className="h-5 w-5" />
                  <span>Login to Continue</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex flex-col items-center"
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                y: [0, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              <Shield className="h-16 w-16 text-red-400" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
            >
              <span className="bg-linear-to-r from-red-400 to-slate-200 bg-clip-text text-transparent">
                {title}
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-4 max-w-2xl text-lg text-slate-300"
            >
              {displayMessage}
            </motion.p>

            {/* Login/Logout/Recheck buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
            >
              {isSignedIn ? (
                <>
                  {/* Show recheck button for guest users */}
                  {isGuestUser && onRecheck && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.7 }}
                      onClick={handleRecheck}
                      disabled={isRechecking}
                      className="flex items-center space-x-2 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <RefreshCw
                        className={`h-5 w-5 ${isRechecking ? "animate-spin" : ""}`}
                      />
                      <span>
                        {isRechecking ? "Checking..." : "Recheck Admin Access"}
                      </span>
                    </motion.button>
                  )}
                  {/* Show logout button if user is already signed in (to prevent redirect loops) */}
                  <SignOutButton>
                    <button className="flex items-center space-x-2 rounded-lg bg-red-600 px-6 py-3 text-white hover:bg-red-700 transition-colors duration-200">
                      <LogOut className="h-5 w-5" />
                      <span>Log out</span>
                    </button>
                  </SignOutButton>
                </>
              ) : (
                // Show login button only if user is not signed in
                <button
                  onClick={handleLogin}
                  className="flex items-center space-x-2 rounded-lg bg-red-600 px-6 py-3 text-white hover:bg-red-700 transition-colors duration-200"
                >
                  <LogIn className="h-5 w-5" />
                  <span>Login to Continue</span>
                </button>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* Grid pattern */}
        <div className="absolute inset-0 -z-10 overflow-hidden opacity-10">
          <div className="absolute inset-0 bg-radial-gradient(circle_at_center,_var(--tw-gradient-stops)) from-transparent via-transparent to-red-500/10"></div>
          <div className="h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2 transform bg-linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px) size-[40px_40px]"></div>
        </div>
      </div>

      {/* Light effects */}
      <div className="absolute top-0 left-0 right-0 h-1/4 bg-linear-gradient-to-b from-white/5 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-linear-gradient-to-t from-white/5 to-transparent"></div>
    </div>
  );
}

export const AdminAuthGuard: React.FC<AdminAuthGuardProps> = ({
  children,
  requireAdmin = true,
  requireSuperAdmin = false,
  requireOwner = false,
  skipAnimations = false,
}) => {
  const { isSignedIn, isLoaded: clerkLoaded } = useAuth();
  const {
    user,
    loading: userLoading,
    error: userError,
    refetchUser,
  } = useUser();
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [authState, setAuthState] = useState<
    "loading" | "checking" | "success" | "denied" | "error"
  >("loading");

  useEffect(() => {
    // Reset auth state when dependencies change
    setAuthState("checking");

    if (!clerkLoaded) {
      setAuthState("loading");
      return;
    }

    if (!isSignedIn) {
      setAuthState("denied");
      return;
    }

    if (userLoading) {
      setAuthState("loading");
      return;
    }

    if (userError) {
      setAuthState("error");
      return;
    }

    if (isSignedIn && !user) {
      setAuthState("denied");
      return;
    }

    if (user) {
      // Use effective role for viewing permissions, but check actual role for ownership
      const roleToCheck = user.role;
      const isOwner = user.role === "OWNER"; // Always check actual role for ownership

      // Check owner permissions first (highest priority) - always check actual role
      if (requireOwner && !isOwner) {
        setAuthState("denied");
        return;
      }

      // Check admin permissions - use effective role for viewing
      if (
        requireSuperAdmin &&
        roleToCheck !== "SUPERADMIN" &&
        roleToCheck !== "OWNER" &&
        !isOwner
      ) {
        setAuthState("denied");
        return;
      }

      if (requireAdmin && roleToCheck === "GUEST") {
        setAuthState("denied");
        return;
      }

      // If we reach here, user has proper permissions
      setAuthState("success");
      if (!skipAnimations) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 2000); // Show success for 2 seconds
      }
    }
  }, [
    clerkLoaded,
    isSignedIn,
    userLoading,
    user,
    userError,
    requireAdmin,
    requireSuperAdmin,
    requireOwner,
    skipAnimations,
  ]);

  // Show loading while checking authentication
  if (authState === "loading" || !clerkLoaded || userLoading) {
    return (
      <AuthLoadingScreen
        message="Verifying your identity..."
        skipAnimations={skipAnimations}
      />
    );
  }

  // Show access denied screen if not signed in
  if (authState === "denied" && !isSignedIn) {
    return (
      <AccessDeniedScreen
        title="Authentication Required"
        message="Please login to access the admin portal."
        isSignedIn={false}
        skipAnimations={skipAnimations}
      />
    );
  }

  // Show access denied screen if user not found in database
  if (authState === "denied" && isSignedIn && !user) {
    return (
      <AccessDeniedScreen
        title="Account Setup Required"
        message="Your account needs to be set up. Please contact an administrator."
        isSignedIn={isSignedIn}
        skipAnimations={skipAnimations}
      />
    );
  }

  // Check final permissions and show access denied if needed
  if (authState === "denied" && user) {
    const roleToCheck = user.role;
    const isOwner = user.role === "OWNER"; // Always check actual role for ownership

    if (requireOwner && !isOwner) {
      return (
        <AccessDeniedScreen
          title="Access Denied"
          message="You need owner privileges to access this page."
          isSignedIn={isSignedIn}
          skipAnimations={skipAnimations}
        />
      );
    }

    if (
      requireSuperAdmin &&
      roleToCheck !== "SUPERADMIN" &&
      roleToCheck !== "OWNER" &&
      !isOwner
    ) {
      return (
        <AccessDeniedScreen
          title="Access Denied"
          message="You need super admin privileges to access this page."
          isSignedIn={isSignedIn}
          skipAnimations={skipAnimations}
        />
      );
    }

    if (requireAdmin && roleToCheck === "GUEST") {
      return (
        <AccessDeniedScreen
          title="Access Denied"
          isGuestUser={true}
          message="You are a guest user and need admin access to view this page. Please contact an administrator to upgrade your account."
          isSignedIn={isSignedIn}
          onRecheck={refetchUser}
          skipAnimations={skipAnimations}
        />
      );
    }
  }

  // Show error screen if there's an error
  if (authState === "error") {
    return (
      <AccessDeniedScreen
        title="Authentication Error"
        message={
          userError ||
          "An error occurred while verifying your identity. Please try again."
        }
        errorMessage={userError || undefined}
        isSignedIn={isSignedIn}
        skipAnimations={skipAnimations}
      />
    );
  }

  // Show success screen if user has proper permissions
  if (showSuccess && user && authState === "success") {
    return (
      <AccessGrantedScreen role={user.role} skipAnimations={skipAnimations} />
    );
  }

  // User is authenticated and has proper permissions
  if (authState === "success" && user) {
    return <>{children}</>;
  }

  // Fallback loading state
  return (
    <AuthLoadingScreen
      message="Finalizing authentication..."
      skipAnimations={skipAnimations}
    />
  );
};
