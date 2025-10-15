import { SignUp } from '@clerk/clerk-react';

export default function SignUpPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16">
      <SignUp routing="hash" afterSignUpUrl="/admin" afterSignInUrl="/admin" />
    </div>
  );
}


