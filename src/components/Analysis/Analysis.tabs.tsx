import { Divider, List, Pagination, Typography } from "@mui/material";
import { DocumentProcessResult } from "../../services/documents";
import { DocumentTable, FieldListItem } from "./Analysis.components";
import { useState } from "react";

interface AnalysisTabProps {
  document: DocumentProcessResult;
}

export const SummaryTab = ({ document }: AnalysisTabProps) => {
  return (
    <>
      <div className="summary-tab tab-padding-list">
        <Typography variant="h5">Summary</Typography>
        <Typography variant="body1">
          The image contains an offer for{" "}
          <span className="summary-highlight">{`${document.fields["New/Used"].value} ${document.fields["Vehicle"].value}`}</span>{" "}
          in the color{" "}
          <span className="summary-highlight">
            {document.fields["Color"].value}
          </span>
        </Typography>
      </div>
      <List dense>
        {document.fields["Vehicle"] ? (
          <>
            <FieldListItem field={document.fields["Vehicle"]}></FieldListItem>
            <Divider component="li" />
          </>
        ) : null}
        {document.fields["New/Used"] ? (
          <>
            <FieldListItem field={document.fields["New/Used"]}></FieldListItem>
            <Divider component="li" />
          </>
        ) : null}
        {document.fields["Color"] ? (
          <>
            <FieldListItem field={document.fields["Color"]}></FieldListItem>
            <Divider component="li" />
          </>
        ) : null}
        {document.fields["Type"] ? (
          <>
            <FieldListItem field={document.fields["Type"]}></FieldListItem>
            <Divider component="li" />
          </>
        ) : null}
        {document.fields["Mileage"] ? (
          <>
            <FieldListItem field={document.fields["Mileage"]}></FieldListItem>
            <Divider component="li" />
          </>
        ) : null}

        {document.fields["Market Value Selling Price"] ? (
          <>
            <FieldListItem
              field={document.fields["Market Value Selling Price"]}
            ></FieldListItem>
            <Divider component="li" />
          </>
        ) : null}
        {document.fields["Total Purchase"] ? (
          <>
            <FieldListItem
              field={document.fields["Total Purchase"]}
            ></FieldListItem>
            <Divider component="li" />
          </>
        ) : null}
        {document.fields["Balance"] ? (
          <>
            <FieldListItem field={document.fields["Balance"]}></FieldListItem>
          </>
        ) : null}
      </List>
    </>
  );
};

export const FieldsTab = ({ document }: AnalysisTabProps) => {
  const fieldListElements = Object.keys(document.fields).map(
    (fieldName, idx) => {
      const field = document.fields[fieldName];

      return (
        <>
          <FieldListItem
            field={field}
            key={"fieldListItem-" + idx}
          ></FieldListItem>
          {idx != Object.keys(document.fields).length - 1 ? (
            <Divider component="li" key={"field-divider-" + idx} />
          ) : null}
        </>
      );
    }
  );

  return (
    <>
      <div className="tab-padding">
        <Typography variant="h5">Fields</Typography>
        <Typography variant="body1">
          All the fields extracted by the OCR
        </Typography>
      </div>
      <List dense={true}>{fieldListElements}</List>
    </>
  );
};

export const TablesTab = ({ document }: AnalysisTabProps) => {
  const [currentTable, setCurrentTable] = useState(1);


  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentTable(value);
  };
  return (
    <div className="table-tab tab-padding">
      <Typography variant="h5">Tables</Typography>
      <Typography variant="body1" gutterBottom>
        Tables that were extracted from the document.
      </Typography>
      {document.tables.length > 1 ? (
        <Pagination
          count={document.tables.length}
          size="small"
          onChange={handleChange}
        />
      ) : null}
      <DocumentTable
        documentTable={document.tables[currentTable - 1]}
      ></DocumentTable>
    </div>
  );
};

export const TextTab = ({ document }: AnalysisTabProps) => {
  return (
    <div className="text-tab tab-padding">
      <Typography variant="h5">OCR text</Typography>
      <Typography variant="body1" gutterBottom>
        The raw extracted text from the OCR. It can be used for manually copy
        pasting any of the text content of the document.
      </Typography>
      <Typography variant="body2" className="ocr-text">
        {document.text}
      </Typography>
    </div>
  );
};
