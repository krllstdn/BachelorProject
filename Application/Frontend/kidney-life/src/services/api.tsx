export interface PatientData {
  // too general - be more specific if possible.
  [key: string]: string; //| number | boolean | null | undefined;
}

export interface ResultItem {
  recipient_data: PatientData;
}

export interface Response {
  count: number;
  next: any;
  previous: any;
  results: ResultItem[];
}

const fetchData = async (url: string): Promise<ResultItem[]> => {
  try {
    const response = await fetch(url);
    const jsonData = await response.json();
    // console.log(jsonData.results);
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
