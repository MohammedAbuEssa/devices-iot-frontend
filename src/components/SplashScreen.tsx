import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { Logo } from './Logo';

interface SplashScreenProps {
  onComplete?: () => void;
  duration?: number;
}

export function SplashScreen({ onComplete, duration = 3000 }: SplashScreenProps) {
  const [showContent, setShowContent] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const { actualTheme } = useTheme();
  useEffect(() => {
    // Show content after curtain animation starts
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 800);

    // Start exit animation after duration
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
      debugger;

      // Call onComplete after animation finishes
      setTimeout(() => {
        onComplete?.();
      }, 800); // Match animation duration
    }, duration);

    return () => {
      clearTimeout(contentTimer);
      clearTimeout(exitTimer);
    };
  }, [duration, onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      animate={isExiting ? { y: '-100%', opacity: 0 } : { y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
        {/* Curtain Background - static background */}
        <div 
          className={`absolute inset-0 ${
            actualTheme === 'dark' 
              ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black' 
              : 'bg-gradient-to-br from-blue-50 via-white to-gray-100'
          }`}
        />
        
        {/* Content - appears after curtain settles */}
        <AnimatePresence>
          {showContent && (
            <motion.div 
              className="relative z-10 flex flex-col items-center justify-center"
              initial={{ 
                opacity: 0,
                scale: 0.8,
                y: 30
              }}
              animate={{ 
                opacity: 1,
                scale: 1,
                y: 0
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: -20
              }}
              transition={{
                duration: 1,
                ease: "easeOut"
              }}
            >
              {/* Logo */}
              <motion.div 
                className="mb-8"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 4, opacity: 1 }}
                transition={{
                  duration: 1.2,
                  delay: 0.2,
                  ease: "easeOut"
                }}
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 2, -2, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5
                  }}
                >
                  <Logo size="xl" className="drop-shadow-lg" />
                </motion.div>
              </motion.div>
              
              {/* Project Name */}
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.5,
                  ease: "easeOut"
                }}
              >
                <motion.h1 
                  className={`text-5xl font-bold mb-4 ${
                    actualTheme === 'dark' 
                      ? 'text-white' 
                      : 'text-gray-800'
                  }`}
                  style={{
                    textShadow: actualTheme === 'dark' 
                      ? '0 4px 8px rgba(0,0,0,0.5)' 
                      : '0 4px 8px rgba(0,0,0,0.1)'
                  }}
                  animate={{
                    textShadow: actualTheme === 'dark' 
                      ? [
                          '0 4px 8px rgba(0,0,0,0.5)',
                          '0 6px 12px rgba(255,255,255,0.2), 0 4px 8px rgba(0,0,0,0.5)',
                          '0 4px 8px rgba(0,0,0,0.5)'
                        ]
                      : [
                          '0 4px 8px rgba(0,0,0,0.1)',
                          '0 6px 12px rgba(59,130,246,0.3), 0 4px 8px rgba(0,0,0,0.1)',
                          '0 4px 8px rgba(0,0,0,0.1)'
                        ]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                >
                  IoT Dashboard
                </motion.h1>
                <motion.p 
                  className={`text-xl font-medium ${
                    actualTheme === 'dark' 
                      ? 'text-gray-300' 
                      : 'text-gray-600'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 1,
                    delay: 0.8,
                    ease: "easeOut"
                  }}
                >
                  Smart Device Management
                </motion.p>
              </motion.div>
              
              {/* Loading Animation */}
              <motion.div 
                className="mt-12 flex space-x-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: 1.2,
                  ease: "easeOut"
                }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className={`w-3 h-3 rounded-full ${
                      actualTheme === 'dark' 
                        ? 'bg-white' 
                        : 'bg-blue-600'
                    }`}
                    animate={{
                      scale: [0.8, 1.3, 0.8],
                      opacity: [0.4, 1, 0.4],
                      y: [0, -8, 0]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.3
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
    </motion.div>
  );
}