import { useDropzone } from "react-dropzone";
import "./style.scss";
import classNames from "classnames";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { CircularProgress } from "@mui/material";

interface FileUploadProps {
  onChange: (files: File[]) => void;
  loading: boolean;
}

const FileUpload = ({ onChange, loading }: FileUploadProps) => {
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      onDrop: onChange,
      accept: { "image/*": [] },
      multiple: false,
    });

  const classes = classNames("dropzone", {
    focusedStyle: isFocused,
    acceptStyle: isDragAccept,
    rejectStyle: isDragReject,
  });
  return (
    <div {...getRootProps({ className: classes })}>
      <input {...getInputProps()} />
      {loading ? (
        <>
          <CircularProgress />
          <p>Your image is being processed...</p>
        </>
      ) : (
        <>
          <CloudUploadIcon fontSize="large"></CloudUploadIcon>
          <p>Drag and drop images of offers here, or click to select files</p>
        </>
      )}
    </div>
  );
};

export default FileUpload;
