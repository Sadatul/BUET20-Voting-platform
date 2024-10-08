import { useEffect, useState } from "react";
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useVoteStore } from "@/store/useVoteStore";
import lightImg from "@/assets/list-of-2018-korean-language-films.jpg";

const AdminPage = () => {
  // const { jwtToken } = useVoteStore();
  const jwtToken = useVoteStore((state) => state.jwtToken);
  const [results, setResults] = useState([]);
  const [errorAlert, setErrorAlert] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!jwtToken) {
        setErrorAlert("Token is missing. Please log in.");
        return;
      }
      try {
        const response = await axios.get("http://localhost:5000/name/result", {
          headers: {
            token: jwtToken,
          },
        });
        setResults(response.data.data);
      } catch (error) {
        console.error("Error fetching voting results: ", error.response?.data);
        setErrorAlert("Error fetching voting results");
      }
    };

    fetchResults();
  }, [jwtToken]);

  if (!jwtToken) {
    return <div>Loading...Wait while we authenticate you</div>;
  }

  return (
    <div
      className="flex min-h-screen w-full flex-col items-center justify-center p-4 bg-fixed bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${lightImg})`,
        minHeight: "100vh",
        minWidth: "100vw",
      }}
    >
      <div className="flex flex-col items-center w-full max-w-4xl bg-white/30 backdrop-blur-md rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Voting Results
        </h1>
        <ScrollArea className="h-[calc(100vh-350px)] w-full">
          {results.map((result) => (
            <div
              key={result.id}
              className="flex justify-between p-4 bg-white/20 mb-2 rounded-lg"
            >
              <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {result.name}
              </span>
              <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {result.votes}%
              </span>
            </div>
          ))}
        </ScrollArea>
      </div>
      {errorAlert && (
        <Alert className="fixed top-4 left-4 bg-red-500 text-white">
          <InfoCircledIcon className="w-6 h-6" />
          <AlertTitle className="p-2">Error</AlertTitle>
          <AlertDescription>{errorAlert}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default AdminPage;
