import { useEffect, useMemo, useState } from "react";

import { DocumentProcessResult } from "../../services/documents";
import "./style.scss";
import { Paper, Tab, Tabs } from "@mui/material";
import { FieldsTab, SummaryTab, TablesTab, TextTab } from "./Analysis.tabs";
import { a11yProps } from "./Analysis.utils";

interface AnalysisProps {
  document: DocumentProcessResult;
  image: File;
}

const Analysis = ({ document, image }: AnalysisProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const imagePreview = useMemo(() => URL.createObjectURL(image), [image]);

  useEffect(() => {
    return () => URL.revokeObjectURL(imagePreview);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    console.log(newValue);
    setActiveTab(newValue);
  };

  return (
    <Paper elevation={2} className="analysis">
      <div className="preview">
        <img
          src={imagePreview}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(imagePreview);
          }}
        />
      </div>
      <div className="analysis-panel">
        <div className="tab-container">
          <Tabs value={activeTab} onChange={handleChange}>
            <Tab label="Summary" {...a11yProps(0)} />
            <Tab label="Fields" {...a11yProps(1)} />
            <Tab label="Tables" {...a11yProps(2)} />
            <Tab label="Text" {...a11yProps(3)} />
          </Tabs>
        </div>
        <div className="tab-content">
          {activeTab == 0 ? (
            <SummaryTab document={document}></SummaryTab>
          ) : activeTab == 1 ? (
            <FieldsTab document={document}></FieldsTab>
          ) : activeTab == 2 ? (
            <TablesTab document={document}></TablesTab>
          ) : activeTab == 3 ? (
            <TextTab document={document}></TextTab>
          ) : null}
        </div>
      </div>
    </Paper>
  );
};

export default Analysis;
