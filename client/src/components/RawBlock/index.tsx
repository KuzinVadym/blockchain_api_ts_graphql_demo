import React from "react";
import {gql, useQuery} from "@apollo/client";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import useStyles from "./style";
import {ISelectedBlock} from "../../interfaces/ISelectedBlock";


interface IRawBlock {
    size: number;
    block_index: number;
    prev_hash: number;
}

interface IRawBlockQuery {
    rawBlock: IRawBlock
}

const GET_RAW_BLOCK = gql`
    query GetRawBlock($hash: String!) {
        rawBlock(hash: $hash){
            size
            block_index
        }
    }
`;

interface IRawBlockContainer {
    selectedBlock: ISelectedBlock | null
}

export const RawBlock: React.FC<IRawBlockContainer> = ({selectedBlock}) => {
    const classes = useStyles();
    const { loading, data } = useQuery<IRawBlockQuery>(GET_RAW_BLOCK, { variables: { hash: selectedBlock?.hash || '' } });
    return (
        <div className={classes.root}>
            <h3>Selected Block</h3>
        {loading
            ? (<p>Loading ...</p>)
            : (
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>...</TableCell>
                                <TableCell align="right">Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.rawBlock
                                ? (<>
                                    <TableRow>
                                        <TableCell scope="row">Hash</TableCell>
                                        <TableCell align="right">{selectedBlock?.hash}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell scope="row">Time</TableCell>
                                        <TableCell align="right">{selectedBlock?.time}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell scope="row">Height</TableCell>
                                        <TableCell align="right">{selectedBlock?.height}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell scope="row">Size</TableCell>
                                        <TableCell align="right">{data.rawBlock.size}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell scope="row">Block Index</TableCell>
                                        <TableCell align="right">{data.rawBlock.block_index}</TableCell>
                                    </TableRow>
                                   </>
                                ) : null}
                        </TableBody>
                    </Table>
                </TableContainer>
            )
        }
        </div>
    );
}