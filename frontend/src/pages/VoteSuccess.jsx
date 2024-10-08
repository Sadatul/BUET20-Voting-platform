import { CheckIcon } from "@radix-ui/react-icons";
// import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";

const VoteSuccess = () => {
  // const navigate = useNavigate();
  const location = useLocation();
  const { responseData } = location.state || {};

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-fixed bg-center bg-cover bg-no-repeat p-4">
      <div className="flex flex-col items-center w-full max-w-md bg-white/30 backdrop-blur-md rounded-lg shadow-lg p-6">
        {responseData && responseData.success ? (
          <div>
            <CheckIcon className="w-16 h-16 text-green-500 mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              {responseData.message} \n {responseData.votedNames} \n You can
              close this tab.
            </h1>
          </div>
        ) : (
          <h1 className="text-2xl font-bold text-red-800 dark:text-gray-200 mb-4">
            {responseData.message} \n You can close this tab.
          </h1>
        )}
        {/* <Button onClick={() => navigate("/")} className="bg-blue-500 text-white">
          Go Back to Home
        </Button> */}
      </div>
    </div>
  );
};

export default VoteSuccess;
