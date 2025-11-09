export default function Footer() {
  return (
    <footer className="bg-black text-white py-6 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm mb-2">
          © 2025 HFF. MIT License
        </p>
        <p className="text-xs text-gray-400">
          <a 
            target="_blank" 
            href="https://icons8.com/icon/1427/film-reel"
            className="hover:text-gray-300 underline"
            rel="noopener noreferrer"
          >
            Film Reel
          </a>
          {" "}icon by{" "}
          <a 
            target="_blank" 
            href="https://icons8.com"
            className="hover:text-gray-300 underline"
            rel="noopener noreferrer"
          >
            Icons8
          </a>
        </p>
      </div>
    </footer>
  );
}