export type PatientData = {
  // too general - be more specific if possible.
  [key: string]: string | number | boolean | null | undefined;
};

export type ResultItem = {
  recipient_data?: PatientData;
  donor_data?: PatientData;
  pair_id?: number;
  recipient?: PatientData; // TODO: add new type for detailed pair
  donor?: PatientData;
  recipient_id?: number;
  donor_id?: number;
};

export type Response = {
  count: number;
  next: any;
  previous: any;
  results: ResultItem[];
};

export type PairDetailed = {
  pair_id: number;
  donor: {
    donor_data: PatientData;
  };
  recipient: {
    recipient_data: PatientData;
  };
};

const fetchData = async (url: string): Promise<ResultItem[]> => {
  try {
    const response = await fetch(url);
    const jsonData = await response.json();
    return jsonData.results;
  } catch (err) {
    console.error("Error fetching data", err);
    throw err;
  }
};

export const getRecipients = async (): Promise<ResultItem[]> => {
  return fetchData("http://127.0.0.1:8000/recipient");
};

export const getDonors = async (): Promise<ResultItem[]> => {
  return fetchData("http://127.0.0.1:8000/donor");
};

export const getPairs = async (): Promise<ResultItem[]> => {
  return fetchData("http://127.0.0.1:8000/pair");
};

export const getDetailedPairs = async (): Promise<PairDetailed[]> => {
  try {
    const response = await fetch("http://127.0.0.1:8000/pair/detail/");
    const jsonData = await response.json();
    return jsonData.results;
  } catch (err) {
    console.error("Error fetching data", err);
    throw err;
  }
};

const updateData = async (url: string, data: any): Promise<any> => {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to update data at ${url}`);
    }

    return await response.json();
  } catch (err) {
    console.error("Error updating data", err);
    throw err;
  }
};

export const updateRecipient = async (
  id: number,
  recipientData: any
): Promise<any> => {
  return updateData(`http://127.0.0.1:8000/recipient/${id}/`, recipientData);
};

export const updateDonor = async (id: number, donorData: any): Promise<any> => {
  return updateData(`http://127.0.0.1:8000/donor/${id}/`, donorData);
};
