import apiClient from '@/lib/apiClient';
import {
  WaitlistRequest,
  WaitlistResponse,
} from '@/types/waitlist';

const WAITLIST_ENDPOINT = '/waiting-list/join';

export const waitlistService = {
  submitToWaitlist: async (
    data: WaitlistRequest
  ): Promise<WaitlistResponse> => {
    const response = await apiClient.post<WaitlistResponse>(
      WAITLIST_ENDPOINT,
      data
    );
    return response.data;
  },
};
