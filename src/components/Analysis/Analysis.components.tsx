import {
  IconButton,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  DocumentField,
  DocumentFields,
  DocumentTableData,
} from "../../services/documents";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

interface DocumentTableProps {
  documentTable: DocumentTableData;
}

export const DocumentTable = ({ documentTable }: DocumentTableProps) => {
  const HeaderRows = documentTable.headerRows.map((row) => {
    const HeaderCells = row.map((cell) => {
      return <TableCell>{cell.value}</TableCell>;
    });
    return <TableRow>{HeaderCells}</TableRow>;
  });

  const BodyRows = documentTable.bodyRows.map((row) => {
    const HeaderCells = row.map((cell) => {
      return <TableCell>{cell.value}</TableCell>;
    });
    return <TableRow>{HeaderCells}</TableRow>;
  });
  return (
    <Table aria-label="OCR table">
      <TableHead>{HeaderRows}</TableHead>
      <TableBody>{BodyRows}</TableBody>
    </Table>
  );
};

interface SummaryTextProps {
  fields: DocumentFields;
}

export const SummaryText = ({ fields }: SummaryTextProps) => {
  return (
    <Typography variant="body1">
      The image contains an offer for{" "}
      <span className="summary-highlight">{`${
        fields["New/Used"] ? fields["New/Used"].value : ""
      } ${
        fields["Vehicle"] ? fields["Vehicle"].value : "<Vehicle not found>"
      }`}</span>
      {fields["Color"] ? (
        <>
          {" "}
          in the color{" "}
          <span className="summary-highlight">{fields["Color"].value}</span>
        </>
      ) : null}
    </Typography>
  );
};

interface FieldListItemProps {
  field: DocumentField;
  key?: string;
}

export const FieldListItem = ({ field, key }: FieldListItemProps) => {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(field.value);
  };
  return (
    <ListItem
      key={key}
      secondaryAction={
        <IconButton aria-label="copy" onClick={handleCopyClick}>
          <ContentCopyIcon />
        </IconButton>
      }
    >
      <ListItemText
        primary={field.value}
        secondary={`${field.name} (confidence: ${field.confidence.toFixed(2)})`}
      ></ListItemText>
    </ListItem>
  );
};
