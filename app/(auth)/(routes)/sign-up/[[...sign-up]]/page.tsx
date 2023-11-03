import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex flex-col items-center gap-4 px-4">
      <div className="max-w-md rounded-lg border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-900">
        <p className="font-medium">This is a demo.</p>
        <p className="mt-1">
          Log in using the following credentials:
        </p>
        <p className="mt-2">
          <span className="font-medium">Email:</span> realmohsin@outlook.com
        </p>
        <p>
          <span className="font-medium">Password:</span> demoPw_13
        </p>
      </div>
      <SignUp />
    </div>
  );
}