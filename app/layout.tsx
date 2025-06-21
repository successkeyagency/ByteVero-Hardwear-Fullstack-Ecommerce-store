import { Toaster } from "react-hot-toast";


const RootLayout=({children}: {children:React.ReactNode})=>{
    return <html lang="en">
        <body className="font-inter antialiased bg-amber-10">
            {children}
            <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1F2937", 
              color: "#FBBF24", 
              border: "1px solid #F59E0B",
              padding: "12px 16px",
              fontWeight: 500,
              fontFamily: "Inter, sans-serif",
              borderRadius: "8px",
            },
            success: {
              iconTheme: {
                primary: "#10B981", 
                secondary: "#ECFDF5", 
              },
            },
            error: {
              iconTheme: {
                primary: "#EF4444", 
                secondary: "#FEF2F2", 
              },
            },
          }}
          />
        </body>
    </html>
};

export default RootLayout;


