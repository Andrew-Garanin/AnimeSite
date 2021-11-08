import { Box } from "@mui/system";
import ReactDOM from 'react-dom';
import { Body } from "./components/body";
import { Head } from "./components/header";
import './index.css';   


ReactDOM.render(
    <>
        <Head/>
        <Box className = "body_style">
            <Body/>
        </Box>
    </>,
    document.getElementById('root')
);
