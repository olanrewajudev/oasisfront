import React, { ReactNode } from "react"
import Footer from "./Footer"
import Header from "./Header"
import { Toaster } from "react-hot-toast"

interface LayoutProp {
    children: ReactNode
}
const Layout: React.FC<LayoutProp> = ({ children }) => {
    return (
        <div>
            <Header />
            {children}
            <Footer />
            <Toaster position='top-center'/> 
        </div>
    )
}

export default Layout
