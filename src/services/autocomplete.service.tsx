import {apiInstance} from '../config';

interface AutocompleteItem {
  id: number;
  name: string;
  type: string;
  match: number;
  color: string;
  avatar: string;
  existing: boolean;
}

interface AutocompleteResponse {
  autocomplete: AutocompleteItem[];
  pages_left: number;
}

export async function InterestAPI(data: {
  limit: number;
  from: number;
}): Promise<AutocompleteResponse> {
  try {
    const response = (await apiInstance.request({
      method: 'get',
      url: `autocomplete/interests?q=&limit=${data.limit}&from=${data.from}&prevRequest=false`,
    })) as AutocompleteResponse;

    return response;
  } catch (error: any) {
    return error;
  }
}
