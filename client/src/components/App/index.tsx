import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import {CssBaseline} from "@material-ui/core";
import {BlocksList} from "../BlocksList";
import {RawBlock} from "../RawBlock";

import theme from '../../styles';
import useStyles from './style';
import {ISelectedBlock} from "../../interfaces/ISelectedBlock";
import {GET_SELECTED_BLOCK} from "../queries/selectedBlock";
import {useQuery} from "@apollo/client";

function App() {
    const classes = useStyles();
    const selectedBlockResult = useQuery(GET_SELECTED_BLOCK);
    const selectedBlock: ISelectedBlock = selectedBlockResult.data.selectedBlock;

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className={classes.root}>
                <BlocksList />
                <RawBlock selectedBlock={selectedBlock} />
            </div>
        </ThemeProvider>
    );
}

export default App;
