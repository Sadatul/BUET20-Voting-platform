// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";
// import { Button } from "@/components/ui/button";

// function App() {
//   const [count, setCount] = useState(0);
//   const [darkMode, setDarkMode] = useState(false);

//   return (
//     <div className={darkMode ? "dark" : ""}>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//       <Button
//         onClick={() => {
//           setDarkMode(!darkMode);
//         }}
//       >
//         Toggle Dark Mode
//       </Button>
//     </div>
//   );
// }

// export default App;

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
import PropTypes from "prop-types";
// Zustand store
const useVoteStore = create((set) => ({
  options: [],
  setOptions: (options) => set({ options }),
  selectedOptions: [],
  toggleOption: (id) =>
    set((state) => ({
      selectedOptions: state.selectedOptions.includes(id)
        ? state.selectedOptions.filter((optionId) => optionId !== id)
        : [...state.selectedOptions, id],
    })),
}));

const OptionItem = ({ option }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOption = useVoteStore((state) => state.toggleOption);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mb-2">
      <CollapsibleTrigger className="flex items-center justify-between w-full p-2 bg-gray-100 rounded-md">
        <span>{option.title}</span>
        <span>{isOpen ? "▲" : "▼"}</span>
      </CollapsibleTrigger>
      <CollapsibleContent className="p-2 bg-white">
        <p>{option.description}</p>
        <Button onClick={() => toggleOption(option.id)} className="mt-2">
          Select
        </Button>
      </CollapsibleContent>
    </Collapsible>
  );
};

OptionItem.propTypes = {
  option: PropTypes.object.isRequired,
};

const SideScroll = ({ totalOptions }) => {
  const scrollNumbers = Array.from(
    { length: Math.ceil(totalOptions / 10) },
    (_, i) => (i + 1) * 10
  );

  return (
    <div className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-l-md">
      {scrollNumbers.map((number) => (
        <div
          key={number}
          className="text-sm cursor-pointer hover:bg-gray-300 p-1"
        >
          {number}
        </div>
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
  const { options, setOptions, selectedOptions } = useVoteStore();

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get("/api/options");
        setOptions(mockOptions);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchOptions();
  }, [setOptions]);

  const handleSubmit = () => {
    console.log("Selected options:", selectedOptions);
    // Here you would typically send the selectedOptions to your backend
  };

  return (
    <div className="container mx-auto p-4 pb-16">
      <h1 className="text-2xl font-bold mb-4">Voting Options</h1>
      <ScrollArea className="h-[calc(100vh-200px)]">
        {options.map((option) => (
          <OptionItem key={option.id} option={option} />
        ))}
      </ScrollArea>
      <SideScroll totalOptions={options.length} />
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t">
        <Button onClick={handleSubmit} className="w-full">
          Submit Vote
        </Button>
      </div>
    </div>
  );
};

export default VotingPage;