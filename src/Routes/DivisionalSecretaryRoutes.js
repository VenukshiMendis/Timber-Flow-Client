import React from "react";
import { Route, Routes } from "react-router-dom";
import DivisionalSecretaryHome from "../pages/DivisionalSecretary/DivisionalSecretaryHome";
import AllTimberCuttingRequests from "../pages/DivisionalSecretary/AllTimberCuttingRequests";
import AllTimberTransportRequests from "../pages/DivisionalSecretary/AllTimberTransportRequests";
import ViewHistory from "../pages/DivisionalSecretary/ViewHistory"
import TimberCuttingPermissionRequest from "../pages/DivisionalSecretary/TimberCuttingPermissionRequest"
import TimberTransportPermissionRequest from "../pages/DivisionalSecretary/TimberTransportPermissionRequest";

const DivisionalSecretaryRoutes = () => (
    <Routes>
        <Route>
            <Route index element={<DivisionalSecretaryHome />} />
            <Route path="/allcuttingrequests" element={<AllTimberCuttingRequests />} />
            <Route path="/alltransportrequests" element={<AllTimberTransportRequests />} />
            <Route path="/viewhistory" element={<ViewHistory />} />
            <Route path="/cuttingrequest/:reqId" element={<TimberCuttingPermissionRequest />} />
            <Route path="/transportrequest/:reqId" element={<TimberTransportPermissionRequest />} />
        </Route>
    </Routes>
);

export default DivisionalSecretaryRoutes;

