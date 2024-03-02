"use client";

import { useState } from "react";

import { MODE } from "./utils/constants";

import { CustomGrid } from "./components/CustomGrid";
import { CustomForm } from "./components/CustomForm";

import { DataDisplay } from "./modules/DataDisplay";

export default function Home() {
  const [selectedMode, setSelectedMode] = useState(null);

  return (
    <div>
      <CustomGrid onClick={setSelectedMode} />

      {MODE.ADD === selectedMode && (
        <CustomForm setSelectedMode={setSelectedMode} />
      )}
      {MODE.SEARCH === selectedMode && <DataDisplay />}
    </div>
  );
}
