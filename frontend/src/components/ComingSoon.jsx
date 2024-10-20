import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, Mail, Star } from "lucide-react";

export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted email:", email);
    setSubmitted(true);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-teal-800 to-blue-800 flex flex-col items-center justify-center p-4 text-center overflow-hidden relative">
      {/* Animated background elements */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 bg-white rounded-full opacity-10"
          initial={{ x: "100%", y: "100%" }}
          animate={{
            x: ["-100%", "100%"],
            y: ["-100%", "100%"],
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full space-y-8 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8 shadow-lg z-10"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Clock className="mx-auto h-20 w-20 text-teal-300" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-5xl font-bold text-white"
        >
          Coming Soon
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl text-teal-100"
        >
          We're developing something extraordinary. Be the first to know!
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-8 space-y-4"
        >
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 bg-white bg-opacity-20 border border-teal-200 border-opacity-30 rounded-md focus:ring-2 focus:ring-teal-300 text-white placeholder-teal-200 placeholder-opacity-70"
          />
          <Button
            type="submit"
            className="w-full bg-teal-500 text-blue-900 hover:bg-teal-400 transition-colors duration-300"
          >
            <Mail className="mr-2 h-4 w-4" />
            Notify Me
          </Button>
        </motion.form>

        {submitted && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-teal-200 mt-4"
          >
            Thank you! We'll notify you when we launch.
          </motion.p>
        )}
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        className="absolute bottom-4 left-4 text-teal-300 opacity-50"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Star className="h-8 w-8" />
      </motion.div>
      <motion.div
        className="absolute top-4 right-4 text-teal-300 opacity-50"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <Star className="h-6 w-6" />
      </motion.div>
    </div>
  );
}
