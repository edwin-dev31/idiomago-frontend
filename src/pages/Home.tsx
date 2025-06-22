  import React from "react";

  import { motion } from "framer-motion";
  import { useToast } from "@/components/ui/use-toast";
  import { Toaster } from "@/components/ui/toaster";
  import Sidebar from "@/components/layout/Sidebar";
  import WordCard from "@/pages/dashboard/WordCard";
  import FlashCard from "@/pages/seachWord/flashcard/FlashCard";
  import { Button } from "@/components/ui/button";
  
  import Login from "@/pages/OAuth/LoginPage";
  import { Word } from "@/types/types"; 
import { useNavigate } from "react-router-dom";
import DashboardPage from "./dashboard/DashboardPage";

  type FilterType = "dashboard" | "search" | "filter" | "favorites";

  const SAMPLE_WORDS: Word[] = [
    {
      id: 1,
      word: "House",
      translations: {
        spanish: "Casa",
        french: "Maison",
        german: "Haus",
      },
      definition: "A building for human living",
      example: "I live in a big house",
      favorite: false,
      image: "https://images.unsplash.com/photo-1549287540-b5e39fc85fa1",
    },
    {
      id: 2,
      word: "Car",
      translations: {
        spanish: "Coche",
        french: "Voiture",
        german: "Auto",
      },
      definition: "A road vehicle powered by an engine",
      example: "I drive my car to work every day",
      favorite: false,
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2",
    },
  ];


  const Home: React.FC = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
    const [isAuthenticated, setIsAuthenticated] = React.useState(() => {
      return !!localStorage.getItem("token");
    });

    React.useEffect(() => {
      const handleStorage = () => {
        setIsAuthenticated(!!localStorage.getItem("token"));
      };

      window.addEventListener("storage", handleStorage);
      return () => window.removeEventListener("storage", handleStorage);
    }, []);


    const [words, setWords] = React.useState<Word[]>(() => {
      const savedWords = localStorage.getItem("words");
      return savedWords ? JSON.parse(savedWords) : SAMPLE_WORDS;
    });
    const [selectedLanguages, setSelectedLanguages] = React.useState<string[]>([
      "spanish",
      "french",
      "german",
    ]);
    const [filter, setFilter] = React.useState("");
    const [filterType, setFilterType] = React.useState<FilterType>("dashboard");
    const [viewMode, setViewMode] = React.useState("flashcard");
    const { toast } = useToast();

    React.useEffect(() => {
      localStorage.setItem("words", JSON.stringify(words));
    }, [words]);

    const toggleFavorite = (id: number) => {
      setWords(prevWords =>
        prevWords.map(word =>
          word.id === id ? { ...word, favorite: !word.favorite } : word
        )
      );
      toast({
        title: "Success",
        description: "Favorite status updated",
      });
    };

    const filteredWords = words.filter((word) => {
      const searchTerm = filter.toLowerCase();
      switch (filterType) {
        case "search":
          return word.word.toLowerCase().includes(searchTerm);
        case "filter":
          return word.definition.toLowerCase().includes(searchTerm);
        case "favorites":
          return word.favorite;
        default:
          return true;
      }
    });

    if (!isAuthenticated) {
      return <Login  />;
    }

    return (
      <div className="flex h-screen bg-[#EBF4F6]">
        <Sidebar
          filterType={filterType}
          setFilterType={(value) => setFilterType(value as FilterType)}
          filter={filter}
          setFilter={setFilter}
          onLogout={handleLogout}
        />

        <main className="flex-1 p-8 overflow-auto">
          {filterType === "dashboard" && (
            <>
              <DashboardPage/>
            </>
          )}

          {filterType === "filter" && (
            <>
              <DashboardPage/>
            </>
          )}
                    
          {filterType === "search" || filterType === "filter" ? (
            <FlashCard
              words={filteredWords}
              selectedLanguages={selectedLanguages}
              onFavoriteToggle={toggleFavorite}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWords.map((word, index) => (
                <motion.div
                  key={word.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <WordCard
                    word={word}
                    selectedLanguages={selectedLanguages}
                    onFavoriteToggle={toggleFavorite} // ✅ Pasa solo la función
                  />
                </motion.div>
              ))}
            </div>
          )}
        </main>

        <Toaster />
      </div>
    );
  };


  export default Home;