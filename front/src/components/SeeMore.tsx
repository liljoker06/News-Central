export function SeeMore({ href }: { href: string }) {
    return (
      <div className="flex justify-center mt-6">
        <a href={href}         
          className="block w-full max-w-md mx-auto bg-gray-800 text-white py-3 px-6 rounded-md text-center font-medium tracking-wide shadow-md hover:bg-gray-700 transition-all duration-300 border border-gray-700 hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Voir plus
        </a>
      </div>
    );
  }