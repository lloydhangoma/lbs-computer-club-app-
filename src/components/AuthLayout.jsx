    import React from 'react';

    const AuthLayout = ({ children }) => {
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-poppins">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
            {children} {/* This is where the Signup or SignIn form will be rendered */}
          </div>
        </div>
      );
    };

    export default AuthLayout;
    