const topics = [
  {
    id: "1",
    name: "Price Elasticity",
  },
  {
    id: "2",
    name: "Demand Forcasting",
  },
  {
    id: "3",
    name: "Marketing Mix",
  },
  {
    id: "4",
    name: "Assortment Optimization",
  },
  {
    id: "5",
    name: "Trendspotting",
  },
  {
    id: "6",
    name: "Brandspotting",
  },
];

const dataAcess = [
  {
    id: "1",
    name: "Read File",
    params: {
      name: "Read",
      fileFormat: ".csv",
    },
  },
  {
    id: "2",
    name: "Write File",
    params: {
      name: "Write",
      fileFormat: ".csv",
    },
  },
  {
    id: "3",
    name: "DB Read",
  },
  {
    id: "4",
    name: "DB Write",
  },
  {
    id: "5",
    name: "Cloud AmazonS3 Read",
  },
  {
    id: "6",
    name: "Cloud AmazonS3 Write",
  },
  {
    id: "7",
    name: "Cloud Google Read",
  },
];

const modeling = [
  {
    id: "1",
    name: "Linear Regression",
  },
  {
    id: "2",
    name: "Arima",
  },
  {
    id: "3",
    name: "Price Elasticity",
    params: {
      name: "Price Elasticity",
      pValue: "P-value",
      train: "Train",
      test: "Test",
      validate: "Validate",
    },
  },
  {
    id: "4",
    name: "Logistic Regression",
  },
  {
    id: "5",
    name: "SVM",
  },
  {
    id: "6",
    name: "XGBOOST",
  },
  {
    id: "7",
    name: "GBM",
  },
];

const cleansing = [
  {
    id: "1",
    name: "Normalize",
  },
  {
    id: "2",
    name: "Denormalize",
  },
  {
    id: "3",
    name: "Statistics",
  },
  {
    id: "4",
    name: "Scale By Weights",
  },
  {
    id: "5",
    name: "Quality Measures",
  },
  {
    id: "6",
    name: "Cross Validation",
  },
  {
    id: "7",
    name: "Split Validation",
  },
];

export { topics, dataAcess, modeling, cleansing };
