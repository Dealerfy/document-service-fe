import { IconButton, ListItem, ListItemText, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { DocumentField, DocumentTableData } from "../../services/documents";
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
