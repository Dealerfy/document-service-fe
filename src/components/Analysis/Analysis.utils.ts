export function a11yProps(index: number) {
    return {
      id: `tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }