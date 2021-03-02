import {InMemoryCache, makeVar} from "@apollo/client";
import {ISelectedBlock} from "./interfaces/ISelectedBlock";

export const cache: InMemoryCache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                selectedBlock: {
                    read () {
                        console.log('selectedBlockVar()')
                        console.log(selectedBlockVar())
                        return selectedBlockVar();
                    },
                }
            }
        }
    }
});

export const selectedBlockVar = makeVar<ISelectedBlock | null>(null);