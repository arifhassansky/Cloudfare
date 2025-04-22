const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="text-center py-4 text-gray-600 border-t border-gray-300 mt-10 bg-gray-100">
      &copy; {year} Cloudfare. All rights reserved.
    </footer>
  );
};

export default Footer;
