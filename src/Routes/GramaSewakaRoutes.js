import React from "react";
import { Route, Routes } from "react-router-dom";
import GramaSewakaHome from "../pages/GramaSewaka/GramaSewakaHome";
import AllTimberCuttingRequests from "../pages/GramaSewaka/AllTimberCuttingRequests";
import AllTimberTransportRequests from "../pages/GramaSewaka/AllTimberTransportRequests";
import TimberCuttingPermissionRequest from "../pages/GramaSewaka/TimberCuttingPermissionRequest";
import TimberTransportPermissionRequest from "../pages/GramaSewaka/TimberTransportPermissionRequest";
import ViewTimberCuttingRequest from "../pages/GramaSewaka/ViewTimberCuttingRequest";
import ViewTimberTransportReques from "../pages/GramaSewaka/ViewTimberTransportRequest";
import ViewHistory from "../pages/GramaSewaka/ViewHistory";

const GramaSewakaRoutes = () => (
    <Routes>
        <Route>
            <Route index element={<GramaSewakaHome />} />
            <Route path="/allcuttingrequests" element={<AllTimberCuttingRequests />} />
            <Route path="/alltransportrequests" element={<AllTimberTransportRequests />} />
            <Route path="/viewhistory" element={<ViewHistory />} />
            <Route path="/cuttingrequest/:reqId" element={<TimberCuttingPermissionRequest />} />
            <Route path="/transportrequest/:reqId" element={<TimberTransportPermissionRequest />} />
            <Route path="/viewcuttingrequest/:reqId" element={<ViewTimberCuttingRequest />} />
            <Route path="/viewtransportrequest/:reqId" element={<ViewTimberTransportReques />} />
        </Route>
    </Routes>
);

export default GramaSewakaRoutes;
