import { CheckIcon } from "@radix-ui/react-icons";
// import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import lightImg from "@/assets/list-of-2018-korean-language-films.jpg";
const VoteSuccess = () => {
  // const navigate = useNavigate();
  const location = useLocation();
  const { responseData } = location.state || {};

  return (
    <div
      className="flex min-h-screen w-full flex-col items-center justify-center bg-fixed bg-center bg-cover bg-no-repeat p-4"
      style={{
        backgroundImage: `url(${lightImg})`,
        minHeight: "100vh",
        minWidth: "100vw",
      }}
    >
      <div className="flex flex-col items-center w-full max-w-md bg-white/30 backdrop-blur-md rounded-lg shadow-lg p-6">
        {responseData && (
          <div className="flex flex-col items-center">
            <CheckIcon className="w-16 h-16 text-green-500 mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2 text-center">
              {responseData.message}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
              Voted Names:
            </p>
            <ul className="list-disc list-inside mb-4">
              {responseData.votedNames.map((name, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300">
                  {name}
                </li>
              ))}
            </ul>
            <h2 className="text-lg text-slate-900 underline dark:text-gray-400">
              You can close this tab.
            </h2>
          </div>
        )}
        {/* <Button onClick={() => navigate("/")} className="bg-blue-500 text-white">
          Go Back to Home
        </Button> */}
      </div>
    </div>
  );
};

export default VoteSuccess;
