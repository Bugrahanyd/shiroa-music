import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#00CED1]/20 mt-20">
      <div className="container mx-auto px-6 py-8 text-center text-gray-500">
        <p>&copy; 2026 SHIROA. Everything for your sound.</p>
        <p className="text-sm mt-2">
          SHIROA bir{" "}
          <a href="https://hydrabon.com" target="_blank" rel="noopener noreferrer" className="text-[#00CED1] hover:text-[#5FE0E5] transition-colors">
            HYDRABON
          </a>
          {" "}iştirakidir.
        </p>
      </div>
    </footer>
  );
}
