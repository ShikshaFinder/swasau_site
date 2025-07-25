"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Height from "@/components/height";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      // TODO: Implement actual password reset logic
      console.log("Password reset request for:", email);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess("Password reset link sent! Please check your email.");
      setEmail("");
    } catch (err) {
      setError("Failed to send reset link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      setError("Please enter your email address first.");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      // TODO: Implement resend logic
      console.log("Resending password reset for:", email);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess("Password reset link resent! Please check your email.");
    } catch (err) {
      setError("Failed to resend reset link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Height />
      <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Reset password
            </h1>
            <p className="text-muted-foreground">
              Enter your email to receive a password reset link
            </p>
          </div>

          {/* Forgot Password Form */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-600 text-sm"
                >
                  {error}
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 border border-green-200 rounded-lg p-3 text-green-600 text-sm"
                >
                  {success}
                </motion.div>
              )}

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200 bg-white"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sending reset link...
                  </div>
                ) : (
                  "Send reset link"
                )}
              </Button>
            </form>

            {/* Resend Link */}
            {success && (
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground mb-3">
                  Didn't receive the email? Check your spam folder or
                </p>
                <button
                  onClick={handleResend}
                  disabled={isLoading}
                  className="text-primary hover:text-primary/80 font-medium transition-colors duration-200 disabled:opacity-50"
                >
                  {isLoading ? "Sending..." : "Resend email"}
                </button>
              </div>
            )}

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-border"></div>
              <span className="px-4 text-sm text-muted-foreground">or</span>
              <div className="flex-1 border-t border-border"></div>
            </div>

            {/* Back to Login */}
            <div className="text-center">
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to sign in
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
