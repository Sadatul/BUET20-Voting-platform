// import { useEffect, useState } from "react";
// import axios from "axios";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
// import { InfoCircledIcon } from "@radix-ui/react-icons";
// import { useVoteStore } from "@/store/useVoteStore";
// import lightImg from "@/assets/list-of-2018-korean-language-films.jpg";

// const AdminPage = () => {
//   // const { jwtToken } = useVoteStore();
//   const jwtToken = useVoteStore((state) => state.jwtToken);
//   const [results, setResults] = useState([]);
//   const [errorAlert, setErrorAlert] = useState(null);

//   useEffect(() => {
//     const fetchResults = async () => {
//       if (!jwtToken) {
//         setErrorAlert("Token is missing. Please log in.");
//         return;
//       }
//       try {
//         const response = await axios.get("http://localhost:5000/name/result", {
//           headers: {
//             token: jwtToken,
//           },
//         });
//         setResults(response.data.data);
//       } catch (error) {
//         console.error("Error fetching voting results: ", error.response?.data);
//         setErrorAlert("Error fetching voting results");
//       }
//     };

//     fetchResults();
//   }, [jwtToken]);

//   if (!jwtToken) {
//     return <div>Loading...Wait while we authenticate you</div>;
//   }

//   return (
//     <div
//       className="flex min-h-screen w-full flex-col items-center justify-center p-4 bg-fixed bg-cover bg-center bg-no-repeat"
//       style={{
//         backgroundImage: `url(${lightImg})`,
//         minHeight: "100vh",
//         minWidth: "100vw",
//       }}
//     >
//       <div className="flex flex-col items-center w-full max-w-4xl bg-white/30 backdrop-blur-md rounded-lg shadow-lg p-6">
//         <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
//           Voting Results
//         </h1>
//         <ScrollArea className="h-[calc(100vh-350px)] w-full">
//           {results.map((result) => (
//             <div
//               key={result.id}
//               className="flex justify-between p-4 bg-white/20 mb-2 rounded-lg"
//             >
//               <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
//                 {result.name}
//               </span>
//               <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
//                 {result.votes}%
//               </span>
//             </div>
//           ))}
//         </ScrollArea>
//       </div>
//       {errorAlert && (
//         <Alert className="fixed top-4 left-4 bg-red-500 text-white">
//           <InfoCircledIcon className="w-6 h-6" />
//           <AlertTitle className="p-2">Error</AlertTitle>
//           <AlertDescription>{errorAlert}</AlertDescription>
//         </Alert>
//       )}
//     </div>
//   );
// };

// export default AdminPage;

import { useEffect, useState } from "react";
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useVoteStore } from "@/store/useVoteStore";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import lightImg from "@/assets/list-of-2018-korean-language-films.jpg";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const AdminPage = () => {
  const jwtToken = useVoteStore((state) => state.jwtToken);
  const [results, setResults] = useState([]);
  const [usersWithoutVotes, setUsersWithoutVotes] = useState([]);
  const [errorAlert, setErrorAlert] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10; // Set number of results per page

  useEffect(() => {
    const fetchResults = async () => {
      if (!jwtToken) {
        setErrorAlert("Token is missing. Please log in.");
        return;
      }
      try {
        const response = await axios.get(
          "https://voting-app-backend.livelytree-3847346b.southeastasia.azurecontainerapps.io/name/result",
          {
            headers: {
              token: jwtToken,
            },
          }
        );
        setResults(response.data.data);
        setUsersWithoutVotes(response.data.usersWithoutVotes);
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

  // Pagination logic: Slice the results based on current page
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);

  // Prepare data for the Bar Chart (Voting Results)
  const barChartData = {
    labels: currentResults.map((result) => result.name),
    datasets: [
      {
        label: "Votes",
        data: currentResults.map((result) => result.votes),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Disable aspect ratio to manually control size
    scales: {
      x: {
        ticks: {
          autoSkip: false, // Ensure all labels show
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  // Pagination controls
  const totalPages = Math.ceil(results.length / resultsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Prepare data for the Doughnut Chart (Users without Votes)
  const doughnutChartData = {
    labels: ["Users who voted", "Users who haven't voted"],
    datasets: [
      {
        label: "Users Voting Status",
        data: [
          results.reduce((acc, result) => acc + result.votes, 0),
          usersWithoutVotes.length,
        ],
        backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 99, 132, 0.6)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: true, // Allow it to adjust size better
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

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

        {/* Bar Chart for Voting Results */}
        <div className="w-full mb-8">
          <Bar data={barChartData} options={barChartOptions} />
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between w-full mb-8">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="bg-gray-300 px-4 py-2 rounded-lg"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="bg-gray-300 px-4 py-2 rounded-lg"
          >
            Next
          </button>
        </div>

        {/* Doughnut Chart for User Voting Status */}
        <div className="w-1/2 mb-8">
          <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
        </div>

        {/* List of users without votes */}
        <div className="w-full bg-white/20 p-4 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Users Who Haven&apos;t Voted:
          </h2>
          <ScrollArea className="h-40">
            {usersWithoutVotes.length === 0 ? (
              <p className="text-gray-800 dark:text-gray-200">
                All users have voted!
              </p>
            ) : (
              usersWithoutVotes.map((user) => (
                <div key={user.sid} className="flex justify-between mb-2">
                  <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    User ID: {user.sid}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {user.email}
                  </span>
                </div>
              ))
            )}
          </ScrollArea>
        </div>

        {/* Scrollable area for the list */}
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
                {result.votes} votes
              </span>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Error alert */}
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
