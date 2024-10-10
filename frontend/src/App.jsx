/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { create } from "zustand";
import axios from "axios";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import PropTypes from "prop-types";
// import darkImg from "@/assets/download.jpg";
import lightImg from "@/assets/list-of-2018-korean-language-films.jpg";
import { useVoteStore, MAX_SELECTIONS } from "./store/useVoteStore";
import { useNavigate } from "react-router-dom";

// const MAX_SELECTIONS = 3;

// // Zustand store
// const useVoteStore = create((set) => ({
//   options: [],
//   setOptions: (options) => set({ options }),
//   selectedOptions: [],
//   toggleOption: (id) =>
//     set((state) => {
//       if (state.selectedOptions.includes(id)) {
//         return {
//           selectedOptions: state.selectedOptions.filter(
//             (optionId) => optionId !== id
//           ),
//         };
//       } else if (state.selectedOptions.length < MAX_SELECTIONS) {
//         return { selectedOptions: [...state.selectedOptions, id] };
//       }
//       return state;
//     }),
//   jwtToken: null,
//   setJwtToken: (token) => set({ jwtToken: token }),
// }));

const OptionItem = ({ option, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOption = useVoteStore((state) => state.toggleOption);
  const selectedOptions = useVoteStore((state) => state.selectedOptions);
  const isSelected = selectedOptions.includes(option.id);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="mb-4 w-full bg-white/30 backdrop-blur-md rounded-lg shadow-lg"
      id={`option-${index + 1}`}
    >
      <CollapsibleTrigger
        className={`flex items-center justify-between w-full p-4 ${
          isSelected
            ? "bg-emerald-400/70"
            : "bg-cyan-100-400/30 hover:bg-white/50 cursor-pointer"
        } rounded-t-lg`}
      >
        <span className="flex-1 text-lg font-semibold text-gray-800 dark:text-gray-500">
          {option.name}
        </span>
        <span className="text-gray-800 dark:text-gray-500">
          {isOpen ? "▲" : "▼"}
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent className="p-4 bg-white/20 rounded-b-lg">
        <p className="text-gray-700 dark:text-gray-300">{option.meaning}</p>
        <Button
          onClick={() => {
            toggleOption(option.id);
          }}
          className={`mt-4 ${
            isSelected
              ? "bg-emerald-400/70 text-white"
              : "bg-sky-400/70 text-white"
          } focus:outline-none focus:ring-0 active:outline-none active:ring-0 hover:bg-sky-600/50`}
        >
          {isSelected ? "Selected" : "Select"}
        </Button>
      </CollapsibleContent>
    </Collapsible>
  );
};

OptionItem.propTypes = {
  option: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

const SideScroll = ({ totalOptions }) => {
  const scrollNumbers = Array.from(
    { length: Math.ceil(totalOptions / 10) },
    (_, i) => (i === 0 ? 1 : i * 10)
  );

  const handleScroll = (number) => {
    const element = document.getElementById(`option-${number}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-blue-400/30 backdrop-blur-md p-2 rounded-l-md shadow-lg flex flex-col">
      {scrollNumbers.map((number) => (
        <button
          key={number}
          className="text-sm cursor-pointer hover:bg-white/50 p-0.5 text-gray-800 dark:text-gray-200 focus:outline-none"
          onClick={() => handleScroll(number)}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

SideScroll.propTypes = {
  totalOptions: PropTypes.number.isRequired,
};

const mockOptions = [
  { id: 1, title: "Option 1", description: "Description for option 1" },
  { id: 2, title: "Option 2", description: "Description for option 2" },
  { id: 3, title: "Option 3", description: "Description for option 3" },
  { id: 4, title: "Option 4", description: "Description for option 4" },
  { id: 5, title: "Option 5", description: "Description for option 5" },
  { id: 6, title: "Option 6", description: "Description for option 6" },
  { id: 7, title: "Option 7", description: "Description for option 7" },
  { id: 8, title: "Option 8", description: "Description for option 8" },
  { id: 9, title: "Option 9", description: "Description for option 9" },
  { id: 10, title: "Option 10", description: "Description for option 10" },
  { id: 11, title: "Option 11", description: "Description for option 11" },
  { id: 12, title: "Option 12", description: "Description for option 12" },
  { id: 13, title: "Option 13", description: "Description for option 13" },
  { id: 14, title: "Option 14", description: "Description for option 14" },
  { id: 15, title: "Option 15", description: "Description for option 15" },
  { id: 16, title: "Option 16", description: "Description for option 16" },
  { id: 17, title: "Option 17", description: "Description for option 17" },
  { id: 18, title: "Option 18", description: "Description for option 18" },
  { id: 19, title: "Option 19", description: "Description for option 19" },
  { id: 20, title: "Option 20", description: "Description for option 20" },
  { id: 21, title: "Option 21", description: "Description for option 21" },
  { id: 22, title: "Option 22", description: "Description for option 22" },
  { id: 23, title: "Option 23", description: "Description for option 23" },
  { id: 24, title: "Option 24", description: "Description for option 24" },
  { id: 25, title: "Option 25", description: "Description for option 25" },
  { id: 26, title: "Option 26", description: "Description for option 26" },
  { id: 27, title: "Option 27", description: "Description for option 27" },
  { id: 28, title: "Option 28", description: "Description for option 28" },
  { id: 29, title: "Option 29", description: "Description for option 29" },
  { id: 30, title: "Option 30", description: "Description for option 30" },
];

const VotingPage = () => {
  const { options, setOptions, selectedOptions, jwtToken, setJwtToken } =
    useVoteStore();
  const [showAlert, setShowAlert] = useState(false);
  // const [darkMode, setDarkMode] = useState(false);
  const [errorAlert, setErrorAlert] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJwtToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const uniqueLink = urlParams.get("link");
      if (!uniqueLink) {
        setErrorAlert("Unique link not found in URL");
        console.error("Unique link not found in URL");
        return;
      }

      try {
        const response = await axios.get(
          "https://voting-app-backend.livelytree-3847346b.southeastasia.azurecontainerapps.io/admin/auth/" +
            uniqueLink
        );
        if (!response.data.success) {
          console.error("Error fetching JWT token:", response.data.message);
          setErrorAlert("Not Verified. Please use the unique link");
          return;
        }
        setJwtToken(response.data.token);
        console.log("JWT token fetched successfully", response.data.token);
      } catch (error) {
        setErrorAlert("Error fetching JWT token");
        console.error("Error fetching JWT token:", error);
      }
    };

    fetchJwtToken();
  }, [setJwtToken]);

  useEffect(() => {
    const fetchOptions = async () => {
      if (!jwtToken) {
        return;
      }

      try {
        const response = await axios.get(
          "https://voting-app-backend.livelytree-3847346b.southeastasia.azurecontainerapps.io/name",
          {
            headers: {
              token: jwtToken,
            },
          }
        );

        // setOptions(mockOptions);
        if (!response.data.success) {
          console.error("Error fetching options:", response.data.message);
          setErrorAlert("Error fetching options");
          return;
        }
        setOptions(response.data.names);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };
    // if (jwtToken) {}
    fetchOptions();
  }, [jwtToken]);

  useEffect(() => {
    if (selectedOptions.length === MAX_SELECTIONS) {
      console.log(`${selectedOptions}`);
      setShowAlert(true);
      const timer = setTimeout(() => setShowAlert(false), 3400);
      return () => clearTimeout(timer);
    }
  }, [selectedOptions]);

  // useEffect(() => {
  //   if (darkMode) {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }
  // }, [darkMode]);

  const handleSubmit = async () => {
    if (!jwtToken) {
      setErrorAlert("Not authorized. Please use the unique link");
    }
    let response = null;
    try {
      response = await axios.post(
        "https://voting-app-backend.livelytree-3847346b.southeastasia.azurecontainerapps.io/name/vote",
        { options: selectedOptions },
        {
          headers: {
            token: jwtToken,
          },
        }
      );
      if (!response.data.success) {
        setErrorAlert("Error submitting vote", response.data.message);
        console.error("Error submitting vote:", response.data.message);
        return;
      }
      console.log("Selected options submitted successfully", selectedOptions);
      navigate("/vote_success", { state: { responseData: response.data } });

      // console.log("Selected options submitted successfully", selectedOptions);
      // navigate("/vote_success");
    } catch (error) {
      // setErrorAlert("Error submitting vote");
      console.error("Error submitting vote:", error);
    }
  };

  const progress = (selectedOptions.length / MAX_SELECTIONS) * 100;

  return (
    <div
      className="flex min-h-screen w-full flex-col items-center justify-center bg-fixed bg-center bg-cover bg-no-repeat p-4"
      style={{
        backgroundImage: `url(${lightImg})`,
        minHeight: "100vh",
        minWidth: "100vw",
      }}
    >
      <div className="flex flex-col items-center w-full max-w-4xl bg-blue-400 backdrop-filter bg-clip-padding backdrop-blur-md bg-opacity-15 border border-gray-100 rounded-lg shadow-lg p-4 mr-4">
        <div className="flex justify-between items-center w-full mb-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Voting Options
          </h1>
          {/* <Button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-800"
          >
            Toggle {darkMode ? "Light" : "Dark"} Mode
          </Button> */}
        </div>
        <Progress value={progress} className="w-full mb-4" />
        <div className="mb-4 text-gray-700 dark:text-gray-300 w-full">
          {/* <p className="text-lg font-semibold mb-2">
            Selected: {selectedOptions.length} / {MAX_SELECTIONS}
          </p> */}
          <div className="flex flex-wrap gap-2">
            {selectedOptions.map((optionId) => {
              const optionIndex = options.findIndex(
                (opt) => opt.id === optionId
              );
              const option = options[optionIndex];
              return (
                <span
                  key={optionId}
                  className="bg-green-500 text-white px-3 py-1 rounded-lg shadow-md text-sm font-medium"
                >
                  {`${optionIndex + 1} : ${option?.name || "Unknown Option"}`}
                </span>
              );
            })}
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-350px)] w-full">
          {options.map((option, index) => (
            <OptionItem key={option.id} option={option} index={index} />
          ))}
        </ScrollArea>
      </div>
      <SideScroll totalOptions={options.length} />
      <div className="fixed flex bottom-0 items-center justify-center left-0 right-0 bg-white/30 backdrop-blur-md p-4 border-t border-gray-200 dark:border-gray-700">
        <Button onClick={handleSubmit} className="w-full max-w-md mx-auto">
          Submit Vote
        </Button>
      </div>
      {showAlert && (
        <Alert className="fixed top-4 right-4 w-64 bg-green-400/50 backdrop-blur-xl">
          <InfoCircledIcon className="w-6 h-6" />
          <AlertTitle className="p-2">Max selections reached</AlertTitle>
          <AlertDescription>
            You can only select up to {MAX_SELECTIONS} options
          </AlertDescription>
        </Alert>
      )}
      {errorAlert && (
        <Alert className="fixed top-4 left-4 w-64 bg-red-600/70 text-white backdrop-blur-xl">
          <InfoCircledIcon className="w-6 h-6" />
          <AlertTitle className="p-2">Error</AlertTitle>
          <AlertDescription>{errorAlert}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default VotingPage;
