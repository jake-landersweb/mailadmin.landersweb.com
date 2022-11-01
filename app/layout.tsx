import React from "react"
import "../styles/globals.css";

const Root = ({ children }: { children: React.ReactNode }) => {
    return (
        <html style={{ "scrollPaddingTop": "60px" }} lang="en" className="scroll-smooth text-txt bg-bg">
            <body>
                <div className="">
                    <div className="fixed top-0 z-50">
                        {/* <Header /> */}
                    </div>
                    <div className="my-[80px]">
                        {children}
                    </div>
                    <div className="">
                        {/* <Footer /> */}
                    </div>
                </div>
            </body>
        </html>
    );
}

export default Root