import { apiRoutes } from "@/lib/constants/apiRoutes";
import { useWordFilter } from "@/lib/hooks/Filters/useWordFilter";
import { Word } from "@/types/WordView";

export function useFilterByLanguage() {
  const { filterMultiple } = useWordFilter();

  const filter = async (codes: string[]): Promise<Word[]> => {
    const urls = codes.map(code => apiRoutes.search.byLanguage(code));
    return await filterMultiple(urls);
  };

  return { filter };
}

export function useFilterByCategories() {
  const { filterSingle } = useWordFilter();

  const filter = async (categoryId: number): Promise<Word[]> => {
    return await filterSingle(apiRoutes.search.byCategory(categoryId));
  };

  return { filter };
}

export function useFilterByDescription() {
  const { filterSingle } = useWordFilter();

  const filter = async (partial: string): Promise<Word[]> => {
    return await filterSingle(apiRoutes.search.byDescription(partial));
  };

  return { filter };
}

export function useFilterByExample() {
  const { filterSingle } = useWordFilter();

  const filter = async (partial: string): Promise<Word[]> => {
    return await filterSingle(apiRoutes.search.byExample(partial));
  };

  return { filter };
}
