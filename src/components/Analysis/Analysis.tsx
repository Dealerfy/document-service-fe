import { ReactElement, useMemo, useState } from "react";
import { DocumentProcessResult } from "../../services/documents";
import "./style.scss";
import { Paper, Tab, Tabs } from "@mui/material";

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
interface TabPanelProps {
  activeTab: number;
  index: number;
  children?: React.ReactNode;
}
const TabPanel = ({ activeTab, index, children }: TabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={activeTab !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {activeTab === index && children}
    </div>
  );
};

interface AnalysisProps {
  document: DocumentProcessResult;
  image: File;
}

const Analysis = ({ document, image }: AnalysisProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const imagePreview = useMemo(() => URL.createObjectURL(image), [image]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
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
        <Tabs value={activeTab} onChange={handleChange}>
          <Tab label="Summary" {...a11yProps(0)} />
          <Tab label="Fields" {...a11yProps(1)} />
          <Tab label="Tables" {...a11yProps(2)} />
        </Tabs>
        <TabPanel activeTab={activeTab} index={0}>
          The image contains an offer for a{" "}
          {`${document.fields["New/Used"].value} ${document.fields["Color"].value} ${document.fields["Vehicle"].value}`}
          
        </TabPanel>
        <TabPanel activeTab={activeTab} index={1}>
          Summary
        </TabPanel>
        <TabPanel activeTab={activeTab} index={2}>
          Summary
        </TabPanel>
      </div>
    </Paper>
  );
};

export default Analysis;
