export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="container mx-auto px-4 text-center">
        <p>
          Codeado con ❤️ por{" "}
          <a 
            href="https://github.com/Kalalo7" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            Kalalo7
          </a>
        </p>
        <p className="mt-2 text-gray-400 text-sm">
          © {new Date().getFullYear()} ¿Que Veo? - Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}