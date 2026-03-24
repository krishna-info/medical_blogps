export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 py-8 border-t">
      <div className="container mx-auto px-4 text-center text-gray-600">
        <p>Medical Disclaimer: This website provides informational content and does not substitute professional medical advice.</p>
        <p className="mt-4">&copy; {new Date().getFullYear()} Medical Blog. All rights reserved.</p>
      </div>
    </footer>
  );
}
