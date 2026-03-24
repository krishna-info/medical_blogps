export default function Header() {
  return (
    <header className="w-full bg-medical-blue text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="font-bold text-xl">Medical Blog</div>
        <nav className="space-x-4">
          <a href="/">Home</a>
          <a href="/blog">Blog</a>
          <a href="/category/cardiology">Categories</a>
          <a href="/about">About</a>
        </nav>
      </div>
    </header>
  );
}
