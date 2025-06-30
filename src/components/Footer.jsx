const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-100 text-center py-4">
        <p className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Team Management Dashboard. All
          rights reserved.
        </p>
      </footer>
    </div>
  );
};
export default Footer;
