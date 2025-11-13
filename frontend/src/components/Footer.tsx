import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#00CED1]/20 mt-20">
      <div className="container mx-auto px-6 py-8 text-center text-gray-500">
        <p>&copy; 2026 SHIROA. Everything for your sound.</p>
        <p className="text-sm mt-2">
          SHIROA bir{" "}
          <a 
            href="https://hydrabon.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block font-bold bg-gradient-to-r from-[#00CED1] via-[#FF8C00] to-[#00CED1] bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient-shift hover:scale-110 transition-transform duration-300"
            style={{
              animation: 'gradient-shift 3s ease infinite'
            }}
          >
            HYDRABON
          </a>
          {" "}iştirakidir.
        </p>
      </div>
    </footer>
  );
}
