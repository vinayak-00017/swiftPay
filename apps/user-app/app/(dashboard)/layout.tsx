import { ReactNode } from "react";
import Sidebar from "../../components/Sidebar";

export default function Layout({
    children
} : {
    children : ReactNode;
}): JSX.Element {
    return(
        <div className="flex">
            <Sidebar></Sidebar>
            {children}
        </div>   
    )
}