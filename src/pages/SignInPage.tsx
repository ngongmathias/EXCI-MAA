import { SignIn } from '@clerk/clerk-react';

export default function SignInPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16">
      <SignIn routing="hash" />
    </div>
  );
}


