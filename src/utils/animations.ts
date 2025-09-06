import { Variants } from 'framer-motion';

// Page transition animations
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 50,
    scale: 0.95
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  out: {
    opacity: 0,
    y: -50,
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

// Stagger animation for lists
export const containerVariants: Variants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1
    }
  }
};

// Individual item animations
export const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

// Match card hover effects
export const matchCardVariants: Variants = {
  rest: {
    scale: 1,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)"
  },
  hover: {
    scale: 1.02,
    boxShadow: "0 20px 25px rgba(107, 33, 168, 0.15)",
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1
    }
  }
};

// Live match pulse animation
export const livePulseVariants: Variants = {
  initial: {
    scale: 1,
    opacity: 1
  },
  animate: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Header navigation animations
export const navItemVariants: Variants = {
  rest: {
    y: 0,
    scale: 1
  },
  hover: {
    y: -2,
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1
    }
  }
};

// Modal animations
export const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 50
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 50,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

// League frame expand/collapse
export const leagueFrameVariants: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

// Button animations
export const buttonVariants: Variants = {
  rest: {
    scale: 1,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 8px 15px rgba(107, 33, 168, 0.2)",
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1
    }
  }
};

// Logo animation
export const logoVariants: Variants = {
  initial: {
    scale: 0,
    rotate: -180,
    opacity: 0
  },
  animate: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
};

// Score number animation
export const scoreVariants: Variants = {
  initial: {
    scale: 0.8,
    opacity: 0
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  update: {
    scale: [1, 1.2, 1],
    color: ["#6B21A8", "#DC2626", "#6B21A8"],
    transition: {
      duration: 0.6,
      ease: "easeInOut"
    }
  }
};

// Floating animation for live indicators
export const floatingVariants: Variants = {
  animate: {
    y: [0, -5, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Tab switching animation
export const tabContentVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    x: 20,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

// Glow effect animation
export const glowVariants: Variants = {
  initial: {
    boxShadow: "0 0 0 rgba(107, 33, 168, 0)"
  },
  animate: {
    boxShadow: [
      "0 0 20px rgba(107, 33, 168, 0.3)",
      "0 0 30px rgba(107, 33, 168, 0.6)",
      "0 0 20px rgba(107, 33, 168, 0.3)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Loading spinner variants
export const spinnerVariants: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// Stats bar animation
export const statsBarVariants: Variants = {
  initial: {
    width: 0,
    opacity: 0
  },
  animate: (percentage: number) => ({
    width: `${percentage}%`,
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeOut",
      delay: 0.2
    }
  })
};

// Mobile menu animation
export const mobileMenuVariants: Variants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  },
  open: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

// Error boundary animation
export const errorVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8,
    y: 50
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};