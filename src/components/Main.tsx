import { ThemeProvider } from "@emotion/react";
import { Box } from "@mui/system";
import { Body } from "./Body";
import { Head } from "./header";
import { theme } from "./Themes";


export const Main = () => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Head />
                <Box>
                    <Body />
                </Box>
            </ThemeProvider>
        </>)
}
