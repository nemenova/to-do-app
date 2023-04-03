import { createContext, useEffect, useState } from "react";
import List from "../Components/Tree/Tree";
export const TreeContext = createContext();

// export function TreeContextProvider ({children}) {


//     return (
//         <TreeContext.Provider value={{ tree, setTree }}>
//             {children}
//         </TreeContext.Provider>
//     )
// }

// export default TreeContext;