import LoginForm from "./_components/Login-form";

export default function LoginPage() {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left section */}
      <div className="flex flex-col justify-center items-center bg-white md:w-1/2 w-full px-6 py-10">
        <div className="w-48 sm:w-64 mb-8">
          <div className="bg-gray-100 w-full h-20 sm:h-24 flex items-center justify-center text-gray-600 font-semibold text-lg">
            App Logo
          </div>
        </div>
        <LoginForm />
      </div>

      {/* Right section (hidden on mobile) */}
      <div className="hidden md:flex md:w-1/2 bg-gray-100 items-center justify-center">
        <h1 className="text-2xl font-semibold text-gray-700 text-center px-4">
          App Illustration / Background
        </h1>
      </div>
    </div>
  );
}
