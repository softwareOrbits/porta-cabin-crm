export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4 px-6">
      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Developed by{' '}
          <a 
            href="https://softwareorbits.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
          >
            SoftwareOrbits
          </a>
        </p>
      </div>
    </footer>
  );
}