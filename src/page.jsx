import { useState } from "react";
import LoginForm from "./components/login-form";
import SignupForm from "./components/signup-form";
import SignupSecondaryForm from "./components/signup-secondary-form";
import LandingPage from "./components/landing-page";
import logoImage from "./assets/logo-dzfellah.png";

export default function Home() {
  const [currentPage, setCurrentPage] = useState("landing"); // "landing", "login", "signup", "signup-secondary"
  const [userType, setUserType] = useState("consumer");

  // eslint-disable-next-line no-unused-vars
  const handleSignupComplete = (data) => {
    setCurrentPage("signup-secondary");
  };

  const handleSecondaryComplete = () => {
    setCurrentPage("login");
  };

  // If on landing page, show only landing page
  if (currentPage === "landing") {
    return (
      <LandingPage
        onNavigateToLogin={() => setCurrentPage("login")}
        onNavigateToSignup={() => setCurrentPage("signup")}
      />
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Sidebar */}
      {currentPage !== "signup-secondary" && (
        <div className="hidden md:flex md:w-1/2 bg-[#285153] flex-col p-12 lg:p-16 items-center text-center">
          <div className="w-full flex justify-center">
            <div className="flex items-center gap-2">
              <img src={logoImage} alt="FELLAH Logo" className="h-10 w-auto" />
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center gap-16 w-full max-w-lg">
            {/* Welcome Message */}
            <div>
              <h2 className="text-white text-7xl lg:text-5xl font-bold leading-snug font-sans">
                {currentPage === "login" ? (
                  <>
                    Welcome back! We're
                    <br />
                    glad to see you again
                  </>
                ) : (
                  <>
                    Join dz fellah
                    <br />
                    today
                  </>
                )}
              </h2>
            </div>

            {/* Navigation Buttons */}
            {currentPage === "login" && (
              <div className="flex flex-col items-center gap-6">
                <p className="text-white text-xl font-bold">
                  I don't have an acount
                </p>
                <button
                  onClick={() => {
                    setCurrentPage("signup");
                    setUserType("consumer");
                  }}
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#285153] transition-colors flex items-center gap-2 text-lg"
                >
                  <span>→</span>
                  <span>Sign up</span>
                </button>
              </div>
            )}

            {currentPage === "signup" && (
              <div className="flex flex-col items-center gap-6">
                <p className="text-white text-xl font-bold">
                  i have already an account
                </p>
                <button
                  onClick={() => setCurrentPage("login")}
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#285153] transition-colors flex items-center gap-2 text-lg"
                >
                  <span>→</span>
                  <span>Log in</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Right Content Area */}
      <div
        className={`w-full ${
          currentPage === "signup-secondary" ? "md:w-full" : "md:w-1/2"
        } flex flex-col justify-center p-6 sm:p-8 lg:p-12`}
      >
        {currentPage === "login" && (
          <>
            <div className="md:hidden mb-8">
              <div className="flex items-center gap-2 mb-4">
                <img
                  src={logoImage}
                  alt="FELLAH Logo"
                  className="h-16 w-auto mb-4"
                />
              </div>
            </div>
            <LoginForm onSignupClick={() => setCurrentPage("signup")} />
          </>
        )}

        {currentPage === "signup" && (
          <>
            <div className="md:hidden mb-8">
              <div className="flex items-center gap-2 mb-4">
                <img
                  src={logoImage}
                  alt="FELLAH Logo"
                  className="h-16 w-auto mb-4"
                />
              </div>
            </div>
            <SignupForm
              onBackToLogin={() => setCurrentPage("login")}
              onSignupComplete={handleSignupComplete}
              onUserTypeChange={setUserType}
            />
          </>
        )}

        {currentPage === "signup-secondary" && (
          <>
            <SignupSecondaryForm
              userType={userType}
              onComplete={handleSecondaryComplete}
              onBackToLogin={() => setCurrentPage("login")}
            />
          </>
        )}
      </div>
    </div>
  );
}
