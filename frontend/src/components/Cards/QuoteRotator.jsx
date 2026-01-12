import React, { useEffect, useState } from "react";

const quotes = [
  {
    text: "Wealth is not about having a lot of money, it's about having a lot of options.",
    author: "Chris Rock",
    emoji: "💼✨",
  },
  {
    text: "Do not save what is left after spending. Spend what is left after saving.",
    author: "Warren Buffett",
    emoji: "💰📈",
  },
  {
    text: "The more you learn, the more you earn.",
    author: "Warren Buffett",
    emoji: "📚💡",
  },
  {
    text: "Your habits will determine your future wealth.",
    author: "Jack Ma",
    emoji: "🔁🏆",
  },
  {
    text: "Financial freedom is only a step away when discipline joins your goals.",
    author: "Financial Wisdom",
    emoji: "🔒➡️💎",
  },
  {
    text: "A budget is telling your money where to go instead of wondering where it went.",
    author: "Dave Ramsey",
    emoji: "🧾📊",
  },
  {
    text: "Small savings today lead to big opportunities tomorrow.",
    author: "Wealth Mindset",
    emoji: "🌱💵",
  }
];

const QuotesRotator = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % quotes.length);
        setFade(true);
      }, 500);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const q = quotes[index];

  return (
    <div className="text-center px-6 mt-8 select-none z-20">
      {/* Emoji: keep normal colored emoji by not using bg-clip-text on it */}
      <div
        className={`inline-block text-3xl mb-3 transition-opacity duration-500 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden
      >
        {q.emoji}
      </div>

      {/* Quote text: gradient clipped */}
      <p
        className={`text-xl font-bold bg-clip-text text-transparent 
          bg-gradient-to-r from-[#143c14] to-[#214f20]
          transition-opacity duration-800 ${fade ? "opacity-100" : "opacity-0"} drop-shadow-sm`}
      >
        {q.text}
      </p>

      <span
        className={`block mt-3 text-md font-medium text-[#000000]/80 
          transition-opacity duration-700 ${fade ? "opacity-100" : "opacity-0"}`}
      >
        — {q.author}
      </span>
    </div>
  );
};

export default QuotesRotator;

