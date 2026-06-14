import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";


const MainLayout = ({children}) => {
    return (
        <div>
            <Navbar />
                <main className="flex-grow flex flex-col">{children}</main>
                <Footer />
        </div>
    );
};

export default MainLayout;