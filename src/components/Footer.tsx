export default function Footer() {
  return (
    <footer className="bg-white text-black py-8 mt-12 border-b-8 border-primary">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} Vezta. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
