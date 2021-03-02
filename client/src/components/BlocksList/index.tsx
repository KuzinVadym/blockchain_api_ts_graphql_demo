import {gql, useQuery} from "@apollo/client";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import useStyles from "./style";
import {selectedBlockVar} from "../../cache";

interface IBlock {
    hash: string;
    time: number;
    height: number;
}

interface IBlockQuery {
    blocks: IBlock[]
}

const GET_BLOCKS = gql`
    query GetBlocks {
        blocks{
            hash
            time
            height
        }
    }
`;

export function BlocksList() {
    const classes = useStyles();

    const { loading, data } = useQuery<IBlockQuery>(GET_BLOCKS);
    return (
        <div className={classes.root}>
            <h3>Available Blocks</h3>
        {loading
            ? (<p>Loading ...</p>)
            : (
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>...</TableCell>
                                <TableCell align="center">Hash</TableCell>
                                <TableCell align="center">Time</TableCell>
                                <TableCell align="center">Height</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.blocks.map((block: IBlock, index: number) => (
                                <TableRow key={block.hash} onClick={() => {
                                    console.log('block')
                                    console.log(block)
                                    selectedBlockVar({...block})
                                }}>
                                    <TableCell component="th" scope="row">
                                        {index}
                                    </TableCell>
                                    <TableCell align="center">{block.hash}</TableCell>
                                    <TableCell align="center">{block.time}</TableCell>
                                    <TableCell align="center">{block.height}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )
        }
        </div>
    );
}