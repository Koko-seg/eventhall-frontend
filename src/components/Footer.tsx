import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 sm:py-12 animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="animate-fade-in-left sm:col-span-2 md:col-span-1">
            <div className="text-xl sm:text-2xl font-bold text-amber-400 mb-4">
              EventHalls
            </div>
            <p className="text-gray-400 text-sm sm:text-base">
              Your premier destination for exceptional event venues.
            </p>
          </div>
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <h4 className="font-semibold mb-4 text-sm sm:text-base">
              Quick Links
            </h4>
            <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
              <li>
                <Link
                  href="/explore"
                  className="hover:text-amber-400 transition-all duration-500 hover:translate-x-2 hover:scale-105 inline-block"
                >
                  Explore Venues
                </Link>
              </li>
            </ul>
          </div>
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <h4 className="font-semibold mb-4 text-sm sm:text-base">Support</h4>
            <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
              <li>
                <a
                  href="#"
                  className="hover:text-amber-400 transition-all duration-500 hover:translate-x-2 hover:scale-105 inline-block"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-amber-400 transition-all duration-500 hover:translate-x-2 hover:scale-105 inline-block"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-amber-400 transition-all duration-500 hover:translate-x-2 hover:scale-105 inline-block"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          <div className="animate-fade-in-right">
            <h4 className="font-semibold mb-4 text-sm sm:text-base">Connect</h4>
            <p className="text-gray-400 text-sm sm:text-base">
              Follow us for the latest updates and venue spotlights.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
