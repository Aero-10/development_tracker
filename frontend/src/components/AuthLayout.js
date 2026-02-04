const AuthLayout = ({ title, children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-secondary">
        <h2 className="text-2xl font-semibold text-center mb-6 text-primary">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
