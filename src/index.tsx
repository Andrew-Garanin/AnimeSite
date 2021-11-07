import { Box } from "@mui/system";
import { constants, kMaxLength } from "buffer";
import { EWOULDBLOCK, O_DIRECT } from "constants";
import React, { useState } from "react";
import ReactDOM from 'react-dom';
import { convertTypeAcquisitionFromJson, isParameter, ListFormat } from "typescript";
import { threadId } from "worker_threads";
import { Body } from "./components/body";
import { Head } from "./components/header";
import './index.css';   


ReactDOM.render(
    <>
    <Head/>
    <Box className = "body_style">
        <Body className = "cartochka"/>
    </Box>
    </>,
    document.getElementById('root')
);
