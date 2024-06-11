import { Route, Routes } from "react-router-dom";
import CitizenHome from "../pages/Citizen/CitizenHome";
import TimberCuttingLicense from "../pages/Citizen/TimberCuttingLicense";
import TimberTransportLicense from "../pages/Citizen/TimberTransportLicense";
import CheckStatus from "../pages/Citizen/CheckStatus";
import ViewTimberCuttingRequestDetails from "../pages/Citizen/ViewTimberCuttingRequest";
import ViewTimberTransportRequestDetails from "../pages/Citizen/ViewTimberTransportRequest";
import React from "react";

const CitizenRoutes = () => (
    <Routes>
      <Route>
        <Route index element={<CitizenHome />} />
        <Route path="/timbercutting" element={<TimberCuttingLicense />} />
        <Route path="/timbertransport" element={<TimberTransportLicense />} />
        <Route path="/checkstatus" element={<CheckStatus />} />
        <Route path="/checkstatus/cutting/:reqId" element={<ViewTimberCuttingRequestDetails />} />
        <Route path="/checkstatus/transport/:reqId" element={<ViewTimberTransportRequestDetails />} />

    </Route>
    </Routes>
);

export default CitizenRoutes;
