export default function AuthLayout({ children }) {
  return (
    <div>
      <div className="text-center bg-gray-800">
        <h4>Auth Pages</h4>
      </div>
      {children}
    </div>
  );
}
