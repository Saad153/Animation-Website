export function Footer() {
  return (
    <footer className="bg-black text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-400">
            Developed by{" "}
            <a
              href="https://www.linkedin.com/company/haildot-technologies/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Hail. Technologies
            </a>
          </div>
          <div className="text-sm text-gray-400">   
            © Gravity 2026 All Rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
