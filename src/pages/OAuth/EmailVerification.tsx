import { useSearchParams } from "react-router-dom";
import { useTheme } from "@/components/ThemeProvider";

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const { theme } = useTheme();
  const status = searchParams.get("status");

  const isDark =
    theme === "dark" ||
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  const title =
    status === "success"
      ? "Congratulations, your account has been verified!"
      : status === "already"
      ? "Your account was already verified."
      : "The verification link is invalid or has expired.";

  const subtitle =
    status === "success"
      ? "You can now log in to IdiomaGo and start exploring new words."
      : status === "already"
      ? "Try logging in directly."
      : "Please request a new verification link or check the URL.";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-black">
      <div className="text-center max-w-xl">
        <img
          src={isDark ? "/idiomago-dark.svg" : "/idiomago-white.svg"}
          alt="IdiomaGo Logo"
          className="mx-auto mb-8 w-52"
        />

        <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] dark:text-white mb-4">
          {title}
        </h1>
        <p className="text-md md:text-lg text-gray-700 dark:text-gray-300">{subtitle}</p>

        <div className="mt-8">
          <a
            href="/login"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
          >
            Go to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
