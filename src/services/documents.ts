import { toast } from "react-toastify";
import { httpClient } from "./http-client";

interface DocumentTableCell {
  value: string;
  confidence: number;
}

type DocumentTableRow = Array<DocumentTableCell>;
export interface DocumentTableData {
  headerRows: Array<DocumentTableRow>;
  bodyRows: Array<DocumentTableRow>;
}

export interface DocumentField {
  name: string;
  value: string;
  confidence: number;
}

export interface DocumentFields {
  [key: string]: DocumentField;
}

export interface DocumentProcessResult {
  fields: DocumentFields;
  tables: Array<DocumentTableData>;
  text: string;
}

export const postDocumentProcess = async (
  file: Blob
): Promise<DocumentProcessResult | undefined> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await httpClient.post(
      `/document/process/example`,
      formData
    );
    return data;
  } catch (error) {
    console.error(error);
    toast.error("An error occurred while loading clients");
  }
};
