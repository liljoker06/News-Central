import type { SearchHistoryFilters } from '../types';
import { Search } from 'lucide-react';

interface NewsFiltersProps {
  filters: SearchHistoryFilters;
  onFilterChange: (filters: SearchHistoryFilters) => void;
}

export function HistoryFilter({ filters, onFilterChange }: NewsFiltersProps) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
    };
      
  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
      <div className="flex items-center space-x-2">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          name="keyword"
          value={filters.keyword}
          onChange={handleChange}
          placeholder="Search history..."
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
)
}
