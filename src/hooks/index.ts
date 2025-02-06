import {InterestAPI} from '../services/autocomplete.service';
import {useQuery} from '@tanstack/react-query';

interface InterestQueryParams {
  limit: number;
  from: number;
}

export const useInterests = ({limit, from}: InterestQueryParams) => {
  return useQuery({
    queryKey: ['interests', limit, from],
    queryFn: () => InterestAPI({limit, from}),
    staleTime: 5 * 60 * 1000,
    // keepPreviousData: true,
  });
};
