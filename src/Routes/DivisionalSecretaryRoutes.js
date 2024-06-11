import React from "react";
import { Route, Routes } from "react-router-dom";
import DivisionalSecretaryHome from "../pages/DivisionalSecretary/DivisionalSecretaryHome";

const DivisionalSecretaryRoutes = () => (
    <Routes>
        <Route>
            <Route index element={<DivisionalSecretaryHome />} />
        </Route>
    </Routes>
);

export default DivisionalSecretaryRoutes;

